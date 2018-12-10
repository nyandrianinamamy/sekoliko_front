<?php
/**
 * Created by PhpStorm.
 * User: Tux
 * Date: 14/11/2018
 * Time: 14:09
 */

namespace Bundle\AdminBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

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
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * @JMS\Groups({"inscrit"})
     * @JMS\SerializedName("NumInscription")
     */
    private $num_inscription;

    /**
     * @var integer
     * @ORM\Column(name="user_id", type="integer", nullable=false)
     * @JMS\Groups({"inscrit"})
     * @JMS\SerializedName("UserID")
     */
    private $user_id;

    /**
     * @var string
     * @ORM\Column(name="id_classe", type="integer", nullable=false)
     * @JMS\Groups({"inscrit"})
     */
    private $id_classe;

    /**
     * @var integer
     * @ORM\Column(name="id_annee_scolaire", type="integer", nullable=false)
     * @JMS\Groups({"inscrit"})
     */
    private $id_annee_scolaire;

    /**
     * @var \DateTime
     * @ORM\Column(name="date_inscription", type="datetime", nullable=false)
     * @JMS\Groups({"inscrit"})
     */
    private $date_inscription;

    /**
     * @var string
     * @ORM\Column(name="statut", type="string", length=25, nullable=true)
     * @JMS\Groups({"inscrit"})
     */
    private $statut;

    public function __construct()
    {
        $this->setDateInscription(new \DateTime('now'));
    }

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
    public function getUserId()
    {
        return $this->user_id;
    }

    /**
     * @param integer $user_id
     */
    public function setUserId($user_id)
    {
        $this->user_id = $user_id;
    }

    /**
     * @return string
     */
    public function getClasseId()
    {
        return $this->id_classe;
    }

    /**
     * @param string $id_classe
     */
    public function setClasseId($id_classe)
    {
        $this->id_classe = $id_classe;
    }

    /**
     * @return integer
     */
    public function getIdAnneeScolaire()
    {
        return $this->id_annee_scolaire;
    }

    /**
     * @param integer $date
     */
    public function setIdAnneeScolaire($date)
    {
        $this->id_annee_scolaire = $date;
    }

    /**
     * @return \DateTime
     */
    public function getDateInscription(){
        return $this->date_inscription;
    }
    /**
     * @param \DateTime $date
     */
    public function setDateInscription($date){
        $this->date_inscription = $date;

    }
    /**
     * @return string
     */
    public function getStatut(){
        return $this->statut;
    }

    /**
     * @param string $statut
     */
    public function setStatut($statut){
        $this->statut = $statut;
    }
}