<?php
class MST_Pdp_Model_Designarea extends Mage_Core_Model_Abstract {
	public function _construct() {
		parent::_construct ();
		$this->_init ( 'pdp/designarea' );
	}
	public function getDesignAreas($productId) {
		$collection = $this->getCollection();
		$collection->addFieldToFilter('product_id', $productId);
		$collection->setOrder('position', 'ASC');
		$collection->setOrder('label', 'ASC');
		$collection->addFieldToFilter('status', 1);
		return $collection;
	}
}