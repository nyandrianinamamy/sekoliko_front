<?php

namespace Bundle\UserBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;
use JMS\Serializer\Annotation as JMS;
use Bundle\AdminBundle\Entity\TzRoleTypeEntity;
/**
 * Created by PhpStorm.
 * User: Tahiana_Rakotonirina
 * Date: 11/11/2018
 * Time: 14:42
 */

/**
 * @ORM\Entity
 * @ORM\Table(name="tz_user")
 * @ORM\Entity(repositoryClass="Bundle\UserBundle\Repository\PosUserRepository")
 */
class TzUser extends BaseUser
{
    /**
     * @var integer
     *
     * @ORM\Column(name="user_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected $userId;

    /**
     * @var string
     * @JMS\Groups({"user_list"})
     * @ORM\Column(name="lastname", type="string", length=80, nullable=true)
     */
    private $lastname;

    /**
     * @var string
     * @JMS\Groups({"user_list"})
     * @ORM\Column(name="firstname", type="string", length=80, nullable=true)
     */
    private $firstname;

    /**
     * @var string
     * @JMS\Groups({"user_list"})
     * @ORM\Column(name="adresse", type="string", length=80, nullable=true)
     */
    private $adresse;

    /**
     * @var string
     * @JMS\Groups({"user_list"})
     * @ORM\Column(name="contact", type="string", length=80, nullable=true)
     */
    private $contact;

    /**
     * @var string
     * @JMS\Groups({"user_list"})
     * @ORM\Column(name="age", type="integer", length=3, nullable=true)
     */
    private $age;

    /**
     * @var string
     * @JMS\Groups({"user_list"})
     * @ORM\Column(name="matricule", type="string", length=25, nullable=true, unique=true)
     */
    private $matricule;


    /**
     * @var string
     * @JMS\Groups({"user_list"})
     * @ORM\Column(name="sexe", type="string", length=25, nullable=true)
     */
    private $sexe;

    /**
     * @var string
     * @ORM\ManyToOne(targetEntity="Bundle\AdminBundle\Entity\TzRoleTypeEntity")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="role_type", referencedColumnName="id")
     * })
     * @JMS\Groups({"user_list"})
     * @JMS\Accessor(getter="getRoleType")
     */
    private $roleType;

    public function __construct()
    {
        parent::__construct();
        // your own logic
    }

    /**
     * @return int
     */
    public function getUserId()
    {
        return $this->userId;
    }


    /**
     * @return string
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * @param string $lastname
     */
    public function setLastname($lastname)
    {
        $this->lastname = $lastname;
    }

    /**
     * @return string
     */
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * @param string $firstname
     */
    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;
    }

    /**
     * @return string
     */
    public function getMatricule()
    {
        return $this->matricule;
    }

    /**
     * @param string $matricule
     */
    public function setMatricule($matricule)
    {
        $this->matricule = $matricule;
    }

    /**
     * @return string
     */
    public function getRoleType()
    {
        return $this->roleType;
    }

    /**
     * @param string $roleType
     */
    public function setRoleType($roleType)
    {
        $this->roleType = $roleType;
    }

    /**
     * @return string
     */
    public function getAdresse()
    {
        return $this->adresse;
    }

    /**
     * @param string $adresse
     */
    public function setAdresse($adresse)
    {
        $this->adresse = $adresse;
    }

    /**
     * @return string
     */
    public function getContact()
    {
        return $this->contact;
    }

    /**
     * @param string $contact
     */
    public function setContact($contact)
    {
        $this->contact = $contact;
    }

    /**
     * @return string
     */
    public function getAge()
    {
        return $this->age;
    }

    /**
     * @param string $age
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
}