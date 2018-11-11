<?php
/**
 * Created by PhpStorm.
 * User: Predator
 * Date: 11/11/2018
 * Time: 17:21
 */

namespace Bundle\AdminBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
/**
 * TzEtablissement
 *
 * @ORM\Table(name="tz_salle")
 * @ORM\Entity(repositoryClass="Bundle\AdminBundle\Repository\TzSalleRepository")
 */
class TzSalleEntity
{

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="salle_nom", type="string", length=80, nullable=true)
     */
    private $nom;

    /**
     * @var \DateTime
     * @ORM\Column(name="salle_date_debut_occupation", type="datetime",nullable=false)
     */
    private $dateDebutOccupation;

    /**
     * @var \DateTime
     * @ORM\Column(name="salle_date_fin_occupation", type="datetime",nullable=false)
     */
    private $dateFinOccupation;

    /**
     * @var string
     *
     * @ORM\Column(name="salle_classe_occupe", type="string", length=80, nullable=true)
     */
    private $classe;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }


    /**
     * @return string
     */
    public function getNom()
    {
        return $this->nom;
    }

    /**
     * @param string $nom
     */
    public function setNom($nom)
    {
        $this->nom = $nom;
    }

    /**
     * @return \DateTime
     */
    public function getDateDebutOccupation()
    {
        return $this->dateDebutOccupation;
    }

    /**
     * @param \DateTime $dateDebutOccupation
     */
    public function setDateDebutOccupation($dateDebutOccupation)
    {
        $this->dateDebutOccupation = $dateDebutOccupation;
    }

    /**
     * @return \DateTime
     */
    public function getDateFinOccupation()
    {
        return $this->dateFinOccupation;
    }

    /**
     * @param \DateTime $dateFinOccupation
     */
    public function setDateFinOccupation($dateFinOccupation)
    {
        $this->dateFinOccupation = $dateFinOccupation;
    }

    /**
     * @return string
     */
    public function getClasse()
    {
        return $this->classe;
    }

    /**
     * @param string $classe
     */
    public function setClasse($classe)
    {
        $this->classe = $classe;
    }


}