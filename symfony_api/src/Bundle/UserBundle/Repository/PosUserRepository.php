<?php

namespace Bundle\UserBundle\Repository;
use Bundle\UserBundle\Entity\TzUser;
use FOS\RestBundle\Request\ParamFetcher;
use JMS\Serializer\SerializerBuilder;

/**
 * Created by PhpStorm.
 * User: Tahiana_Rakotonirina
 * Date: 11/11/2018
 * Time: 17:12
 */
class PosUserRepository extends CoreRepository
{
    /**
     * function de recherche de user
     * @param ParamFetcher $paramFetcher
     * @return array
     */
    public function searchUser(ParamFetcher $paramFetcher, $page = 1, $limit = 50) {
        $paramUsername = $paramFetcher->get('username');
        $paramEmail = $paramFetcher->get('email');
        $paramEnabled = $paramFetcher->get('enabled');
        $paramFirstName = $paramFetcher->get('firstname');
        $paramLastName = $paramFetcher->get('lastname');
        $paramMatricule = $paramFetcher->get('matricule');
        $paramRole = $paramFetcher->get('role');
        $paramsexe = $paramFetcher->get('sexe');
        $paramAge = $paramFetcher->get('age');
        $paramAdresse = $paramFetcher->get('adresse');
        $paramcontact = $paramFetcher->get('contact');
        $querybuilder = $this->getEntityManager()
            ->getRepository(TzUser::class)
            ->createQueryBuilder('p');
        if (!is_null($paramUsername) && !empty($paramUsername)) {
            $querybuilder->andWhere(
                $querybuilder->expr()->like('p.username',
                    $querybuilder->expr()->literal('%' . $paramUsername . '%'))
            );
        }
        if (!is_null($paramEmail) && !empty($paramEmail)) {
            $querybuilder->andWhere(
                $querybuilder->expr()->like('p.email',
                    $querybuilder->expr()->literal('%' . $paramEmail . '%'))
            );
        }
        if (!is_null($paramFirstName) && !empty($paramFirstName)) {
            $querybuilder->andWhere(
                $querybuilder->expr()->like('p.firstname',
                    $querybuilder->expr()->literal('%' . $paramFirstName . '%'))
            );
        }
        if (!is_null($paramLastName) && !empty($paramLastName)) {
            $querybuilder->andWhere(
                $querybuilder->expr()->like('p.lastname',
                    $querybuilder->expr()->literal('%' . $paramLastName . '%'))
            );
        }
        if (!is_null($paramMatricule) && !empty($paramMatricule)) {
            $querybuilder->andWhere(
                $querybuilder->expr()->like('p.matricule',
                    $querybuilder->expr()->literal('%' . $paramMatricule . '%'))
            );
        }
        if (!is_null($paramRole) && !empty($paramRole)) {
            $querybuilder->andWhere(
                $querybuilder->expr()->eq('p.roleType', $paramRole)
            );
        }
        if (!is_null($paramAdresse) && !empty($paramAdresse)) {
            $querybuilder->andWhere(
                $querybuilder->expr()->like('p.adresse',
                    $querybuilder->expr()->literal('%' . $paramAdresse . '%'))
            );
        }
        if (!is_null($paramcontact) && !empty($paramcontact)) {
            $querybuilder->andWhere(
                $querybuilder->expr()->like('p.contact',
                    $querybuilder->expr()->literal('%' . $paramcontact . '%'))
            );
        }
        if (!is_null($paramEnabled) && !empty($paramEnabled)) {
            $querybuilder->andWhere(
                $querybuilder->expr()->eq('p.enabled', $paramEnabled)
            );
        }
        if (!is_null($paramsexe) && !empty($paramsexe)) {
            $querybuilder->andWhere(
                $querybuilder->expr()->eq('p.sexe', $paramsexe)
            );
        }
        if (!is_null($paramAge) && !empty($paramAge)) {
            $querybuilder->andWhere(
                $querybuilder->expr()->eq('p.age', $paramAge)
            );
        }
        $qbTotal = clone $querybuilder;
        $qbTotal->select('COUNT(p) total');
        $total = $qbTotal->getQuery()->getOneOrNullResult();
        $offset = $this->getOffset($page, $limit);
        $querybuilder->setFirstResult($offset);
        $querybuilder->setMaxResults($limit);

        $etat = $querybuilder->getQuery()->getResult();
        $serializer = SerializerBuilder::create()->build();
        $data = json_decode($serializer->serialize($etat, 'json'), true);
        $response = array(
            'count' => count($data),
            'total' => (int) $total['total'],
            'list'  => $data,
        );
        return $response;
    }
}