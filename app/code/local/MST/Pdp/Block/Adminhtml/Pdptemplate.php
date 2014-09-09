<?php
class MST_Pdp_Block_Adminhtml_Pdptemplate extends Mage_Adminhtml_Block_Widget_Grid_Container
{
    public function __construct()
    {
        $this->_controller = 'adminhtml_pdptemplate';
        $this->_blockGroup = 'pdp';
        $this->_headerText = Mage::helper('pdp')->__('Manage Customer Design');
        parent::__construct();
		$this->_removeButton('add');
    }
}