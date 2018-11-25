<?php

namespace Bundle\UserBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;
/**
 * Created by PhpStorm.
 * User: Tahiana_Rakotonirina
 * Date: 11/11/2018
 * Time: 14:42
 */

/**
 * @ORM\Entity
 * @ORM\Table(name="tz_user")
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
     *
     * @ORM\Column(name="lastname", type="string", length=80, nullable=true)
     */
    private $lastname;

    /**
     * @var string
     *
     * @ORM\Column(name="firstname", type="string", length=80, nullable=true)
     */
    private $firstname;

    /**
     * @var string
     *
     * @ORM\Column(name="matricule", type="string", length=25, nullable=true, unique=true)
     */
    private $matricule;


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

}