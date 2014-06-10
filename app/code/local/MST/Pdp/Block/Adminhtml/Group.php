<?php
class MST_Pdp_Block_Adminhtml_Group extends Mage_Adminhtml_Block_Widget_Grid_Container
{
    public function __construct()
    {
        $this->_controller = 'adminhtml_group';
        $this->_blockGroup = 'pdp';
		$this->_headerText = Mage::helper('pdp')->__('Manage PDP Groups');
        $this->_addButtonLabel = Mage::helper('pdp')->__('Add New Group');
		parent::__construct(); 
    }
}