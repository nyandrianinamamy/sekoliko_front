<?php
/**
 * Created by PhpStorm.
 * User: Tahiana_Rakotonirina
 * Date: 11/11/2018
 * Time: 17:14
 */

namespace Bundle\AdminBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

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
     * @JMS\Groups({"Etudiant"})
     *
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="etd_nom", type="string", length=100, nullable=false)
     * @JMS\Groups({"Etudiant"})
     */
    private $non;

    /**
     * @var integer
     *
     * @ORM\Column(name="etd_age", type="integer", nullable=false)
     * @JMS\Groups({"Etudiant"})
     */
    private $age;

    /**
     * @var string
     *
     * @ORM\Column(name="etd_sexe", type="string", length=1, nullable=false)
     * @JMS\Groups({"Etudiant"})
     */
    private $sexe;

    /**
     * @var string
     *
     * @ORM\Column(name="etd_adresse", type="string", length=100, nullable=true)
     * @JMS\Groups({"Etudiant"})
     */
    private $adr;

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
     * @return integer
     */
    public function getAge()
    {
        return $this->age;
    }

    /**
     * @param integer $age
     */
    public function setAge($age)
    {
        $this->age = $age;
    }


    /**
     * @return string
     */
    public function getSexe()
    {
        return $this->sexe;
    }

    /**
     * @param string $sexe
     */
    public function setSexe($sexe)
    {
        $this->sexe = $sexe;
    }

    /**
     * @return string
     */
    public function getAdresse()
    {
        return $this->adr;
    }

    /**
     * @param string $adr
     */
    public function setAdresse($adr)
    {
        $this->adr = $adr;
    }
}
