<?php
/**
 * Created by PhpStorm.
 * User: Tahiana_Rakotonirina
 * Date: 11/11/2018
 * Time: 17:18
 */

namespace Bundle\AdminBundle\Repository;


use Bundle\AdminBundle\Entity\TzMatiereEntity;
use FOS\RestBundle\Request\ParamFetcher;

class TzMatiereRepository extends \Doctrine\ORM\EntityRepository
{
    /**
     * function de recherche de matiere
     * @param ParamFetcher $paramFetcher
     * @return array
     */
    public function search(ParamFetcher $paramFetcher) {
        $paramId = $paramFetcher->get('id');
        $paramNom = $paramFetcher->get('nom');
        $paramCoeff = $paramFetcher->get('coeff');
        $paramClass = $paramFetcher->get('class');
        $paramProf = $paramFetcher->get('prof');

        $querybuilder = $this->createQueryBuilder('m');

        if (isset($paramNom)) {
            $querybuilder->select('m')
                ->andwhere('m.description = :nom')
                ->setParameter('nom', $paramNom);
        }
        if (isset($paramId)) {
            $querybuilder->select('m')
                ->andWhere('m.id = :id')
                ->setParameter('id', $paramId);
        }
        if (isset($paramCoeff)) {
            $querybuilder->select('m')
                ->andWhere('m.coefficient = :coeff')
                ->setParameter('coeff', $paramCoeff);
        }
        if (isset($paramClass)) {
            $querybuilder->select('m')
                ->andWhere('m.classe = :classe')
                ->setParameter('classe', $paramClass);
        }
        if (isset($paramProf)) {
            $querybuilder->select('m')
                ->innerJoin('UserBundle:TzUser', 'u', 'WITH', 'm.ProfId = u.userId')
                ->andWhere('m.ProfId = :prof')
                ->setParameter('prof', $paramProf);
        }
        return $querybuilder->getQuery()->getResult();
    }
}