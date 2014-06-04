<?php
class MST_Pdp_Block_Adminhtml_Designtemplate_Tshirt extends Mage_Adminhtml_Block_Widget_Grid_Container
{

    public function __construct()
    {
        $this->_controller = 'adminhtml_designtemplate_tshirt';
        $this->_blockGroup = 'pdp';
        $_helper = Mage::helper('pdp');
        $this->_headerText = Mage::helper('pdp')->__('');
        $this->_addButtonLabel = Mage::helper('pdp')->__('Add Design');
        $this->_addButton('mst_reset', array( 'label' => Mage::helper('adminhtml')->__('Add New Design'), 'class' => 'reset scalable', 'id'=>'reset_menu', 'onclick'=>"location.reload()" ));
        $this->_addButton('save', array( 'label' => Mage::helper('adminhtml')->__('Save Item'), 'class' => 'save scalable', 'id'=>'save_menu', 'onclick'=>"editForm.submit();" ));
        parent::__construct(); 
    }
}