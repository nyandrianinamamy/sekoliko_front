<?php
/**
 * Created by PhpStorm.
 * User: Predator
 * Date: 12/11/2018
 * Time: 18:34
 */
namespace Bundle\AdminBundle\Controller\RestApi;

use Bundle\CommunBundle\Utils\ConstantSrv;
use FOS\RestBundle\Controller\Annotations as Rest,
    FOS\RestBundle\Request\ParamFetcher,
    Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\FOSRestController;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Bundle\AdminBundle\Entity\TzSalleEntity;

/**
 * Class SalleController
 * @package Bundle\AdminBundle\Controller\RestApi
 */
class SalleController extends FOSRestController
{

    /**
     * @Rest\Options("/api/salle/edit")
     * @Rest\Options("/api/salle/edit/{salle}", requirements={"salle":"(\d+|null)"})
     * @Rest\Options("/api/salle/find")
     * @Rest\Options("/api/salle/find/{salle}", requirements={"salle":"(\d+|null)"})
     * @return JsonResponse
     */
    public function getOptions() {
        return new JsonResponse(
            array(
                'status'  => ConstantSrv::CODE_ACCEPTED,
                'message' => 'accepted',
            ), ConstantSrv::CODE_ACCEPTED
        );
    }

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
     * @param integer $salle
     * @param ParamFetcher $paramFetcher
     * @Rest\Post("/api/salle/find", name="recherche_salle",defaults={"salle": null})
     * @Rest\RequestParam(name="occupation", nullable=true)
     * @Rest\GET("/api/salle/find/{salle}", name="recherche_salle_by_id", requirements={"salle":"\d+"})
     * @ParamConverter("salle",class="AdminBundle:TzSalleEntity")
     * @return JsonResponse
     */
    public function rechercheSalle($salle, ParamFetcher $paramFetcher) {

        $response = new JsonResponse();
        if ($salle instanceof TzSalleEntity) {
            $data = $salle;
        } else {
            $repSalle = $this->getDoctrine()->getRepository(TzSalleEntity::class);
            $paramOccupation = $paramFetcher->get('occupation');
            if ($paramOccupation == false && !is_null($paramOccupation)) {
                $data = $repSalle->getSalleLibre();
            } else {
                $data = $repSalle->findBy(array(), array('nom' => 'ASC'));
            }
        }
        $resData = $this->setSuccessResponse($data, "json", array("salle_etude"));
        return $response->setData($resData);
    }

    /**
     * Creation et edition de salle
     *
     * @param integer $salle
     * @param ParamFetcher $paramFetcher
     * @Rest\Post("/api/salle/edit", name="salle_new", defaults={"salle": null})
     * @Rest\Post("/api/salle/edit/{salle}", name="salle_modify", requirements={"salle":"\d+"})
     * @Rest\RequestParam(name="action", nullable=true)
     * @Rest\RequestParam(name="description", nullable=false, allowBlank = false)
     * @ParamConverter("salle",class="AdminBundle:TzSalleEntity")
     *
     * @return JsonResponse
     */
    public function process($salle, ParamFetcher $paramFetcher) {
        $response = new JsonResponse();
        $new = false;
        $paramDescription = $paramFetcher->get('description');
        $paramAction = $paramFetcher->get('action');
        $posServiceMsg = $this->get('ws.tz_msg');
        $em = $this->getDoctrine()->getManager();
        if (!$salle instanceof TzSalleEntity) {
            $salle = new TzSalleEntity();
            $new = true;
        } else if ($paramAction == "delete"){
            $text = sprintf("la salle %s est bien supprimée", $paramDescription);
            $msgReturn = $posServiceMsg->getMsg(ConstantSrv::CODE_SUCCESS, $text, $text, null);
            $response->setData($msgReturn);
            $em->remove($salle);
            $em->flush();
            return $response;
        }
        try {
            $salle->setNom($paramDescription);
            $em->persist($salle);
            $em->flush();
            if ($new) {
                $text = sprintf("la salle %s est bien créée", $salle->getNom());
            } else {
                $text = sprintf("la salle %s est bien mise à jour", $salle->getNom());
            }
            $data = array('id' => $salle->getId());
            $msgReturn = $posServiceMsg->getMsg(ConstantSrv::CODE_SUCCESS, $text, $text, $data);
        } catch (\Exception $e) {
            $msgReturn = $posServiceMsg->getMsg(ConstantSrv::CODE_BAD_REQUEST, $e->getMessage(), "Data not saved");
        }
        $response->setData($msgReturn);

        return $response;
    }

    /**
     * Reservation de salle
     *
     * @param integer $salle
     * @param ParamFetcher $paramFetcher
     * @Rest\Post("/api/salle/reservation/{salle}", name="salle_reservation", requirements={"salle":"\d+"})
     * @Rest\RequestParam(name="dateDebut", nullable=false)
     * @Rest\RequestParam(name="dateFin", nullable=false)
     * @ParamConverter("salle",class="AdminBundle:TzSalleEntity")
     *
     * @return JsonResponse
     */
    public function reservation($salle, ParamFetcher $paramFetcher) {
        $response = new JsonResponse();
        $posServiceMsg = $this->get('ws.tz_msg');
        if ($salle instanceof TzSalleEntity) {
            $paramDate = $paramFetcher->get('dateDebut');
            $paramDateFin = $paramFetcher->get('dateFin');
            $em = $this->getDoctrine()->getManager();
            $dateOccupation = $salle->getDateFinOccupation();
            $date = new \DateTime($paramDate);
            $dateFin =  new \DateTime($paramDateFin);
            if ($dateOccupation <= $date) {
                $text = sprintf("la salle %s est bien réservée", $salle->getNom());
                $salle->setDateDebutOccupation($date);
                $salle->setDateFinOccupation($dateFin);
                $em->persist($salle);
                $em->flush();
                $code = ConstantSrv::CODE_SUCCESS;
            } else {
                $text = sprintf("la salle est déjà bien réservée");
                $code = ConstantSrv::CODE_DATA_NOTFOUND;
            }
        } else {
            $text = sprintf("Veuillez saisir la salle");
            $code = ConstantSrv::CODE_BAD_REQUEST;
        }
        $msgReturn = $posServiceMsg->getMsg($code, $text, $text, null);
        $response->setData($msgReturn);
        return $response;
    }
}