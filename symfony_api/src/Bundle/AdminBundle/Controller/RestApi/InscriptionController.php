<?php
/**
 * Created by PhpStorm.
 * User: Tux
 * Date: 15/11/2018
 * Time: 10:26
 */

namespace Bundle\AdminBundle\Controller\RestApi;

use AppBundle\AppBundle;
use Bundle\AdminBundle\Entity\TzEtudiantEntity;
use Bundle\AdminBundle\Entity\TzInscriptionEntity;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest,
    FOS\RestBundle\Request\ParamFetcher,
    Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
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
     * @Rest\Post("/api/addIns")
     * @Rest\RequestParam(name="id", nullable=false)
     * @Rest\RequestParam(name="niveau", nullable=false)
     * @Rest\RequestParam(name="as", nullable=false)
     */

    public function addIns(ParamFetcher $paramFetcher){
        $parameterId = $paramFetcher->get('id');
        $parameterNiveau = $paramFetcher->get('niveau');
        $parameterAs = \DateTime::createFromFormat('Ymd', $paramFetcher->get('as'));

        $em = $this->getDoctrine()->getManager();
        $result = $em->getRepository(TzEtudiantEntity::class)->find($parameterId);

        // Seul ceux du table Tzetudiant peuvent être entrée dans Tzinscription
        if(isset($result)){
            $ins = new TzInscriptionEntity();
            $ins->setId($parameterId);
            $ins->setNiveau($parameterNiveau);
            $ins->setAS($parameterAs);

            $em = $this->getDoctrine()->getManager();
            $em->persist($ins);
            $em->flush();
        }
    }
}