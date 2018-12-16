<?php
/**
 * Created by PhpStorm.
 * User: Tux
 * Date: 01/12/2018
 * Time: 07:59
 */

namespace Bundle\AdminBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * TzEtablissement
 *
 * @ORM\Table(name="tz_annee_scolaire")
 * @ORM\Entity(repositoryClass="Bundle\AdminBundle\Repository\TzAnneeScloaireRepository") 
 */
class TzAnneeScolaireEntity
{
    /**
     * @var integer
     * 
     * @ORM\Id
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * @JMS\Groups({"inscrit","notes","as"})
     * @JMS\SerializedName("AnneeScolaireID")
     */
    private $id;

    /**
     * @var \DateTime
     * @ORM\Column(name="date_debut", type="datetime", nullable=false)
     * @JMS\Groups({"inscrit","as"})
     */
    private $dateDebut;

    /**
     * @var \DateTime
     * @ORM\Column(name="date_fin", type="datetime", nullable=false)
     * @JMS\Groups({"inscrit","as"})
     */
    private $dateFin;

    /*
     * @return integer
     */
    public function getID(){
        return $this->id;
    }

    /**
     * @return \DateTime
     */
    public function getDateDebut(){
        return $this->dateDebut;
    }

    /**
     * @param \DateTime $date
     */
    public function setDateDebut($date){
        $this->dateDebut = $date;
    }

    /**
     * @return \DateTime
     */
    public function getDateFin(){
        return $this->dateFin;
    }

    /**
     * @param \DateTime $date
     */
    public function setDateFin($date){
        $this->dateFin= $date;
    }
}