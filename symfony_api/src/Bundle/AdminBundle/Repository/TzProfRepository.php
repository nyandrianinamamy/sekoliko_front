<?php

namespace Bundle\AdminBundle\Repository;
use Bundle\AdminBundle\Entity\TzProfEntity;
use FOS\RestBundle\Request\ParamFetcher;

/**
 * Created by PhpStorm.
 * User: Tahiana_Rakotonirina
 * Date: 11/11/2018
 * Time: 17:12
 */
class TzProfRepository extends \Doctrine\ORM\EntityRepository
{

    /**
     * function de recherche de prof
     * @param ParamFetcher $paramFetcher
     * @return array
     */
    public function search(ParamFetcher $paramFetcher) {
        $paramMatiere = $paramFetcher->get('matiere');
        $paramProf = $paramFetcher->get('nom');
        $querybuilder = $this->getEntityManager()
            ->getRepository(TzProfEntity::class)
            ->createQueryBuilder('p');
        if (!is_null($paramProf) && !empty($paramProf)) {
            $querybuilder->andWhere(
                $querybuilder->expr()->like('p.nom',
                    $querybuilder->expr()->literal('%' . $paramProf . '%'))
            );
        }
        if (!is_null($paramMatiere) && !empty($paramMatiere)) {
            $querybuilder->andWhere(
                $querybuilder->expr()->eq('p.matiereId', $paramMatiere)
            );
        }
        $etat = $querybuilder->getQuery()->getResult();
        return $etat;
    }
}