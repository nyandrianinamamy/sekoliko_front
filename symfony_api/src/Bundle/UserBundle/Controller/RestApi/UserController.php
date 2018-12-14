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
     * @Rest\RequestParam(name="username", nullable=false)
     * @Rest\RequestParam(name="email", nullable=false, requirements="[a-zA-Z][a-zA-Z0-9\._-]+@[a-z0-9][a-z0-9\._-]+\.[a-z0-9]+")
     * @Rest\RequestParam(name="enabled", nullable=false)
     * @Rest\RequestParam(name="lastname", nullable=false)
     * @Rest\RequestParam(name="firstname", nullable=true)
     * @Rest\RequestParam(name="matricule", nullable=false)
     * @Rest\RequestParam(name="role", nullable=false)
     * @Rest\RequestParam(name="sexe", nullable=false)
     * @Rest\RequestParam(name="age", nullable=true)
     * @Rest\RequestParam(name="adresse", nullable=true)
     * @Rest\RequestParam(name="contact", nullable=true)
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
        $paramMatricule = $paramFetcher->get('matricule');
        $paramRole = $paramFetcher->get('role');
        $paramsexe = $paramFetcher->get('sexe');
        $paramAge = $paramFetcher->get('age');
        $paramAdresse = $paramFetcher->get('adresse');
        $paramcontact = $paramFetcher->get('contact');
        $tzServiceMsg = $this->get('ws.tz_msg');
        $em = $this->getDoctrine()->getManager();
        if (!$user instanceof TzUser) {
            $user = new TzUser();
            $new = true;
        }
        try {
            $repRole = $em->getRepository(TzRoleTypeEntity::class);
            $role = $repRole->find($paramRole);
            if (!$role instanceof TzRoleTypeEntity) {
                throw new \Exception("Role not found");
            }
            // mot de passe temporaire
            $user->setPlainPassword(sha1('123456789'));
            $user->setUsername($paramUsername);
            $user->setEmail($paramEmail);
            $user->setEnabled($paramEnabled);
            $user->setFirstname($paramFirstName);
            $user->setLastname($paramLastName);
            $user->setMatricule($paramMatricule);
            $user->setRoleType($role);
            $user->setSexe($paramsexe);
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
    public function rechercheSalle($user, ParamFetcher $paramFetcher) {
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
}