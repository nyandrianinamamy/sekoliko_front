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
use Bundle\AdminBundle\Entity\TzAnneeScolaireEntity;
use Bundle\AdminBundle\Entity\TzClasseEnfantEntity;
use Bundle\AdminBundle\Entity\TzNotesEntity;
use FOS\RestBundle\Request\ParamFetcher;

class TzInscriptionRepository extends \Doctrine\ORM\EntityRepository
{
    /**
     * @param ParamFetcher $paramFetcher
     * @return array
     */

    public function findIns(ParamFetcher $paramFetcher){
        $paramNumins = $paramFetcher->get('numins');
        $paramUserid = $paramFetcher->get('userid');
        $paramIdclasse = $paramFetcher->get('idclasse');
        $paramIdclasseparent = $paramFetcher->get('idclasseparent');
        $paramIdas = $paramFetcher->get('idas');
        $paramDateins = $paramFetcher->get('dateins');
        $paramStatus = $paramFetcher->get('status');

        $querybuilder = $this->createQueryBuilder('p');

        if (isset($paramNumins)) {
            $querybuilder->andWhere('p.num_inscription = :numins')
            ->setParameter('numins', $paramNumins);
        }
        if (isset($paramUserid)) {
            $querybuilder->andWhere('p.user_id = :userid')
            ->setParameter('userid', $paramUserid);
        }
        if (isset($paramIdclasse)) {
            $querybuilder->select('p')
            ->innerJoin('AdminBundle:TzClasseEnfantEntity', 'c', 'WITH', 'p.id_classe = c.id')
            ->andWhere('c.id = :idclasse')
            ->setParameter('idclasse', $paramIdclasse);
        }
        if (isset($paramIdclasseparent)) {
            $querybuilder->select('p')
            ->innerJoin('AdminBundle:TzClasseEnfantEntity', 'c', 'WITH', 'p.id_classe = c.id')
            ->innerJoin('AdminBundle:TzClassEntity', 'o', 'WITH', 'c.parent = o.id')
            ->andWhere('o.description = :idclasseparent')
            ->setParameter('idclasseparent', $paramIdclasseparent);
        }
        if (isset($paramIdas)) {
            $querybuilder->andWhere('p.id_annee_scolaire = :idas')
            ->setParameter('idas', $paramIdas);
        }
        if (isset($paramDateins)) {
            /* if(preg_match("#(\d\d\d\d)-([1][1-2]|[0][1-9])-([0][1-9]|[1-2][0-9]|[3][0-1])#", $paramDateins))
            $date = \DateTime::createFromFormat("Y-m-d", $paramDateins);
            $querybuilder->andWhere('YEAR(p.date_inscription) = :year')
            // ->andWhere('MONTH(p.date_inscription) = :month')
            // ->andWhere('DAY(p.date_inscription) = :day')
            ->setParameter('year', $date->format('Y'))
            // ->setParameter('month', $date->format('m'))
            // ->setParameter('day', $date->format('d')); */
        }
        if (isset($paramStatus)) {
            $querybuilder->andWhere('p.statut = :status')
            ->setParameter('status', $paramStatus);
        }

        return $querybuilder->getQuery()->getResult();
    }

    /**
     * @param ParamFetcher $paramFetcher
     * @return array
     */

    public function showNote(ParamFetcher $paramFetcher){
        $paramNumins = $paramFetcher->get('numins');
        $paramAs = $paramFetcher->get('as');
        $paramMat = $paramFetcher->get('mat');
        $paramNote = $paramFetcher->get('note');

        $querybuilder = $this->createQueryBuilder('i');

        if (isset($paramNumins)) {
            $querybuilder->select('i')
                ->innerJoin('AdminBundle:TzNotesEntity', 'n', 'WITH', 'i.num_inscription = n.id_ins')
                ->andWhere('i.num_inscription = :numins')
                ->setParameter('numins', $paramNumins)
                ->addSelect('n');
        }
        if (isset($paramAs)) {
            $querybuilder->select('i')
                ->andWhere('i.id_annee_scolaire = :as')
                ->setParameter('as', $paramAs)
                ->innerJoin('AdminBundle:TzNotesEntity', 'e',  'WITH', 'i.num_inscription = e.id_ins')
                ->addSelect('e');
        }
        if (isset($paramMat)) {
            $querybuilder->select('i')
                ->innerJoin('AdminBundle:TzNotesEntity', 'z', 'WITH', 'i.num_inscription = z.id_ins')
                ->innerJoin('AdminBundle:TzMatiereEntity', 'm', 'WITH', 'z.id_mat = m.id')
                ->andWhere('z.id_mat = :mat')
                ->setParameter('mat', $paramMat)
                ->addSelect('z')
                ->addSelect('m');
        }
        if (isset($paramNote)) {
            $querybuilder->select('i')
                ->innerJoin('AdminBundle:TzNotesEntity', 'a', 'WITH', 'i.num_inscription = a.id_ins')
                ->andWhere('a.note = :note')
                ->setParameter('note', $paramNote)
                ->addSelect('a');
        }
        return $querybuilder->getQuery()->getResult();
    }
}