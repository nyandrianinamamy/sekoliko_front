<?php
/**
 * Created by PhpStorm.
 * User: Predator
 * Date: 11/11/2018
 * Time: 17:09
 */

namespace Bundle\AdminBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
/**
 * TzEtablissement
 *
 * @ORM\Table(name="tz_prof")
 * @ORM\Entity(repositoryClass="Bundle\AdminBundle\Repository\TzProfRepository")
 */
class TzProfEntity
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
     * @ORM\Column(name="prof_nom", type="string", length=80, nullable=true)
     */
    private $nom;

    /**
     * @var string
     *
     * @ORM\Column(name="id_matiere", type="integer", nullable=true)
     */
    private $matiereId;

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
     * @return string
     */
    public function getMatiereId()
    {
        return $this->matiereId;
    }

    /**
     * @param string $matiereId
     */
    public function setMatiereId($matiereId)
    {
        $this->matiereId = $matiereId;
    }


}