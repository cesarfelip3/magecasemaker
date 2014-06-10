<?php

class MST_Pdp_Block_Pdp extends Mage_Core_Block_Template

{

	public $_default_page_size = 20;

	public function pagingCollection($current_page, $category, $page_size) {

		$collection = Mage::getModel('pdp/pdp')->getImageCollectionByCategory($category);

		$collection_counter = Mage::getModel('pdp/pdp')->getImageCollectionByCategory($category);

		$size = ceil(count($collection_counter) / $page_size);

		if ($current_page <= $size) {

			$collection->setCurPage($current_page);

			$collection->setPageSize($page_size);

			return $collection;

		}

	}

}