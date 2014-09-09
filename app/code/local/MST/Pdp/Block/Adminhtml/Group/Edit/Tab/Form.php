<?php

class MST_Pdp_Block_Adminhtml_Group_Edit_Tab_Form extends Mage_Adminhtml_Block_Widget_Form
{
    protected function _prepareForm()
    {
        $form = new Varien_Data_Form();
        $this->setForm($form);
        $fieldset = $form->addFieldset('group_pdp_form', array('legend' => Mage::helper('pdp')->__('Group Information')));
        
        $form->setHtmlIdPrefix('pdp');
        $wysiwygConfig = Mage::getSingleton('cms/wysiwyg_config')->getConfig(
        		array('tab_id' => 'form_section')
        );
        
        $fieldset->addField('title', 'text', array(
            'label' => Mage::helper('pdp')->__('Title'),
            'class' => 'required-entry',
            'required' => true,
            'name' => 'title',
        ));
		$fieldset->addField('sort', 'text', array(
            'label' => Mage::helper('pdp')->__('Position'),
            'required' => false,
            'name' => 'sort',
        ));
		/*
		$fieldset->addField('description', 'editor', array(
			'name'      => 'description',
			'label'     => Mage::helper('pdp')->__('Description'),
			'title'     => Mage::helper('pdp')->__('Description'),
			'style'     => 'height:15em',
			'config'    => Mage::getSingleton('cms/wysiwyg_config')->getConfig(),
			'wysiwyg'   => true,
			'required'  => false,
		));
		*/
		
		
		$wysiwygConfig["files_browser_window_url"] = Mage::getSingleton('adminhtml/url')->getUrl('adminhtml/cms_wysiwyg_images/index');
		$wysiwygConfig["directives_url"] = Mage::getSingleton('adminhtml/url')->getUrl('adminhtml/cms_wysiwyg/directive');
		$wysiwygConfig["directives_url_quoted"] = Mage::getSingleton('adminhtml/url')->getUrl('adminhtml/cms_wysiwyg/directive');
		$wysiwygConfig["widget_window_url"] = Mage::getSingleton('adminhtml/url')->getUrl('adminhtml/widget/index');
		$wysiwygConfig["files_browser_window_width"] = (int) Mage::getConfig()->getNode('adminhtml/cms/browser/window_width');
		$wysiwygConfig["files_browser_window_height"] = (int) Mage::getConfig()->getNode('adminhtml/cms/browser/window_height');
		$plugins = $wysiwygConfig->getData("plugins");
		$plugins[0]["options"]["url"] = Mage::getSingleton('adminhtml/url')->getUrl('adminhtml/system_variable/wysiwygPlugin');
		$plugins[0]["options"]["onclick"]["subject"] = "MagentovariablePlugin.loadChooser('".Mage::getSingleton('adminhtml/url')->getUrl('adminhtml/system_variable/wysiwygPlugin')."', '{{html_id}}');";
		$plugins = $wysiwygConfig->setData("plugins", $plugins);
		$fieldset->addField('description', 'editor', array(
			'name' => 'description',
			'label' => Mage::helper('pdp')->__('Description'),
			'title' => Mage::helper('pdp')->__('Description'),
			'style' => 'width:700px; height:300px;',
			'wysiwyg' => true,
			'required' => false,
			'state' => 'html',
			'config' => $wysiwygConfig,
		));
		
        $fieldset->addField('status', 'select', array(
            'label' => Mage::helper('pdp')->__('Status'),
            'name' => 'status',
            'values' => array(
                array(
                    'value' => 1,
                    'label' => Mage::helper('pdp')->__('Enabled'),
                ),
                array(
                    'value' => 2,
                    'label' => Mage::helper('pdp')->__('Disabled'),
                ),
            ),
        ));
        if (Mage::getSingleton('adminhtml/session')->getGroupData()) {
            $form->setValues(Mage::getSingleton('adminhtml/session')->getGroupData());
            Mage::getSingleton('adminhtml/session')->setGroupData(null);
        } elseif (Mage::registry('group_data')) {
            $form->setValues(Mage::registry('group_data')->getData());
        }
        return parent::_prepareForm();
    }
}