<?php

class MST_Pdp_Block_Adminhtml_Designarea_Edit_Tab_Form extends Mage_Adminhtml_Block_Widget_Form
{
    protected function _prepareForm()
    {
        $form = new Varien_Data_Form();
        $this->setForm($form);
        $fieldset = $form->addFieldset('designarea_pdp_form', array('legend' => Mage::helper('pdp')->__('Design Area Information')));
        
        $form->setHtmlIdPrefix('pdp');
        $wysiwygConfig = Mage::getSingleton('cms/wysiwyg_config')->getConfig(
        		array('tab_id' => 'form_section')
        );
        
        $fieldset->addField('label', 'text', array(
            'label' => Mage::helper('pdp')->__('Label'),
            'class' => 'required-entry',
            'required' => true,
            'name' => 'label',
        ));
		$fieldset->addField('is_required', 'select', array(
				'label' => Mage::helper('pdp')->__('Is Required Area'),
				'name' => 'is_required',
				'values' => array(
						array(
								'value' => 2,
								'label' => Mage::helper('pdp')->__('No'),
						),
						array(
								'value' => 1,
								'label' => Mage::helper('pdp')->__('Yes'),
						),
				),
		));
		$fieldset->addField('position', 'text', array(
				'label' => Mage::helper('pdp')->__('Position'),
				'required' => false,
				'name' => 'position',
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
        } elseif (Mage::registry('designarea_data')) {
            $form->setValues(Mage::registry('designarea_data')->getData());
        }
        return parent::_prepareForm();
    }
}