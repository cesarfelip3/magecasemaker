<?php
class MST_Pdp_Model_Observer
{
	public function updateItemPrice($observer) 
	{
		return false;
		$productId = $observer->getQuoteItem()->getData('product_id');
		$designProductId = Mage::getStoreConfig('pdp/setting/productid');
		
		if ($productId != $designProductId) {
			return;
		}
		
		$customPrice = 0;
		$buyInfo = $observer->getQuoteItem()->getBuyRequest();
		//echo "<pre>";
		$itemOptions = $buyInfo->getData('options');
		//print_r($itemOptions);
		foreach ($itemOptions as $option) {
			$temp = explode('ϣ', $option);
			$designInfo = explode(';', $temp[0]);
			if ($designInfo[6] != "") {
				$customPrice = $designInfo[6];
				break;
			}
		}
		$event = $observer->getEvent();
		$quote_item = $event->getQuoteItem();
		$quote_item->setOriginalCustomPrice($customPrice);
		//$quote_item->save();
	}
}