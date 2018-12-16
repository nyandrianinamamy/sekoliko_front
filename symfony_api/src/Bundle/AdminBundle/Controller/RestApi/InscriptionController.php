<?php
/**
 * Created by PhpStorm.
 * User: Tux
 * Date: 15/11/2018
 * Time: 10:26
 */

namespace Bundle\AdminBundle\Controller\RestApi;

use AppBundle\AppBundle;
use Bundle\AdminBundle\Entity\TzAnneeScolaireEntity;
use Bundle\AdminBundle\Entity\TzClasseEnfantEntity;
use Bundle\AdminBundle\Entity\TzInscriptionEntity;
use Bundle\AdminBundle\Repository\TzInscriptionRepository;
use Bundle\CommunBundle\Utils\ConstantSrv;
use Bundle\UserBundle\Entity\TzUser;
use Doctrine\DBAL\DBALException;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest,
    FOS\RestBundle\Request\ParamFetcher,
    Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
//use Symfony\Component\BrowserKit\Request;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class InscriptionController extends FOSRestController
{
    public function setSuccessResponse($data, $format, $context)
    {
        $posResponse = $this->get("tz.responses");
        $resData = $posResponse->successSerialize($data, "json", $context);
        return $resData;
    }

    /**
     * @param ParamFetcher $paramFetcher
     * @Rest\Post("/api/addins")
     * @Rest\RequestParam(name="userid", nullable=false)
     * @Rest\RequestParam(name="idclasse", nullable=false)
     * @Rest\RequestParam(name="idas", nullable=false)
     * @Rest\RequestParam(name="status", nullable=true)
     * @return JsonResponse
     */

    public function addIns(ParamFetcher $paramFetcher){
        $response = new JsonResponse();
        $tzServiceMsg = $this->get('ws.tz_msg');

        $parameterId = $paramFetcher->get('userid');
        $parameterNiveau = $paramFetcher->get('idclasse');
        $parameterIdAS = $paramFetcher->get('idas');
        $parameterStatus = $paramFetcher->get('status');

        $em = $this->getDoctrine()->getManager();
        try {
            $userid = $em->getRepository(TzUser::class)->find($parameterId);
            $classid = $em->getRepository(TzClasseEnfantEntity::class)->find($parameterNiveau);
            $asid = $em->getRepository(TzAnneeScolaireEntity::class)->find($parameterIdAS);
            if ($userid instanceof TzUser && $classid instanceof TzClasseEnfantEntity && $asid instanceof TzAnneeScolaireEntity) {
                $ins = new TzInscriptionEntity();

                $ins->setUserId($parameterId);
                $ins->setClasseId($classid);
                $ins->setIdAnneeScolaire($asid);
                $ins->setStatut($parameterStatus);

                $em = $this->getDoctrine()->getManager();
                $em->persist($ins);
                $em->flush();

                $text = sprintf("Add successfully");
                $data = array('id' => $ins->getNumInscription());
                $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_SUCCESS, $text, $text, $data);
            } else {
                $text = sprintf("Violation constraint foreign key");
                $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_BAD_REQUEST, $text, $text, null);
            }
        } catch (DBALException $e) {
            $text = sprintf("%s", $e->getMessage());
            $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_INTERNAL_ERROR, $text, $text, null);
        } finally {
            $response->setData($msgReturn);
            return $response;
        }
    }

    /**
     * @param ParamFetcher $paramFetcher
     * @Rest\Post("/api/editins")
     * @Rest\RequestParam(name="numins", nullable=false)
     * @Rest\RequestParam(name="userid", nullable=true)
     * @Rest\RequestParam(name="idclasse", nullable=true)
     * @Rest\RequestParam(name="idas", nullable=true)
     * @Rest\RequestParam(name="status", nullable=true)
     * @return JsonResponse
     */

    public function modifyIns(ParamFetcher $paramFetcher)
    {
        $response = new JsonResponse();
        $tzServiceMsg = $this->get('ws.tz_msg');

        $parameterNumIns = $paramFetcher->get('numins');
        $parameterId = $paramFetcher->get('userid');
        $parameterNiveau = $paramFetcher->get('idclasse');
        $parameterIdAS = $paramFetcher->get('idas');
        $parameterStatus = $paramFetcher->get('status');

        $em = $this->getDoctrine()->getManager();
        try {
            $modifyIns = $em->getRepository(TzInscriptionEntity::class)->find($parameterNumIns);
            if ($modifyIns instanceof TzInscriptionEntity) {
                if (isset($parameterId)) {
                    $userid = $em->getRepository(TzUser::class)->find($parameterId);
                    if ($modifyIns instanceof TzUser)
                        $modifyIns->setUserId($userid);
                }
                if (isset($parameterNiveau)) {
                    $classid = $em->getRepository(TzClasseEnfantEntity::class)->find($parameterNiveau);
                    if ($classid instanceof TzClasseEnfantEntity)
                        $modifyIns->setClasseId($classid);
                }
                if (isset($parameterIdAS)) {
                    $asid = $em->getRepository(TzAnneeScolaireEntity::class)->find($parameterIdAS);
                    if ($asid instanceof TzAnneeScolaireEntity)
                        $modifyIns->setIdAnneeScolaire($asid);
                }
                if (isset($parameterStatus)) {
                    $modifyIns->setStatut($parameterStatus);
                }
                $em->flush();

                $text = sprintf("Update successfull");
                $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_SUCCESS, $text, $text, null);
            } else {
                $text = sprintf("Constraint violation foreign key");
                $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_BAD_REQUEST, $text, $text, null);
            }
        } catch (DBALException $e) {
            $text = sprintf("%s", $e->getMessage());
            $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_BAD_REQUEST, $text, $text, null);
        } finally {
            $response->setData($msgReturn);
            return $response;
        }
    }

    /**
     * @param integer $ins
     * @param ParamFetcher $paramFetcher
     * @Rest\Post("/api/ins/find", name="find_ins",defaults={"ins": null})
     * @Rest\GET("/api/user/find/{ins}", name="find_ins_by_id", requirements={"ins":"\d+"})
     * @Rest\RequestParam(name="numins", nullable=true)
     * @Rest\RequestParam(name="userid", nullable=true)
     * @Rest\RequestParam(name="idclasse", nullable=true)
     * @Rest\RequestParam(name="idclasseparent", nullable=true)
     * @Rest\RequestParam(name="idas", nullable=true)
     * @Rest\RequestParam(name="dateins", nullable=true)
     * @Rest\RequestParam(name="status", nullable=true)
     *
     * @ParamConverter("ins",class="AdminBundle:TzInscriptionEntity")
     * @return JsonResponse
     * 
     */

    public function listIns($ins, ParamFetcher $paramFetcher){
        $response = new JsonResponse();
        $tzServiceMsg = $this->get('ws.tz_msg');

        try {
            if ($ins instanceof TzInscriptionEntity) {
                $data = $ins;
            } else {
                $em = $this->getDoctrine()
                ->getRepository(TzInscriptionEntity::class);
                $data = $em->findIns($paramFetcher);
                $posResponse = $this->get("tz.responses");
                $resData = $posResponse->setSuccessResponse($data, "json", array("inscrit"));
                
                return $response->setData($resData);
            }
        } catch (DBALException $e) {
            $text = sprintf("%s", $e->getMessage());
            $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_BAD_REQUEST, $text, $text, null);
            return $response->setData($msgReturn);
        }
    }
}