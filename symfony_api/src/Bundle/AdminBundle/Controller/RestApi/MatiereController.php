<?php
/**
 * Created by PhpStorm.
 * User: Tahiana_Rakotonirina
 * Date: 19/11/2018
 * Time: 19:51
 */

namespace Bundle\AdminBundle\Controller\RestApi;

use Bundle\AdminBundle\Entity\TzClasseEnfantEntity;
use FOS\RestBundle\Controller\Annotations as Rest;
use Bundle\AdminBundle\Entity\TzClassEntity;
use Bundle\AdminBundle\Entity\TzMatiereEntity;
use Bundle\CommunBundle\Utils\ConstantSrv;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Request\ParamFetcher;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\JsonResponse;
use Bundle\CommunBundle\Controller\RestApi\AbstractClassRestController;
class MatiereController extends AbstractClassRestController
{

    /**
     * Creation et edition de matiere
     *
     * @param integer $matiere
     * @param ParamFetcher $paramFetcher
     * @Rest\Post("/api/matiere/edit", name="matiere_new", defaults={"matiere": null})
     * @Rest\Post("/api/matiere/edit/{matiere}", name="matiere_modify", requirements={"matiere":"\d+"})
     * @Rest\RequestParam(name="nom", nullable=false)
     * @Rest\RequestParam(name="coeff", nullable=false)
     * @Rest\RequestParam(name="class", nullable=false)
     * @ParamConverter("matiere",class="AdminBundle:TzMatiereEntity")
     * @throws
     * @return JsonResponse
     */
    public function editMatiere($matiere, ParamFetcher $paramFetcher) {
        $response = new JsonResponse();
        $new = false;
        $paramNom = $paramFetcher->get('nom');
        $paramCoeff = $paramFetcher->get('coeff');
        $paramClass = $paramFetcher->get('class');
        $tzServiceMsg = $this->get('ws.tz_msg');
        $em = $this->getDoctrine()->getManager();
        if (!$matiere instanceof TzMatiereEntity) {
            $matiere = new TzMatiereEntity();
            $new = true;
        }
        try {
            $matiere->setDescription($paramNom);
            $matiere->setCoefficient($paramCoeff);
            $repClasse = $em->getRepository(TzClasseEnfantEntity::class);
            $classe = $repClasse->find($paramClass);
            if (!$classe instanceof TzClasseEnfantEntity) {
                throw new \Exception("Classe not found");
            }
            $matiere->setClasse($classe);
            $em->persist($matiere);
            $em->flush();
            if ($new) {
                $text = sprintf("la matière %s est bien créé", $matiere->getDescription());
            } else {
                $text = sprintf("la matière %s est bien mise à jour", $matiere->getDescription());
            }
            $data = array('id' => $matiere->getId());
            $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_SUCCESS, $text, $text, $data);

        } catch  (\Exception $e){
            $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_BAD_REQUEST, $e->getMessage(), "Data not saved");
        }
        $response->setData($msgReturn);
        return $response;
    }

    /**
     * suppression d'un matiere
     *
     * @param integer $matiere
     * @Rest\Post("/api/matiere/delete/{matiere}", name="matiere_delete", requirements={"matiere":"\d+"})
     * @ParamConverter("matiere",class="AdminBundle:TzMatiereEntity")
     * @throws
     * @return JsonResponse
     */
    public function deleteMatiere($matiere) {
        $response = new JsonResponse();
        $tzServiceMsg = $this->get('ws.tz_msg');
        $em = $this->getDoctrine()->getManager();
        if ($matiere instanceof TzMatiereEntity) {
            $text = sprintf("la matière %s est bien supprimée", $matiere->getDescription());
            $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_SUCCESS, $text, $text, null);
            $response->setData($msgReturn);
            $em->remove($matiere);
            $em->flush();
            return $response;
        } else {
            throw new \Exception("Prof not found");
        }
    }

    /**
     * @param integer $matiere
     * @param ParamFetcher $paramFetcher
     * @Rest\Post("/api/matiere/find", name="recherche_matiere",defaults={"matiere": null})
     * @Rest\RequestParam(name="nom", nullable=true)
     * @Rest\RequestParam(name="coeff", nullable=true)
     * @Rest\RequestParam(name="class", nullable=true)
     * @Rest\GET("/api/matiere/find/{matiere}", name="recherche_matiere_by_id", requirements={"matiere":"\d+"})
     * @ParamConverter("matiere",class="AdminBundle:TzMatiereEntity")
     * @return JsonResponse
     */
    public function rechercheMatiere($matiere, ParamFetcher $paramFetcher) {
        $response = new JsonResponse();
        if ($matiere instanceof TzMatiereEntity) {
            $data = $matiere;
        } else {
            $repMatiere = $this->getDoctrine()->getRepository(TzMatiereEntity::class);
            $data = $repMatiere->search($paramFetcher);
        }
        $posResponse = $this->get("tz.responses");
        $resData = $posResponse->setSuccessResponse($data, "json", array("matiere_list"));
        return $response->setData($resData);
    }
}