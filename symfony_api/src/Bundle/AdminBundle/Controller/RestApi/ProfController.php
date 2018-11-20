<?php
/**
 * Created by PhpStorm.
 * User: Predator
 * Date: 15/11/2018
 * Time: 19:16
 */

namespace Bundle\AdminBundle\Controller\RestApi;
use Bundle\AdminBundle\Entity\TzMatiereEntity;
use Bundle\AdminBundle\Entity\TzProfEntity;
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
 * Class ProfController
 * @package Bundle\AdminBundle\Controller\RestApi
 */
class ProfController extends FOSRestController
{

    /**
     * suppression d'un prof
     *
     * @param integer $prof
     * @Rest\Post("/api/prof/delete/{prof}", name="prof_delete", requirements={"prof":"\d+"})
     * @ParamConverter("prof",class="AdminBundle:TzProfEntity")
     * @throws
     * @return JsonResponse
     */
    public function deleteSalle($prof) {
        $response = new JsonResponse();
        $tzServiceMsg = $this->get('ws.tz_msg');
        $em = $this->getDoctrine()->getManager();
        if ($prof instanceof TzProfEntity) {
            $text = sprintf("le prof %s est bien supprimé", $prof->getNom());
            $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_SUCCESS, $text, $text, null);
            $response->setData($msgReturn);
            $em->remove($prof);
            $em->flush();
            return $response;
        } else {
            throw new \Exception("Prof not found");
        }
    }

    /**
     * Creation et edition de prof
     *
     * @param integer $prof
     * @param ParamFetcher $paramFetcher
     * @Rest\Post("/api/prof/edit", name="prof_new", defaults={"prof": null})
     * @Rest\Post("/api/prof/edit/{prof}", name="prof_modify", requirements={"prof":"\d+"})
     * @Rest\RequestParam(name="nom", nullable=false)
     * @Rest\RequestParam(name="matiere", nullable=false)
     * @ParamConverter("prof",class="AdminBundle:TzProfEntity")
     * @throws
     * @return JsonResponse
     */
    public function editProf($prof, ParamFetcher $paramFetcher) {
        $response = new JsonResponse();
        $new = false;
        $paramNom = $paramFetcher->get('nom');
        $paramMatiere = $paramFetcher->get('matiere');
        $tzServiceMsg = $this->get('ws.tz_msg');
        $em = $this->getDoctrine()->getManager();
        if (!$prof instanceof TzProfEntity) {
            $prof = new TzProfEntity();
            $new = true;
        }
        try {
            $prof->setNom($paramNom);
            $repMatiere = $em->getRepository(TzMatiereEntity::class);
            $matier = $repMatiere->find($paramMatiere);
            if (!$matier instanceof TzMatiereEntity) {
                throw new \Exception("Matière not found");
            }
            $prof->setMatiereId($matier);
            $em->persist($prof);
            $em->flush();
            if ($new) {
                $text = sprintf("le prof %s est bien créé", $prof->getNom());
            } else {
                $text = sprintf("le prof %s est bien mise à jour", $prof->getNom());
            }
            $data = array('id' => $prof->getId());
            $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_SUCCESS, $text, $text, $data);
        } catch (\Exception $e){
            $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_BAD_REQUEST, $e->getMessage(), "Data not saved");
        }
        $response->setData($msgReturn);
        return $response;
    }

    /**
     * @param integer $prof
     * @param ParamFetcher $paramFetcher
     * @Rest\Post("/api/prof/find", name="recherche_prof",defaults={"prof": null})
     * @Rest\RequestParam(name="nom", nullable=true)
     * @Rest\RequestParam(name="matiere", nullable=true)
     * @Rest\GET("/api/prof/find/{prof}", name="recherche_prof_by_id", requirements={"prof":"\d+"})
     * @ParamConverter("prof",class="AdminBundle:TzProfEntity")
     * @return JsonResponse
     */
    public function rechercheSalle($prof, ParamFetcher $paramFetcher) {
        $response = new JsonResponse();
        if ($prof instanceof TzProfEntity) {
            $data = $prof;
        } else {
            $repProf = $this->getDoctrine()->getRepository(TzProfEntity::class);
            $data = $repProf->search($paramFetcher);
        }
        $posResponse = $this->get("tz.responses");
        $resData = $posResponse->setSuccessResponse($data, "json", array("prof_list"));
        return $response->setData($resData);
    }
}