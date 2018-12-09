<?php

namespace Bundle\AdminBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
/**
 * Created by PhpStorm.
 * User: Tahiana_Rakotonirina
 * Date: 11/11/2018
 * Time: 17:04
 */

/**
 * TzEtablissement
 *
 * @ORM\Table(name="tz_etablissement")
 * @ORM\Entity(repositoryClass="Bundle\AdminBundle\Repository\TzEtablissementRepository")
 */
class TzEtablissement
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
     * @ORM\Column(name="ets_nom", type="string", length=80, nullable=true)
     */
    private $etsNom;


    /**
     * @var string
     *
     * @ORM\Column(name="ets_adresse", type="string", length=80, nullable=true)
     */
    private $etsAdresse;

    /**
     * @var string
     *
     * @ORM\Column(name="ets_contact", type="string", length=80, nullable=true)
     */
    private $etsContact;

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
    public function getEtsNom()
    {
        return $this->etsNom;
    }

    /**
     * @param string $etsNom
     */
    public function setEtsNom($etsNom)
    {
        $this->etsNom = $etsNom;
    }

    /**
     * @return string
     */
    public function getEtsAdresse()
    {
        return $this->etsAdresse;
    }

    /**
     * @param string $etsAdresse
     */
    public function setEtsAdresse($etsAdresse)
    {
        $this->etsAdresse = $etsAdresse;
    }

    /**
     * @return string
     */
    public function getEtsContact()
    {
        return $this->etsContact;
    }

    /**
     * @param string $etsContact
     */
    public function setEtsContact($etsContact)
    {
        $this->etsContact = $etsContact;
    }


}
