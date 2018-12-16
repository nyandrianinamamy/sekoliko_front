<?php
namespace Bundle\AdminBundle\Controller\RestApi;


use Bundle\AdminBundle\Entity\TzNotesEntity;
use Bundle\AdminBundle\Entity\TzInscriptionEntity;
use Bundle\AdminBundle\Entity\TzMatiereEntity;
use Bundle\AdminBundle\Repository\TzNotesRepository;
use Bundle\CommunBundle\Utils\ConstantSrv;
use Doctrine\DBAL\DBALException;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest,
    FOS\RestBundle\Request\ParamFetcher,
    Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use Symfony\Component\BrowserKit\Request;
use Bundle\CommunBundle\Controller\RestApi\AbstractClassRestController;
use Symfony\Component\HttpFoundation\JsonResponse;


/**
 * Created by Visual Studio Code.
 * User: Tux
 * Date: 15/12/2018
 * Time: 08:31
 */

/**
 * Class NotesController
 * @package Bundle\AdminBundle\Controller\RestApi
 */


class NotesController extends AbstractClassRestController
{
    public function setSuccessResponse($data, $format, $context)
    {
        $posResponse = $this->get("tz.responses");
        $resData = $posResponse->successSerialize($data, "json", $context);
        return $resData;
    }

    /**
     * @param ParamFetcher $paramFetcher
     * @Rest\Post("/api/addnote")
     * @Rest\RequestParam(name="numins", nullable=false)
     * @Rest\RequestParam(name="idmat", nullable=false)
     * @Rest\RequestParam(name="note", nullable=false)
     * @return JsonResponse
     */

     public function addNote(ParamFetcher $paramFetcher){
        $response = new JsonResponse();
        $tzServiceMsg = $this->get('ws.tz_msg');

        $parameterNumins = $paramFetcher->get('numins');
        $parameterIdmat = $paramFetcher->get('idmat');
        $parameterNote = $paramFetcher->get('note');

        $em = $this->getDoctrine()->getManager();

        try {
            $note = new TzNotesEntity();
            $inscription = $em->getRepository(TzInscriptionEntity::class);
            $valeIns = $inscription->find($parameterNumins);
            $matiere = $em->getRepository(TzMatiereEntity::class);
            $valueMat = $matiere->find($parameterIdmat);
            if ($valeIns instanceof TzInscriptionEntity && $valueMat instanceof TzMatiereEntity) {

                $note->setIdins($valeIns);
                $note->setIdmat($valueMat);
                $note->setNote($parameterNote);

                $data = ['numins' =>$parameterNumins, '$idmat' =>$parameterIdmat, 'note' =>$parameterNote];

                $em->persist($note);
                $em->flush();

                $text = sprintf("Add successfully");
                $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_SUCCESS, $text, $text, $data);
            } else {
                $text = sprintf("Violation constraint foreign key");
                $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_SUCCESS, $text, $text, null);
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
     * @Rest\Post("/api/editnote")
     * @Rest\RequestParam(name="id", nullable=false)
     * @Rest\RequestParam(name="numins", nullable=false)
     * @Rest\RequestParam(name="idmat", nullable=false)
     * @Rest\RequestParam(name="note", nullable=false)
     * @return JsonResponse
     */

    public function editNote(ParamFetcher $paramFetcher){
        $response = new JsonResponse();
        $tzServiceMsg = $this->get('ws.tz_msg');

        $parameterId = $paramFetcher->get('id');
        $parameterNumins = $paramFetcher->get('numins');
        $parameterIdmat = $paramFetcher->get('idmat');
        $parameterNote = $paramFetcher->get('note');

        $em = $this->getDoctrine()->getManager();
        try {
            $note = $em->getRepository(TzNotesEntity::class)->find($parameterId);
            if ($note instanceof  TzNotesEntity) {
                $valeIns = $em->getRepository(TzInscriptionEntity::class)->find($parameterNumins);
                $valueMat = $em->getRepository(TzMatiereEntity::class)->find($parameterIdmat);
                if ($valeIns instanceof TzInscriptionEntity && $valueMat instanceof TzMatiereEntity) {
                    $note->setIdins($valeIns);
                    $note->setIdmat($valueMat);
                    $note->setNote($parameterNote);

                    $em->persist($note);
                    $em->flush();

                    $text = sprintf("Update successfully");
                    $data = ['numins' =>$parameterNumins, '$idmat' =>$parameterIdmat, 'note' =>$parameterNote];
                    $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_SUCCESS, $text, $text, $data);
                } else{
                    $text = sprintf("Violation constraint foreign key");
                    $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_BAD_REQUEST, $text, $text, null);
                }
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
     * @Rest\Get("/api/deletenote/{id}", requirements={"id"="\d+"})
     * @return JsonResponse
     */

    public function removeNote($id){
        $response = new JsonResponse();
        $tzServiceMsg = $this->get('ws.tz_msg');

        $em = $this->getDoctrine()->getManager();
        try {
            $note = $em->getRepository(TzNotesEntity::class)->find($id);
            
            $em->remove($note);
            $em->flush();

            $text = sprintf("Remove successfully");
            $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_SUCCESS, $text, $text, null);
        } catch (DBALException $e) {
            $text = sprintf("%s", $e->getMessage());
            $msgReturn = $tzServiceMsg->getMsg(ConstantSrv::CODE_INTERNAL_ERROR, $text, $text, null);

        } finally {
            $response->setData($msgReturn);
            return $response;
        }
     }
}