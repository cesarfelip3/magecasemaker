<?php
class MST_Pdp_Model_Admintemplate extends Mage_Core_Model_Abstract {
	public function _construct() {
		parent::_construct ();
		$this->_init ( 'pdp/admintemplate' );
	}
	public function saveAdminTemplate($data) {
		$model = Mage::getModel('pdp/admintemplate');
		$collection = $this->getCollection();
		$collection->addFieldToFilter('product_id', $data['product_id']);
		if (count($collection) > 0) {
			$tempId = $collection->getFirstItem()->getId();
			$model->setData($data)->setId($tempId)->save();
		} else {
			$model->setData($data);
			$model->save();
		}
		/* if ($data['id'] != "") {
			$data['update_time'] = now();
			$model->setData($data)->setId($data['id']);
			$model->save();
		} else {
			$data['created_time'] = now();
			$data['update_time'] = now();
			$model->setData($data)->setId(NULL);
			$model->save();
		 }*/
	}
}