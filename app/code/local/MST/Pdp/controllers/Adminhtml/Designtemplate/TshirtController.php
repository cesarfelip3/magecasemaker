<?php
class MST_Pdp_Adminhtml_Designtemplate_TshirtController extends Mage_Adminhtml_Controller_Action
{
	public function indexAction()
	{
		$id = $this->getRequest()->getParam('id');
        $this->prepareDesignData($id);
		$this->loadLayout()->_setActiveMenu('pdp/pdp');
        $this->renderLayout();
	}
	public function colorAction()
	{
		$design_id = $this->getRequest()->getParam('design_id');
        $this->prepareDesignData($design_id);
		$this->loadLayout()->_setActiveMenu('pdp/pdp');
        $this->renderLayout();
	}
	public function prepareDesignData($id)
	{
		$model = Mage::getModel('pdp/design')->load($id);
		if ($model->getId()) {
			$front = $model->getFilename();
			$back = $model->getFilenameBack();
			$frontInfo = Mage::getModel('pdp/pdp')->getInlayInfoByFilename($front)->getData();
			$backInfo = Mage::getModel('pdp/pdp')->getInlayInfoByFilename($back)->getData();
			$model->setFrontInfo($frontInfo);
			$model->setBackInfo($backInfo);
			Mage::register('design', $model);
		}
	}
}