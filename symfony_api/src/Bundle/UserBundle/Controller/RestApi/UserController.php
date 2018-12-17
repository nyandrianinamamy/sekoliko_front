<?php

namespace Bundle\UserBundle\Controller\RestApi;
use Bundle\AdminBundle\Entity\TzRoleTypeEntity;
use Bundle\CommunBundle\Utils\ConstantSrv;
use Bundle\UserBundle\Entity\TzUser;
use FOS\RestBundle\Controller\Annotations as Rest,
    FOS\RestBundle\Request\ParamFetcher,
    Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\FOSRestController;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use Symfony\Component\HttpFoundation\JsonResponse;
/**
 * Created by PhpStorm.
 * User: Tahiana_Rakotonirina
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

    /**
     * Creation et edition de prof
     *
     * @param integer $user
     * @param ParamFetcher $paramFetcher
     * @Rest\Post("/api/user/edit", name="user_new", defaults={"user": null})
     * @Rest\Post("/api/user/edit/{user}", name="user_modify", requirements={"user":"\d+"})
     * @Rest\RequestParam(name="username", nullable=true)
     * @Rest\RequestParam(name="email", nullable=true)
     * @Rest\RequestParam(name="enabled", nullable=true)
     * @Rest\RequestParam(name="lastname", nullable=true)
     * @Rest\RequestParam(name="firstname", nullable=true)
     * @Rest\RequestParam(name="role", nullable=true)
     * @Rest\RequestParam(name="sexe", nullable=true)
     * @Rest\RequestParam(name="age", nullable=true)
     * @Rest\RequestParam(name="adresse", nullable=true)
     * @Rest\RequestParam(name="contact", nullable=true)
     * @Rest\RequestParam(name="password", nullable=true)
     * @Rest\RequestParam(name="type", nullable=true)
     * @ParamConverter("user",class="UserBundle:TzUser")
     * @throws
     * @return JsonResponse
     */
    public function editUser($user, ParamFetcher $paramFetcher) {
        $response = new JsonResponse();
        $new = false;
        $paramUsername = $paramFetcher->get('username');
        $paramEmail = $paramFetcher->get('email');
        $paramEnabled = $paramFetcher->get('enabled');
        $paramFirstName = $paramFetcher->get('firstname');
        $paramLastName = $paramFetcher->get('lastname');
        $paramRole = $paramFetcher->get('role');
        $paramsexe = $paramFetcher->get('sexe');
        $paramAge = $paramFetcher->get('age');
        $paramAdresse = $paramFetcher->get('adresse');
        $paramcontact = $paramFetcher->get('contact');
        $paramPassword = $paramFetcher->get('password');
        $paramType = $paramFetcher->get('type');
        $tzServiceMsg = $this->get('ws.tz_msg');
        $em = $this->getDoctrine()->getManager();
        if (!$user instanceof TzUser) {
            $user = new TzUser();
            // mot de passe temporaire
            $user->setPlainPassword(sha1('123456789'));
            $new = true;
        }
        try {

            if (is_null($paramType)) {
                $repRole = $em->getRepository(TzRoleTypeEntity::class);
                $role = $repRole->find($paramRole);
                if (!$role instanceof TzRoleTypeEntity) {
                    throw new \Exception("Role not found");
                }
                $user->setPlainPassword($paramPassword);
                $user->setUsername($paramUsername);
                $user->setEnabled($paramEnabled);
                $user->setRoleType($role);

            }
            $user->setSexe($paramsexe);
            $user->setEmail($paramEmail);
            $user->setFirstname($paramFirstName);
            $user->setLastname($paramLastName);
            $user->setAge($paramAge);
            $user->setAdresse($paramAdresse);
            $user->setContact($paramcontact);
            $em->persist($user);
            $em->flush();
            if ($new) {
                $text = sprintf("l' utilisateur %s est bien créé", $user->getLastname());
            } else {
                $text = sprintf("l' utilisateur %s est bien mise à jour", $user->getLastname());
            }
            $data = array('id' => $user->getUserId());
            $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_SUCCESS, $text, $text, $data);
        } catch (\Exception $e){
            $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_BAD_REQUEST, $e->getMessage(), "Data not saved");
        }
        $response->setData($msgReturn);
        return $response;
    }

    /**
     * @param integer $user
     * @param ParamFetcher $paramFetcher
     * @Rest\Post("/api/user/find", name="recherche_user",defaults={"user": null})
     * @Rest\GET("/api/user/find/{user}", name="recherche_user_by_id", requirements={"user":"\d+"})
     * @Rest\RequestParam(name="username", nullable=true)
     * @Rest\RequestParam(name="email", nullable=true)
     * @Rest\RequestParam(name="enabled", nullable=true)
     * @Rest\RequestParam(name="lastname", nullable=true)
     * @Rest\RequestParam(name="firstname", nullable=true)
     * @Rest\RequestParam(name="matricule", nullable=true)
     * @Rest\RequestParam(name="role", nullable=false)
     * @Rest\RequestParam(name="sexe", nullable=true)
     * @Rest\RequestParam(name="age", nullable=true)
     * @Rest\RequestParam(name="adresse", nullable=true)
     * @Rest\RequestParam(name="contact", nullable=true)
     *
     * @ParamConverter("user",class="UserBundle:TzUser")
     * @return JsonResponse
     */
    public function rechercheUser($user, ParamFetcher $paramFetcher) {
        $response = new JsonResponse();
        if ($user instanceof TzUser) {
            $data = $user;
        } else {
            $repuser = $this->getDoctrine()->getRepository(TzUser::class);
            $data = $repuser->searchUser($paramFetcher);
        }
        $posResponse = $this->get("tz.responses");
        $resData = $posResponse->setSuccessResponse($data, "json", array("user_list"));
        return $response->setData($resData);
    }


    /**
     * @param integer $role
     * @param ParamFetcher $paramFetcher
     * @Rest\Post("/api/role/find", name="recherche_role_enfant",defaults={"role": null})
     * @Rest\GET("/api/role/find/{role}", name="recherche_rolee_enfant_by_id", requirements={"role":"\d+"})
     * @ParamConverter("role", class="AdminBundle:TzRoleTypeEntity")
     * @return JsonResponse
     */
    public function rechercherolee($role, ParamFetcher $paramFetcher) {

        $response = new JsonResponse();
        if ($role instanceof TzRoleTypeEntity) {
            $data = $role;
        } else {
            $reprolee = $this->getDoctrine()->getRepository(TzRoleTypeEntity::class);
            $data = $reprolee->findBy(array(), array('description' => 'ASC'));
        }
        $posResponse = $this->get("tz.responses");
        $resData = $posResponse->setSuccessResponse($data, "json", array("role_list"));
        return $response->setData($resData);
    }
}