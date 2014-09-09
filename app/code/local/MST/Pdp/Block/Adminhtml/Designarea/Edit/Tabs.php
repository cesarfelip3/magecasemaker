<?php

class MST_Pdp_Block_Adminhtml_Designarea_Edit_Tabs extends Mage_Adminhtml_Block_Widget_Tabs
{
    public function __construct()
    {
        parent::__construct();
        $this->setId('designarea_tabs');
        $this->setDestElementId('edit_form');
        $this->setTitle(Mage::helper('pdp')->__('Design Area Information'));
    }
    protected function _beforeToHtml()
    {
        $this->addTab('form_section', array(
            'label' => Mage::helper('pdp')->__('General'),
            'title' => Mage::helper('pdp')->__('General'),
            'content' => $this->getLayout()->createBlock('pdp/adminhtml_designarea_edit_tab_form')->toHtml(),
        ));
        return parent::_beforeToHtml();
    }
}