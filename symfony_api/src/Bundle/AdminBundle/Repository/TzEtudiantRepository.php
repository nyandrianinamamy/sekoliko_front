<?php
/**
 * Created by PhpStorm.
 * User: Tahiana_Rakotonirina
 * Date: 11/11/2018
 * Time: 17:13
 */

namespace Bundle\AdminBundle\Repository;


class TzEtudiantRepository extends \Doctrine\ORM\EntityRepository
{
    public function whereQuery($id){
        $queryBuilder = $this->createQueryBuilder('s');
        $queryBuilder->andWhere(
            $queryBuilder->expr()->eq('s.id', $id)
        );
        $queryBuilder->getQuery()->execute();
    }
}