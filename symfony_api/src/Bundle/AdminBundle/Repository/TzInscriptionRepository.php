<?php
/**
 * Created by PhpStorm.
 * User: Tux
 * Date: 14/11/2018
 * Time: 14:10
 */

namespace Bundle\AdminBundle\Repository;
/**
 * Class TzInscriptionRepository
 * @package Bundle\AdminBundle\Repository
 */

use Bundle\AdminBundle\Entity\TzEtudiantEntity;

class TzInscriptionRepository extends \Doctrine\ORM\EntityRepository
{
    /**
     * Recherche si id est dans la tabla tz_etudiant
     * @return boolean
     */

    public function isIdIn($id){

        $em = $this->getDoctrine()->getManager();
        $result = $em->getRepository(TzEtudiantEntity::class)->find($id);

        if(!is_null($result)){
            return true;
        }
        return false;
    }
}