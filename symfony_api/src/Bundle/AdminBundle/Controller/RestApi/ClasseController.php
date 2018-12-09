<?php
namespace Bundle\AdminBundle\Controller\RestApi;

use Bundle\AdminBundle\Entity\TzClassEntity;
use Bundle\CommunBundle\Utils\ConstantSrv;
use FOS\RestBundle\Controller\Annotations as Rest,
    FOS\RestBundle\Request\ParamFetcher,
    Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\FOSRestController;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Bundle\CommunBundle\Controller\RestApi\AbstractClassRestController;
/**
 * Created by PhpStorm.
 * User: Tahiana_Rakotonirina
 * Date: 12/11/2018
 * Time: 08:31
 */
class ClasseController extends AbstractClassRestController
{
    /**
     * @Rest\Get("/api/class")
     * @return JsonResponse
     */

    public function getFonction() {
        $respone = new JsonResponse();
        $respone->setData('test');
       return $respone;
    }

    /**
     * Creation et edition de classe
     *
     * @param integer $classe
     * @param ParamFetcher $paramFetcher
     * @Rest\Post("/api/classe/edit", name="classe_new", defaults={"classe": null})
     * @Rest\Post("/api/classe/edit/{classe}", name="classe_modify", requirements={"classe":"\d+"})
     * @Rest\RequestParam(name="description", nullable=false, allowBlank = false)
     * @ParamConverter("classe",class="AdminBundle:TzClassEntity")
     *
     * @return JsonResponse
     */
    public function editClasse($classe, ParamFetcher $paramFetcher) {
        $response = new JsonResponse();
        $new = false;
        $paramDescription = $paramFetcher->get('description');
        $tzServiceMsg = $this->get('ws.tz_msg');
        $em = $this->getDoctrine()->getManager();
        if (!$classe instanceof TzClassEntity) {
            $classe = new TzClassEntity();
            $new = true;
        }
        try {
            $classe->setDescription($paramDescription);
            $em->persist($classe);
            $em->flush();
            if ($new) {
                $text = sprintf("la classe %s est bien créée", $classe->getDescription());
            } else {
                $text = sprintf("la classe %s est bien mise à jour", $classe->getDescription());
            }
            $data = array('id' => $classe->getId());
            $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_SUCCESS, $text, $text, $data);

        } catch (\Exception $e) {
            $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_BAD_REQUEST, $e->getMessage(), "Data not saved");
        }
        $response->setData($msgReturn);

        return $response;
    }

    /**
     * Suppression de la classe
     * @param integer $classe
     * @Rest\Post("/api/classe/delete/{classe}", name="classe_delete", requirements={"classe":"\d+"})
     * @ParamConverter("classe",class="AdminBundle:TzClassEntity")
     * @throws
     * @return JsonResponse
     */
    public function deleteClasse($classe) {
        $tzServiceMsg = $this->get('ws.tz_msg');
        $response = new JsonResponse();
        $em = $this->getDoctrine()->getManager();
        if ($classe instanceof TzClassEntity) {
            $text = sprintf("la classe %s est bien supprimée", $classe->getDescription());
            $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_SUCCESS, $text, $text, null);
            $response->setData($msgReturn);
            $em->remove($classe);
            $em->flush();
            return $response;
        } else {
            throw new \Exception("classe not found");
        }
    }

    /**
     * @param integer $classe
     *
     * @Rest\Post("/api/classe/find", name="recherche_classe",defaults={"classe": null})
     * @Rest\GET("/api/classe/find/{classe}", name="recherche_classe_by_id", requirements={"classe":"\d+"})
     * @ParamConverter("classe",class="AdminBundle:TzClassEntity")
     * @return JsonResponse
     */
    public function rechercheclasse($classe) {

        $response = new JsonResponse();
        if ($classe instanceof TzClassEntity) {
            $data = $classe;
        } else {
            $repclasse = $this->getDoctrine()->getRepository(TzClassEntity::class);
            $data = $repclasse->findBy(array(), array('description' => 'ASC'));
        }
        $posResponse = $this->get("tz.responses");
        $resData = $posResponse->setSuccessResponse($data, "json", array("classe_etd"));
        return $response->setData($resData);
    }
}