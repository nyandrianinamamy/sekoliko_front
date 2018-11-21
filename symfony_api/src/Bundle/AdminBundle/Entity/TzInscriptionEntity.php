<?php
/**
 * Created by PhpStorm.
 * User: Tux
 * Date: 14/11/2018
 * Time: 14:09
 */

namespace Bundle\AdminBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * TzEtablissement
 *
 * @ORM\Table(name="tz_inscription")
 * @ORM\Entity(repositoryClass="Bundle\AdminBundle\Repository\TzInscriptionRepository")
 */


class TzInscriptionEntity
{
    /**
     * @var integer
     *
     * @ORM\Id
     * @ORM\Column(name="num_inscription", type="integer", nullable=false)
     *
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $num_inscription;

    /**
     * @var integer
     * @ORM\Column(name="id", type="integer", nullable=false)
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(name="niveau", type="string", length=12, nullable=false)
     */
    private $niveau;

    /**
     * @ORM\Column(name="annee_scolaire", type="date", nullable=false)
     */
    private $anne_scolaire;

    /**
     * @return integer
     */

    public function getNumInscription()
    {
        return $this->num_inscription;
    }

    /**
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param integer $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getNiveau()
    {
        return $this->niveau;
    }

    /**
     * @param string $niveau
     */
    public function setNiveau($niveau)
    {
        $this->niveau = $niveau;
    }

    /**
     * @return date
     */
    public function getAS()
    {
        return $this->anne_scolaire;
    }

    /**
     * @param date $date
     */
    public function setAS($date)
    {
        $this->anne_scolaire = $date;
    }
}