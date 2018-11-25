<?php

namespace Bundle\CommunBundle\Controller\RestApi;

use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
/**
 * Created by PhpStorm.
 * @autor: Tahiana_Rakotonirina
 * Date: 25/11/2018
 * Time: 16:37
 * @package Bundle\AdminBundle\Controller\RestApi
 */
abstract class AbstractClassRestController extends FOSRestController
{
    /**
     * @param ContainerInterface|null $container
     */
    public function setContainer(ContainerInterface $container = null)
    {
        parent::setContainer($container);
        if (($user = $this->getUser()) !== null)
            define('CURRENT_USER_ID', $user->getId() . '');
    }

    protected $verbosityContexts = array(
        array(),
    );

    /**
     * Put json header
     *
     * @param mixed   $data    Data to send
     * @param string  $message Custom message
     * @param integer $code    Http status code
     *
     * @return array
     */
    protected function envelop($data, $message, $code = 200, $metaData = array())
    {
        $additional = $metaData;
        if (is_array($data))
            $additional += array(
                'count' => count($data),
            );

        return array_merge(
            $additional, array(
                'code'    => $code,
                'message' => $message,
                'data'    => $data,
            )
        );
    }

    /**
     * Send custom message
     *
     * @param string  $customMessage Custom message
     * @param integer $statusCode    HTTP status code
     * @param midex   $data          Data to send
     *
     * @return JsonResponse
     */
    protected function customMessage($customMessage, $statusCode, $data = null)
    {
        return new JsonResponse($this->envelop($data, $customMessage, $statusCode), $statusCode);
    }

    /**
     * Send 400 bad request response
     *
     * @param string $customMessage Custom message
     *
     * @return JsonResponse
     */
    protected function badRequest($customMessage = 'Bad request')
    {
        return $this->customMessage($customMessage, 400);
    }

    /**
     * Send 401 Unauthorized
     *
     * @param string $customMessage Custom message
     *
     * @return JsonResponse
     */
    protected function unauthorized($customMessage = 'Unauthorized')
    {
        return $this->customMessage($customMessage, 401);
    }

    /**
     * Send 404 not found response
     *
     * @param string $customMessage Custom message
     *
     * @return JsonResponse
     */
    protected function notFound($customMessage = 'Not found')
    {
        return $this->customMessage($customMessage, 404);
    }

    /**
     * Send 405 not allowed response
     *
     * @param string $customMessage Custom message
     *
     * @return JsonResponse
     */
    protected function notAllowed($customMessage = 'Not allowed')
    {
        return $this->customMessage($customMessage, 405);
    }

    /**
     * Send 403 forbidden response
     *
     * @param string $customMessage Custom message
     *
     * @return JsonResponse
     */
    protected function forbidden($customMessage = 'Forbidden')
    {
        return $this->customMessage($customMessage, 403);
    }

    /**
     * Send created json message
     *
     * @param string $customMessage Custom message
     * @param mixed  $data          Data to send
     *
     * @return JsonResponse
     */
    protected function created($customMessage = 'Created', $data = null)
    {
        return $this->customMessage($customMessage, 201, $data);
    }

    /**
     * Send accepted json message
     *
     * @param string $customMessage Custom message
     * @param mixed  $data          Data to send
     *
     * @return JsonResponse
     */
    protected function accepted($customMessage = 'Accepted', $data = null)
    {
        return $this->customMessage($customMessage, 202, $data);
    }

    /**
     * Send json data
     *
     * @param mixed   $data         Data to send
     * @param array   $contextGroup Serialization context
     * @param integer $statusCode   HTTP status code
     *
     * @return JsonResponse
     */
    protected function sendData($data,
                                $statusCode = 200,
                                $customMessage = null,
                                array $contextGroup = array(),
                                $envelop = true,
                                $metadata = array())
    {
        $view = $this->view();
        $context = new \FOS\RestBundle\Context\Context;
        if (count($contextGroup) > 0)
            $context->setGroups($contextGroup);
        $context->setSerializeNull(true);
        $view->setContext($context);
        if ($envelop)
            $data = $this->envelop(
                $data,
                $customMessage === null ?
                    $this->getHttpMessage($statusCode) :
                    $customMessage,
                $statusCode,
                $metadata
            );
        $view->setData($data);
        $view->setStatusCode($statusCode);

        return $this->handleView($view);
    }
    /**
     * Get http message from status code
     *
     * @param integer $statusCode HTTP Status code
     *
     * @return string
     */
    protected function getHttpMessage($statusCode)
    {
        switch ($statusCode) {
            case 201:
                return 'Created';
            case 202:
                return 'Accepted';
            case 400:
                return 'Bad request';
            case 401:
                return 'Unauthorized';
            case 403:
                return 'Forbidden';
            case 404:
                return 'Not found';
            case 405:
                return 'Method not Allowed';
            case 500:
                return 'Internal error';
            default:
                return 'Success request';
        }
    }
}