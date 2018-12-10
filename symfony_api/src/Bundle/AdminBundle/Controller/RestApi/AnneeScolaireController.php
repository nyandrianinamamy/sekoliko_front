<?php
/**
 * Created by PhpStorm.
 * User: Tux
 * Date: 01/12/2018
 * Time: 09:17
 */

namespace Bundle\AdminBundle\Controller\RestApi;

use AppBundle\AppBundle;
use Bundle\AdminBundle\Entity\TzAnneeScolaireEntity;
use Bundle\AdminBundle\Entity\TzEtudiantEntity;
use Bundle\CommunBundle\Utils\ConstantSrv;
use Doctrine\DBAL\DBALException;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest,
    FOS\RestBundle\Request\ParamFetcher,
    Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use Symfony\Component\HttpFoundation\JsonResponse;

class AnneeScolaireController extends FOSRestController
{
    public function setSuccessResponse($data, $format, $context)
    {
        $posResponse = $this->get("tz.responses");
        $resData = $posResponse->successSerialize($data, "json", $context);
        return $resData;
    }

    /**
     * @param ParamFetcher $paramFetcher
     * @Rest\Post("/api/addas")
     * @Rest\RequestParam(name="adebut", nullable=false)
     * @Rest\RequestParam(name="afin", nullable=false)
     */

    public function addAsco(ParamFetcher $paramFetcher)
    {
        $response = new JsonResponse();
        $tzServiceMsg = $this->get('ws.tz_msg');

        $parameterDebut = \DateTime::createFromFormat('Ymd', $paramFetcher->get('adebut'));
        $parameterFin = \DateTime::createFromFormat('Ymd', $paramFetcher->get('afin'));

        try {
            $as = new TzAnneeScolaireEntity();
            $as->setDateDebut($parameterDebut);
            $as->setDateFin($parameterFin);

            $em = $this->getDoctrine()->getManager();
            $em->persist($as);
            $text = sprintf("Add successfully");
            $data = array('id' => $as->getID());

            $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_SUCCESS, $text, $text, $data);
            $em->flush();
        } catch (DBALException $e) {
            $text = sprintf("%s", $e->getMessage());
            $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_BAD_REQUEST, $text, $text, null);
        } finally {
            $response->setData($msgReturn);
            return $response;
        }
    }
}