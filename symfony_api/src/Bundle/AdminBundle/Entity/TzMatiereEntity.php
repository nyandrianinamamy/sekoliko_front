<?php
/**
 * Created by PhpStorm.
 * User: Predator
 * Date: 11/11/2018
 * Time: 17:18
 */

namespace Bundle\AdminBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;
/**
 * TzEtablissement
 *
 * @ORM\Table(name="tz_matiere")
 * @ORM\Entity(repositoryClass="Bundle\AdminBundle\Repository\TzMatiereRepository")
 */
class TzMatiereEntity
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
     * @ORM\Column(name="mat_nom", type="string", length=80, nullable=true)
     * @JMS\Groups({"prof_list"})
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="mat_coeff", type="integer", nullable=true)
     */
    private $coefficient;

    /**
     * @var string
     *
     * @ORM\Column(name="id_class", type="integer", nullable=true)
     */
    private $classe;

    /**
     * @var string
     *
     * @ORM\Column(name="id_prof", type="integer", nullable=true)
     */
    private $prof;

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
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return string
     */
    public function getCoefficient()
    {
        return $this->coefficient;
    }

    /**
     * @param string $coefficient
     */
    public function setCoefficient($coefficient)
    {
        $this->coefficient = $coefficient;
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

    /**
     * @return string
     */
    public function getProf()
    {
        return $this->prof;
    }

    /**
     * @param string $prof
     */
    public function setProf($prof)
    {
        $this->prof = $prof;
    }

}
