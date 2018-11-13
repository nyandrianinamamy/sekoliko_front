<?php
namespace Bundle\AdminBundle\Service;
/**
 * Created by PhpStorm.
 * User: Predator
 * Date: 13/11/2018
 * Time: 11:31
 */
use Bundle\CommunBundle\Utils\ConstantSrv;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use Bundle\CommunBundle\Service\PreFormatMsg;

/**
 * Class POSRestResponse
 * @package Bundle\AdminBundle\Service
 */
class FosRestResponse
{
    private $_preformatMsg;

    /**
     * TzRestResponse constructor.
     * @param PreFormatMsg $preFormatMsg
     */
    public function __construct(PreFormatMsg $preFormatMsg)
    {
        $this->_preformatMsg = $preFormatMsg;
    }

    /**
     * @param mixed $data
     * @param string $format
     * @param array $listContexts
     * @return array
     */
    public function successSerialize($data, $format, $listContexts)
    {

        $context    = SerializationContext::create()->setGroups($listContexts);
        $serializer = SerializerBuilder::create()->build();

        $decodedData    = json_decode($serializer->serialize($data, $format, $context), true);
        $posServiceMsg  = $this->_preformatMsg;
        $res            = $posServiceMsg->getMsg(ConstantSrv::CODE_SUCCESS, "Success request", "Success request", $decodedData);

        return $res;
    }
}