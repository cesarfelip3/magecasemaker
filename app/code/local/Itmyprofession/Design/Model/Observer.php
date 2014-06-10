<?php

/**
 * Observer
 *
 * @author Santosh Moktan <itmyprofession@gmail.com>
 */
class Itmyprofession_Design_Model_Observer
{
//    public function afterCheckoutSubmit($observer)
//    {
//        //Mage::log(print_r($observer->getOrder(), true), null, 'debug.log');
//        Mage::log('teting testing', null, 'debug.log');
//        if (isset($observer['orders'])) {
//            $orders = $observer['orders'];
//            foreach ($orders as $order) {
//                //Do something with the order
//            }
//        }
//        else {
//            //Do something with the order
//        }
//        return $this;
//    }
    //    public function onCheckoutSuccess($observer)
//    {
//        print_r($observer->getOrderIds());
//        $item = $observer->getEvent()->getQuoteItem();
//        print_r($item);
//        die;
//        $product = $item->getProduct();
//        $item->setMerchant($product->getMethant());
//        $item->save();
//    }

    /**
     * 
     * @param Varien_Event_Observer $observer
     */
    public function salesConvertQuoteItemToOrderItem(Varien_Event_Observer $observer)
    {
        $quoteItem = $observer->getItem();
        if ($additionalOptions = $quoteItem->getOptionByCode('final_image')) {
            $orderItem = $observer->getOrderItem();
            $orderItem->setFinalImage(unserialize($additionalOptions->getValue()));
            // move file from temporary after being bought
            $this->_moveFinalImageToDestination(unserialize($additionalOptions->getValue()));
        }
    }

    /**
     * Move image from temporary location
     * 
     * @param type $imageFile
     */
    protected function _moveFinalImageToDestination($imageFile)
    {
        $from = Mage::getBaseDir('media') . DS . "pdp" . DS . "design" . DS . "tmp" . DS;
        if (!is_dir($from)) {
            mkdir($from, 0777, true);
        }
        $to = Mage::getBaseDir('media') . DS . "pdp" . DS . "design" . DS . "checkout" . DS;
        if (!is_dir($to)) {
            mkdir($to, 0777, true);
        }
        @copy($from . $imageFile, $to . $imageFile);
    }

    /**
     * Save final image to sale_flat_quote_item_option table
     * 
     * @param type $observer
     * @return \Itmyprofession_Design_Model_Observer
     */
    public function onSalesQuoteAddItem($observer)
    {
        //Mage::log(__FILE__ . ' - ' . __FUNCTION__ . ' - ' . __LINE__, null, 'itmyprofession_design.log');
        if ($finalImage = Mage::helper('pdp/image')->getSessionImage()) {
            $item = $observer->getEvent()->getQuoteItem();
            $item->addOption(array(
                "product_id" => $item->getProduct()->getId(),
                "item_id" => $item->getId(),
                "code" => "final_image",
                "value" => serialize($finalImage)
            ));
            //$item->save();
        }
    }

}
