<?php
class MST_Pdp_Model_Pdpoption extends Mage_Core_Model_Abstract {
	public function _construct() {
		parent::_construct ();
		$this->_init ( 'pdp/pdpoption' );
	}
	public function removeOptions ($designId) {
		if ($designId != "") {
			$optionModel = Mage::getModel('pdp/pdpoption');
			$collection = $this->getCollection();
			$collection->addFieldToFilter('design_id', $designId);
			foreach ($collection as $option) {
				$optionId = $option->getId();
				$optionModel->load($optionId)->delete();
			}
		}
	}
	
	public function getPdpOptions ($designId) {
		if ($designId != "") {
			$optionModel = Mage::getModel('pdp/pdpoption');
			$collection = $this->getCollection();
			$collection->addFieldToFilter('design_id', $designId);
			return $collection;
		}
	}
}