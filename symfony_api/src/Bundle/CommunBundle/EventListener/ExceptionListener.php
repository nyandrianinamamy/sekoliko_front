<?php
/**
 * Created by Tahiana Rakotonirina.
 * User: Predator
 * Date: 25/11/2018
 * Time: 19:52
 */

namespace Bundle\CommunBundle\EventListener;


use Bundle\CommunBundle\Utils\ConstantSrv;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTEncodeFailureException;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Symfony\Component\Routing\Exception\InvalidParameterException;
use Symfony\Component\Security\Core\Exception\DisabledException;

class ExceptionListener
{
    const DEFAULT_ERROR_STATUS_CODE = 200;

    /**
     * Gestion des exception Kernel
     * @param GetResponseForExceptionEvent $event
     */
    public function onKernelException(GetResponseForExceptionEvent $event)
    {
        $path = $event->getRequest()->getPathInfo();
        $exception = $event->getException();
        if (preg_match('#^/api/#', $path)) {
            $response = $this->handleException($exception);
            if (!is_null($response)) {
                $event->setResponse($response);
            }
        }
    }

    /**
     * Changement des message suivant les types d'exeption
     * @param \Exception $exception
     *
     * @return null|JsonResponse
     * @throws \Exception
     */
    public function handleException(\Exception $exception)
    {
        $response = new JsonResponse();
        if ($exception instanceof InvalidParameterException) { // parametre invalide
            $response->setData(
                array_merge(
                    array(
                        'message'      => $exception->getMessage(),
                        'http_message' => 'Parametre invalid',
                        'code'         => ConstantSrv::CODE_UNAUTHORIZED,
                    ), $this->getMessageParts($exception)
                )
            );
        } elseif ($exception instanceof DisabledException) { // User account is disabled.
            $response->setData(
                array_merge(
                    array(
                        'message'      => $exception->getMessage(),
                        'http_message' => 'User account is disabled.',
                        'code'         => ConstantSrv::CODE_UNAUTHORIZED,
                    ), $this->getMessageParts($exception)
                )
            );
        } elseif ($exception instanceof NotFoundHttpException) { // url Introuvable
            $response->setData(
                array_merge(
                    array(
                        'message'      => $exception->getMessage(),
                        'http_message' => 'Not found',
                        'code'         => ConstantSrv::CODE_DATA_NOTFOUND,
                    ), $this->getMessageParts($exception)
                )
            );
        } elseif ($exception instanceof JWTEncodeFailureException) {
            $response->setData(
                array_merge(
                    array(
                        'message'      => $exception->getMessage(),
                        'http_message' => 'Authentication failed',
                        'code'         => ConstantSrv::CODE_INTERNAL_ERROR,
                    ), $this->getMessageParts($exception)
                )
            );
        } elseif ($exception instanceof BadRequestHttpException) {
            $response->setData(
                array_merge(
                    array(
                        'message'      => $exception->getMessage(),
                        'http_message' => 'Authentication failed',
                        'code'         => ConstantSrv::CODE_BAD_REQUEST,
                    ), $this->getMessageParts($exception)
                )
            );
        } elseif ($exception instanceof MethodNotAllowedHttpException) {
            $response->setData(
                array_merge(
                    array(
                        'message'      => $exception->getMessage(),
                        'http_message' => 'Method Not Allowed',
                        'code'         => ConstantSrv::CODE_METHODE_NOTFOUND,
                    ), $this->getMessageParts($exception)
                )
            );
        } elseif ($exception instanceof UniqueConstraintViolationException) {
            $messageExeption = $exception->getMessage();
            if (preg_match('#Duplicate entry \'(.*)\'#Uis', $messageExeption, $val)) {

                $messageExeption = $val[1];
            }
            $response->setData(
                array(
                    'message'      => "L'élément  " . (string) $messageExeption . " existe déjà !",
                    'http_message' => 'Duplicate entry',
                    'code'         => ConstantSrv::CODE_INTERNAL_ERROR,
                )
            );
        } else if ($exception instanceof \Exception) {
            $messageExeption = $exception->getMessage();
            $response->setData(
                array(
                    'message'      => $messageExeption,
                    'http_message' => 'Erreur interne',
                    'code'         => ConstantSrv::CODE_INTERNAL_ERROR
                )
            );
        } else {
            $response = null;
        }

        return $response;
    }
    /**
     * @param \Exception $exception
     *
     * @return array
     */
    protected function getMessageParts(\Exception $exception)
    {
        $message = $exception->getMessage();
        $customResponse = array(
            'message' => $message,
        );
        if (strpos($message, '|') !== false) {
            list($title, $message,) = explode('|', $message);
            $customResponse['message'] = $message;
            $customResponse['title'] = $title;
        }

        return $customResponse;
    }
}