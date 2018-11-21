<?php
/**
 * Created by PhpStorm.
 * User: Tux
 * Date: 14/11/2018
 * Time: 15:17
 */

namespace Bundle\AdminBundle\Controller\RestApi;


use AppBundle\AppBundle;
use Bundle\AdminBundle\Entity\TzEtudiantEntity;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest,
    FOS\RestBundle\Request\ParamFetcher,
    Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use Symfony\Component\HttpFoundation\JsonResponse;

class EtudiantController extends FOSRestController
{
    /**
     * @param mixed  $data
     * @param string $format
     * @param array  $context
     *
     * @return array
     */
    public function setSuccessResponse($data, $format, $context)
    {
        $posResponse = $this->get("tz.responses");
        $resData = $posResponse->successSerialize($data, "json", $context);
        return $resData;
    }

    /**
     * @param ParamFetcher $paramFetcher
     * @Rest\Post("/api/addEtd")
     * @Rest\RequestParam(name="nomEtd", nullable=false)
     * @Rest\RequestParam(name="ageEtd", nullable=false)
     * @Rest\RequestParam(name="sexeEtd", nullable=false)
     * @Rest\RequestParam(name="adrEtd", nullable=true)
     * @return JsonResponse
     */

    public function addEtd(ParamFetcher $paramFetcher){
        $parameterNom = $paramFetcher->get('nomEtd');
        $parameterAge = $paramFetcher->get('ageEtd');
        $parameterSexe = $paramFetcher->get('sexeEtd');
        $parameterAdr = $paramFetcher->get('adrEtd');

        $etd = new TzEtudiantEntity();
        $etd->setNon($parameterNom);
        $etd->setAge($parameterAge);
        $etd->setSexe($parameterSexe);
        if(isset($parameterAdr)) {
            $etd->setAdresse($parameterAdr);
        }

        $em = $this->getDoctrine()->getManager();
        $em->persist($etd);
        $em->flush();
    }

    /**
     * @param ParamFetcher $paramFetcher
     * @Rest\Post("/api/modifyEtd")
     * @Rest\RequestParam(name="id", nullable=false)
     * @Rest\RequestParam(name="newName", nullable=true)
     * @Rest\RequestParam(name="newAge", nullable=true)
     * @Rest\RequestParam(name="newSexe", nullable=true)
     * @Rest\RequestParam(name="newAdr", nullable=true)
     */

    public function modifyEtd(ParamFetcher $paramFetcher){
        $parameterId = $paramFetcher->get('id');
        $parameterNom = $paramFetcher->get('newName');
        $parameterAge = $paramFetcher->get('newAge');
        $parameterSexe = $paramFetcher->get('newSexe');
        $parameterAdr = $paramFetcher->get('newAdr');

        $em = $this->getDoctrine()->getManager();

        $etd = $em->getRepository(TzEtudiantEntity::class)->find($parameterId);

        if (isset($parameterNom)){
            $etd->setNom($parameterNom);
        }
        if (isset($parameterAge)){
            $etd->setAge($parameterAge);
        }
        if (isset($parameterSexe)){
            $etd->setSexe($parameterSexe);
        }
        if (isset($parameterAdr)){
            $etd->setAdresse($parameterAdr);
        }

        $em->persist($etd);
        $em->flush();
    }

    /**
     * @Rest\Get("/api/listEtd")
     * @return JsonResponse
     */

    public function listEtd(){
        $em = $this->getDoctrine()->getManager();
        $result = $em->getRepository(TzEtudiantEntity::class)->findAll();

        $resData = $this->setSuccessResponse($result, "json", array("Etudiant"));
        $response = new JsonResponse();

        return $response->setData($resData);
    }
}