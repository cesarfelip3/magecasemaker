<?php
class MST_Pdp_Block_Adminhtml_Designarea extends Mage_Adminhtml_Block_Widget_Grid_Container
{
    public function __construct()
    {
        $this->_controller = 'adminhtml_designarea';
        $this->_blockGroup = 'pdp';
		$this->_headerText = Mage::helper('pdp')->__('Manage PDP Design Areas');
        $this->_addButtonLabel = Mage::helper('pdp')->__('Add New Design Area');
		parent::__construct(); 
    }
}