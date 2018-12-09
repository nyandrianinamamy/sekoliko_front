<?php
/**
 * Created by PhpStorm.
 * User: Tahiana_Rakotonirina
 * Date: 11/11/2018
 * Time: 17:09
 */

namespace Bundle\AdminBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
use Bundle\AdminBundle\Entity\TzMatiereEntity;
use JMS\Serializer\Annotation as JMS;
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
     * @JMS\Groups({"prof_gest", "prof_list"})
     * @JMS\SerializedName("id")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="prof_nom", type="string", length=80, nullable=true)
     * @JMS\Groups({"prof_list"})
     */
    private $nom;

    /**
     * @var string
     * @ORM\ManyToOne(targetEntity="TzMatiereEntity")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_matiere", referencedColumnName="id")
     * })
     * @JMS\Groups({"prof_list"})
     * @JMS\Accessor(getter="getMatiereId")
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
