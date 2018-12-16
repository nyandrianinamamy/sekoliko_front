<?php
/**
 * Created by PhpStorm.
 * User: Predator
 * Date: 13/12/2018
 * Time: 21:20
 */

namespace Bundle\AdminBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;
/**
 * TzEtablissement
 *
 * @ORM\Table(name="tz_role_type")
 * @ORM\Entity(repositoryClass="Bundle\AdminBundle\Repository\TzRoleTypeRepository")
 */
class TzRoleTypeEntity
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * @JMS\Groups({"user_list", "liste_etudiant", "role_list"})
     * @JMS\SerializedName("id")
     */
    private $id;

    /**
     * @var string
     * @JMS\Groups({"user_list", "liste_etudiant", "role_list"})
     * @ORM\Column(name="description", type="string", length=80, nullable=false)
     *
     */
    private $description;

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



}