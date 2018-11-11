<?php
/**
 * Created by PhpStorm.
 * User: Predator
 * Date: 11/11/2018
 * Time: 17:14
 */

namespace Bundle\AdminBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
/**
 * TzEtablissement
 *
 * @ORM\Table(name="tz_etudiant")
 * @ORM\Entity(repositoryClass="Bundle\AdminBundle\Repository\TzEtudiantRepository")
 */
class TzEtudiantEntity
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
     * @ORM\Column(name="etd_nom", type="string", length=80, nullable=true)
     */
    private $non;

    /**
     * @var string
     *
     * @ORM\Column(name="edt_matricule", type="string", length=80, nullable=true)
     */
    private $matricule;

    /**
     * @var string
     *
     * @ORM\Column(name="id_classe", type="integer", nullable=true)
     */
    private $classeId;

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
    public function getNon()
    {
        return $this->non;
    }

    /**
     * @param string $non
     */
    public function setNon($non)
    {
        $this->non = $non;
    }

    /**
     * @return string
     */
    public function getMatricule()
    {
        return $this->matricule;
    }

    /**
     * @param string $matricule
     */
    public function setMatricule($matricule)
    {
        $this->matricule = $matricule;
    }

    /**
     * @return string
     */
    public function getClasseId()
    {
        return $this->classeId;
    }

    /**
     * @param string $classeId
     */
    public function setClasseId($classeId)
    {
        $this->classeId = $classeId;
    }


}