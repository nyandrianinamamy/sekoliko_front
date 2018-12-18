<?php
/**
 * Created by PhpStorm.
 * User: Tahiana_Rakotonirina
 * Date: 11/11/2018
 * Time: 17:18
 */

namespace Bundle\AdminBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;
use Bundle\AdminBundle\Entity\TzClassEntity;
use Bundle\AdminBundle\Entity\TzClasseEnfantEntity;
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
     * @JMS\Groups({"prof_list", "matiere_list","notes"})
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="mat_nom", type="string", length=80, nullable=true)
     * @JMS\Groups({"prof_list", "matiere_list","notes"})
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="mat_coeff", type="integer", nullable=true)
     * @JMS\Groups({"prof_list", "matiere_list","notes"})
     */
    private $coefficient;

    /**
     * @var string
     *
     * @ORM\ManyToOne(targetEntity="TzClasseEnfantEntity")
     * @ORM\JoinColumns({
     *  @ORM\JoinColumn(name="id_class", referencedColumnName="id")
     * })
     * @JMS\Groups({"prof_list", "matiere_list","notes"})
     * @JMS\Groups({"matiere_list","notes"})
     */
    private $classe;

    /**
     * @var string
     * @ORM\ManyToOne(targetEntity="Bundle\UserBundle\Entity\TzUser")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_matiere", referencedColumnName="user_id")
     * })
     * @JMS\Groups({"matiere_list"})
     * @JMS\Accessor(getter="getProfId")
     */
    private $ProfId;


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

    /**
     * @return string
     */
    public function getProfId()
    {
        return $this->ProfId;
    }

    /**
     * @param string $ProfId
     */
    public function setProfId($ProfId)
    {
        $this->ProfId = $ProfId;
    }

}
