<?php
/**
 * Created by PhpStorm.
 * User: tahiana
 */

namespace Bundle\CommunBundle\Service;

use FOS\RestBundle\Request\ParamFetcher;
use Symfony\Component\DependencyInjection\Container;

/**
 * Class PreFormatMsg
 * @package Bundle\CommunBundle\Service
 */
class PreFormatMsg
{
    const DATE_PATERN       = "^\\d{2}/\\d{2}/\\d{4}^";
    const LENGHT_PARAM_PACK = 2;

    protected $container;

    /**
     * PreFormatMsg constructor.
     *
     * @param Container $container
     */
    function __construct(Container $container)
    {
        $this->container = $container;
    }

    /**
     * @param  integer  $code
     * @param    string $message
     * @param string    $httpMessage
     * @param array     $data
     *
     * @return array
     */
    public function getMsg($code, $message, $httpMessage = "", $data = array())
    {
        $response = array(
            'code'    => $code,
            'message' => $message);
        if ($httpMessage != "") {
            $resp = array('http_message' => $httpMessage);
            $response = array_merge($response, $resp);
        }
//        if (count($data) > 0) {
        $resp = array('data' => $data);
        $response = array_merge($response, $resp);

//        }
        return $response;
    }

    /**
     * verification instance objet
     *
     * @param object $objet
     * @param object $instance
     * @param string $type
     *
     * @return mixed
     * @throws \Exception
     */
    public function checkParam($objet, $instance, $type)
    {
        if (!$objet instanceof $instance) {
            $message = $type . " not Found";
            throw new \Exception($message);
        }

        return $objet;
    }

    /**
     * Verification parametre Datepublication vente
     *
     * @param string $date
     *
     * @return bool
     */
    public static function checkValidateDate($date)
    {
        try {
            return new \DateTime($date);
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * @param mixed  $param
     * @param string $reference
     *
     * @return mixed
     * @throws \Exception
     */
    public function checkNotNullParam($param, $reference)
    {
        if (empty($param) || is_null($param)) {
            $msg = sprintf(" %s should not be blank or null", $reference);
            throw new \Exception($msg);
        }

        return $param;
    }

}