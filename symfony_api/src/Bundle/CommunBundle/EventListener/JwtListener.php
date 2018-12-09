<?php
/**
 * Created by Tahiana Rakotonirina.
 * User: Predator
 * Date: 25/11/2018
 * Time: 20:05
 */

namespace Bundle\CommunBundle\EventListener;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTExpiredEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTInvalidEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTNotFoundEvent;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Gestion des erreur token
 * Class JwtListener
 * @package Bundle\CommunBundle\EventListener
 */
class JwtListener
{
    /**
     * @param JWTNotFoundEvent $event
     *
     * @throws \Exception
     */
    public function onJWTNotFound(JWTNotFoundEvent $event)
    {
        $response = new JsonResponse();
        $response->setData(
            array(
                'code'         => 403,
                'message'      => "Token not found",
                'http_message' => 'Authentication failed'
            )
        );
        $event->setResponse($response);
    }
    /**
     * @param JWTExpiredEvent $event
     */
    public function onJWTExpired(JWTExpiredEvent $event)
    {
        $response = new JsonResponse();
        $response->setData(
            array(
                'code'         => 403,
                'message'      => "Token Expirer",
                'http_message' => 'Authentication failed'
            )
        );
        $event->setResponse($response);
    }
    /**
     * @param JWTInvalidEvent $event
     *
     * @throws \Exception
     */
    public function onJWTInvalid(JWTInvalidEvent $event)
    {
        $response = new JsonResponse();
        $response->setData(
            array(
                'code'         => 403,
                'message'      => "token invalide ou absente",
                'http_message' => 'Authentication failed'
            )
        );
        $event->setResponse($response);
    }
}