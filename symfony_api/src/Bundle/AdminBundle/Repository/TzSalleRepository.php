<?php
/**
 * Created by PhpStorm.
 * User: Predator
 * Date: 11/11/2018
 * Time: 17:22
 */

namespace Bundle\AdminBundle\Repository;

/**
 * Class PTzSalleRepository
 * @package Bundle\AdminBundle\Repository
 */
class TzSalleRepository extends \Doctrine\ORM\EntityRepository
{
    /**
     * Recherche de salle libre
     * @return array
     */
    public function getSalleLibre()
    {
        $queryBuilder = $this->createQueryBuilder('s');
        $queryBuilder->andWhere(
            $queryBuilder->expr()->orX(
                $queryBuilder->expr()->lte(
                    's.dateFinOccupation',
                    'CURRENT_TIMESTAMP()'
                ),
                $queryBuilder->expr()->isNull(
                    's.dateFinOccupation'
                )
            )
        );
        $queryBuilder->orderBy('s.nom', 'ASC');
        $salleResult = $queryBuilder->getQuery()->getResult();
        return $salleResult;

    }
}