<?php
/**
 * Created by PhpStorm.
 * User: Predator
 * Date: 13/12/2018
 * Time: 20:23
 */

namespace Bundle\AdminBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
use Bundle\AdminBundle\Entity\TzClassEntity;
use JMS\Serializer\Annotation as JMS;

/**
 * TzEtablissement
 *
 * @ORM\Table(name="tz_classe_enfant")
 * @ORM\Entity(repositoryClass="Bundle\AdminBundle\Repository\TzClasseEnfantRepository")
 */
class TzClasseEnfantEntity
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * @JMS\Groups({"classe_enfant_etd","inscrit"})
     * @JMS\SerializedName("id")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="classe_enfant_desc", type="string", length=80, nullable=false)
     * @JMS\Groups({"classe_enfant_etd","inscrit"})
     *
     */
    private $description;


    /**
     * @var string
     * @ORM\ManyToOne(targetEntity="TzClassEntity")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="classe_parent", referencedColumnName="id")
     * })
     * @JMS\Groups({"classe_enfant_etd","inscrit"})
     * @JMS\Accessor(getter="getParent")
     */
    private $parent;

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
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * @param string $parent
     */
    public function setParent($parent)
    {
        $this->parent = $parent;
    }


}