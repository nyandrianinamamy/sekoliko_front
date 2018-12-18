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
use Bundle\AdminBundle\Entity\TzAnneeScolaireEntity;

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
     * @ORM\GeneratedValue(strategy="AUTO")
     * @JMS\Groups({"inscrit", "liste_etudiant","notes"})
     * @JMS\SerializedName("NumInscription")
     */
    private $num_inscription;

    /**
     * @var integer
     * @JMS\Groups({"inscrit","notes","liste_etudiant"})
     * @ORM\ManyToOne(targetEntity="Bundle\UserBundle\Entity\TzUser")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="user_id")
     * })
     */
    private $user_id;

    /**
     * @var integer
     * @JMS\Groups({"inscrit"})
     * @ORM\ManyToOne(targetEntity="TzClasseEnfantEntity")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_classe", referencedColumnName="id")
     * })
     */
    private $id_classe;

    /**
     * @var integer
     * @ORM\ManyToOne(targetEntity="TzAnneeScolaireEntity")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_annee_scolaire", referencedColumnName="id")
     * })
     * @JMS\Accessor(getter="getIdAnneeScolaire")
     * @JMS\Groups({"inscrit","notes"})
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
     * @ORM\Column(name="statut", type="boolean", nullable=true)
     * @JMS\Groups({"inscrit"})
     */
    private $statut;

    /**
     * @var string
     * @ORM\Column(name="able", type="boolean", nullable=false)
     */
    private $able;

    public function __construct()
    {
        $this->setDateInscription(new \DateTime('now'));
        $this->able = true;
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
     * @return boolean
     */
    public function getStatut(){
        return $this->statut;
    }

    /**
     * @param boolean $statut
     */
    public function setStatut($statut){
        $this->statut = $statut;
    }

    /**
     * @return boolean
     */
    public function getAble(){
        return $this->able;
    }

    /**
     * @param boolean $able
     */
    public function setAble($able){
        $this->able = $able;
    }
}