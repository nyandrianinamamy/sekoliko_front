<?php

namespace Bundle\UserBundle\Controller\RestApi;
use FOS\RestBundle\Controller\Annotations as Rest,
    FOS\RestBundle\Request\ParamFetcher,
    Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\FOSRestController;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use Symfony\Component\HttpFoundation\JsonResponse;
/**
 * Created by PhpStorm.
 * User: Predator
 * Date: 12/11/2018
 * Time: 08:46
 */
class UserController extends FOSRestController
{

    /**
     * @Rest\Get("/api/user")
     * @return JsonResponse
     */
    public function getFonction() {
        $respone = new JsonResponse();
        $respone->setData('test user');
        return $respone;
    }
}