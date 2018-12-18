<?php
/**
 * Created by Visual Studio Code.
 * User: Tux
 * Date: 15/12/2018
 * Time: 18:00
 */

namespace Bundle\AdminBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;
use Bundle\AdminBundle\Entity\TzAnneeScolaireEntity;


/**
 * TzEtablissement
 * 
 * @ORM\Table(name="tz_notes")
 * @ORM\Entity(repositoryClass="Bundle\AdminBundle\Repository\TzNotesRepository")
 */


class TzNotesEntity
{
    /**
     * @var integer
     *
     * @ORM\Id
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var integer
     * @ORM\ManyToOne(targetEntity="TzInscriptionEntity")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_ins", referencedColumnName="num_inscription")
     * })
     * @JMS\Accessor(getter="getIdins")
     */
    private $id_ins;

    /**
     * @var integer
     * @ORM\ManyToOne(targetEntity="TzMatiereEntity")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_mat", referencedColumnName="id", onDelete="CASCADE")
     * })
     * @JMS\Groups({"notes"})
     * @JMS\Accessor(getter="getIdmat")
     */
    private $id_mat;

    /**
     * @var integer
     * @ORM\Column(name="notes", type="integer", nullable=false)
     * @JMS\Groups({"notes"})
     */
    private $note;


    /**
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return integer
     */
    public function getIdins()
    {
        return $this->id_ins;
    }

    /**
     * @param integer $id_ins
     */
    public function setIdins($id_ins)
    {
        $this->id_ins = $id_ins;
    }

    
    /**
     * @return integer
     */
    public function getIdmat()
    {
        return $this->id_mat;
    }

    /**
     * @param integer $id_mat
     */
    public function setIdmat($id_mat)
    {
        $this->id_mat = $id_mat;
    }

    /**
     * @return integer
     */
    public function getNote()
    {
        return $this->note;
    }

    /**
     * @param integer $note
     */
    public function setNote($note)
    {
        $this->note = $note;
    }
}