<?php
namespace Bundle\CommunBundle\EventListener;
use Bundle\UserBundle\Entity\TzUser;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\HttpFoundation\JsonResponse;
/**
 * Created by Tahiana Rakotonirina.
 * User: Predator
 * Date: 25/11/2018
 * Time: 19:12
 */

class AuthentificationEventListener
{
    protected $container;

    /**
     * AuthentificationEventListener constructor.
     *
     * @param \Symfony\Component\DependencyInjection\Container $container
     */
    public function __construct(\Symfony\Component\DependencyInjection\Container $container)
    {
        $this->container = $container;
    }

    /**
     * @param AuthenticationSuccessEvent $event
     *
     * @throws
     * @return JsonResponse
     */
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event) {

        $data = $event->getData();
        $user = $event->getUser();
        $rep = $this->container
            ->get('doctrine.orm.entity_manager')
            ->getRepository(TzUser::class);
        $token = $data['token'] ?? null;
        $ttl = $this->container->getParameter('jwt_token_ttl');
        if (!is_null($token)) {
            $oToken = $this->container->get('lexik_jwt_authentication.encoder')->decode($token);
            $iat = $oToken['iat'];
            $exp = $oToken['exp'];
            $ttl = $exp - $iat;
        }
        if (!$user instanceof TzUser) {
            $user = $rep->findOneBy(
                array(
                    'username' => $user->getUsername()
                )
            );
        }
        $response = array(
            'code'    => 200,
            'message' => 'Success request',
            'data'    => array_merge(
                array(
                    'username'           => $user->getUsername(),
                    'email'              => $user->getEmail(),
                    'nom'                => $user->getLastname(),
                    'prenom'             => $user->getFirstname(),
                    'user_id'            => $user->getUserId(),
                    'jwt_token_ttl'      => $ttl,
                    'jwt_token_date_exp' => date('Y-m-d H:i:s', $exp)
                ), $data
            )
        );
        $event->setData($response);
    }
    /**
     * @param AuthenticationFailureEvent $event
     *
     * @throws \Exception
     * @return JsonResponse
     */
    public function onAuthenticationFailureResponse(AuthenticationFailureEvent $event)
    {
        $response = new JsonResponse();
        $response->setData(
            array(
                'code'         => 401,
                'message'      => "Login ou mot de passe incorrect",
                'http_message' => 'Authentication failed'
            )
        );
        $event->setResponse($response);
    }
}