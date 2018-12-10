<?php
/**
 * Created by PhpStorm.
 * User: Tux
 * Date: 15/11/2018
 * Time: 10:26
 */

namespace Bundle\AdminBundle\Controller\RestApi;

use AppBundle\AppBundle;
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
     * @throws
     */

    public function addIns(ParamFetcher $paramFetcher){
        $response = new JsonResponse();
        $tzServiceMsg = $this->get('ws.tz_msg');

        $parameterId = $paramFetcher->get('userid');
        $parameterNiveau = $paramFetcher->get('idclasse');
        $parameterIdAS = $paramFetcher->get('idas');
        $parameterStatus = $paramFetcher->get('status');

        $em = $this->getDoctrine()->getManager();
        // Seul ceux du table Tzetudiant peuvent être entrée dans Tzinscription
        try {
            $result = $em->getRepository(TzUser::class)->find($parameterId);
            if (isset($result)) {
                $ins = new TzInscriptionEntity();
                $ins->setUserId($parameterId);
                $ins->setClasseId($parameterNiveau);
                $ins->setIdAnneeScolaire($parameterIdAS);
                $ins->setStatut($parameterStatus);
                $em = $this->getDoctrine()->getManager();

                $em->persist($ins);
                $em->flush();

                $text = sprintf("Add successfully");
                $data = array('id' => $ins->getNumInscription());
                $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_SUCCESS, $text, $text, $data);
            } else{
                $text = sprintf("UserId not in TzUsers");
                $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_BAD_REQUEST, $text, $text, null);

            }
        } catch(DBALException $e){
            $text = sprintf("Fatal Error!!!");
            $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_INTERNAL_ERROR, $text, $text, null);
        } finally {
            $response->setData($msgReturn);
            return $response;
        }
    }

    /**
     * @param ParamFetcher $paramFetcher
     * @Rest\Post("/api/modifyins")
     * @Rest\RequestParam(name="numins", nullable=false)
     * @Rest\RequestParam(name="userid", nullable=false)
     * @Rest\RequestParam(name="idclasse", nullable=false)
     * @Rest\RequestParam(name="idas", nullable=false)
     * @Rest\RequestParam(name="status", nullable=true)
     * @return JsonResponse
     * @throws
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
            if ($modifyIns) {
                if (isset($parameterId)) {
                    $modifyIns->setUserId($parameterId);
                }
                if (isset($parameterNiveau)) {
                    $modifyIns->setClasseId($parameterNiveau);
                }
                if (isset($parameterIdAS)) {
                    $modifyIns->setIdAnneeScolaire($parameterIdAS);
                }
                if (isset($parameterStatus)) {
                    $modifyIns->setStatut($parameterStatus);
                }
                $em->flush();

                $text = sprintf("Update successfull");
                $data = array('id' => $modifyIns->getNumInscription());
                $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_SUCCESS, $text, $text, $data);
            } else {
                $text = sprintf("UserId not in Tzinscription");
                $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_BAD_REQUEST, $text, $text, null);
            }
        } catch (DBALException $e){
            $text = sprintf("UserId not in TzUsers");
            $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_BAD_REQUEST, $text, $text, null);
        } finally{
            $response->setData($msgReturn);
            return $response;
        }
    }

    /**
     * @return JsonResponse
     * @Rest\Get("/api/listins/as/{as}")
     */

    public function listIns($as){
        $response = new JsonResponse();
        $tzServiceMsg = $this->get('ws.tz_msg');

        $em = $this->getDoctrine()->getManager();

        return $response->setData($result);
    }
}