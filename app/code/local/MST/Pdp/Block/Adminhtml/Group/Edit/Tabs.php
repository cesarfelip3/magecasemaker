<?php

class MST_Pdp_Block_Adminhtml_Group_Edit_Tabs extends Mage_Adminhtml_Block_Widget_Tabs
{
    public function __construct()
    {
        parent::__construct();
        $this->setId('group_tabs');
        $this->setDestElementId('edit_form');
        $this->setTitle(Mage::helper('pdp')->__('Group Information'));
    }
    protected function _beforeToHtml()
    {
        $this->addTab('form_section', array(
            'label' => Mage::helper('pdp')->__('General'),
            'title' => Mage::helper('pdp')->__('General'),
            'content' => $this->getLayout()->createBlock('pdp/adminhtml_group_edit_tab_form')->toHtml(),
        ));
		
		$this->addTab('form_section_group', array(
            'label' => Mage::helper('pdp')->__('PDP Items'),
            'title' => Mage::helper('pdp')->__('PDP Items'),
            'url'       => $this->getUrl('*/*/pdp', array('_current' => true)),
			'class'     => 'ajax',
        ));
        return parent::_beforeToHtml();
    }
}