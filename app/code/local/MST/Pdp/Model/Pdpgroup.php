<?php
class MST_Pdp_Model_Pdpgroup extends Mage_Core_Model_Abstract {
	public function _construct() {
		parent::_construct ();
		$this->_init ( 'pdp/pdpgroup' );
	}
	public function getPdpGroup()
	{
		$collection = $this->getCollection();
		$collection->addFieldToFilter('status', 1);
		$collection->setOrder('sort', 'ASC');
		return $collection;
	}
	public function enableGroup ($id)
	{
		$model = Mage::getModel('pdp/pdpgroup')->load($id);
		$model->setStatus(1);
		$model->save();
	}
	public function disableGroup ($id)
	{
		$model = Mage::getModel('pdp/pdpgroup')->load($id);
		$model->setStatus(2);
		$model->save();
	}
	public function deleteGroup ($id)
	{
		$designModel = Mage::getModel('pdp/design');
		//Reset all item belong to this group before update
		$designCollection = $designModel->getCollection();
		$designCollection->addFieldToFilter('pdpgroup', $id);
		foreach ($designCollection as $design) {
			$designModel->load($design->getId())->setPdpgroup(0)->save();
		}
		$model = Mage::getModel('pdp/pdpgroup')->load($id)->delete();
	}
}