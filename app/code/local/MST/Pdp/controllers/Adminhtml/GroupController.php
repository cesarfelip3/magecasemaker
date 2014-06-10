<?php

class MST_Pdp_Adminhtml_GroupController extends Mage_Adminhtml_Controller_action
{

    protected function _initAction()
    {
        $this->loadLayout()
            ->_setActiveMenu('pdp/pdp')
            ->_addBreadcrumb(Mage::helper('adminhtml')->__('Manage PDP Group'), Mage::helper('adminhtml')->__('Manage PDP Group'));

        return $this;
    }
    public function indexAction()
    {
        $this->_initAction();
        $this->_addContent($this->getLayout()->createBlock('pdp/adminhtml_group'));
        $this->renderLayout();
    }
	public function addAction()
	{
		$this->loadLayout()->_setActiveMenu('pdp/pdp');
        $this->renderLayout();
	}
	public function editAction()
    {
        $id = $this->getRequest()->getParam('id');
        $model = Mage::getModel('pdp/pdpgroup')->load($id);
        if ($model->getId() || $id == 0) {
            $data = Mage::getSingleton('adminhtml/session')->getFormData(true);
            if (!empty($data)) {
                $model->setData($data);
				
            }
            Mage::register('group_data', $model);

            $this->loadLayout();
            $this->_setActiveMenu('pdp/pdp');
            $this->_addBreadcrumb(Mage::helper('adminhtml')->__('Manage PDP Group'), Mage::helper('adminhtml')->__('Manage PDP Group'));
            $this->getLayout()->getBlock('head')->setCanLoadExtJs(true);
            $this->_addContent($this->getLayout()->createBlock('pdp/adminhtml_group_edit'))
                ->_addLeft($this->getLayout()->createBlock('pdp/adminhtml_group_edit_tabs'));

            $this->renderLayout();
        } else {
            Mage::getSingleton('adminhtml/session')->addError(Mage::helper('pdp')->__('Group does not exist'));
            $this->_redirect('*/*/');
        }
    }
    public function newAction()
    {
        $this->_forward('edit');
    }
	
	
	public function saveAction() {
        $data = $this->getRequest()->getPost();
		
		if (isset($data['links'])) {
			$pdps = Mage::helper('adminhtml/js')->decodeGridSerializedInput($data['links']['pdp']);
		}
		/* echo "<pre>";
		print_r($data);
		print_r($pdps);
		var_dump($this->getRequest()->getParam('id'));
		die; */
		if ($data) {
            $model = Mage::getModel('pdp/pdpgroup');
            $model->setData($data)->setId($this->getRequest()->getParam('id'));
            try {
				// edit by david			
				$main_domain = Mage::helper('pdp')->get_domain( $_SERVER['SERVER_NAME'] );		
				if ( $main_domain != 'dev' ) { 
					$rakes = Mage::getModel('pdp/act')->getCollection();
					$rakes->addFieldToFilter('path', 'pdp/act/key' );
					$valid = false;
					if ( count($rakes) > 0 ) {
						foreach ( $rakes as $rake )  {
							if ( $rake->getExtensionCode() == md5($main_domain.trim(Mage::getStoreConfig('pdp/act/key')) ) ) {
								$valid = true;	
							}
						}
					}
					if ( $valid == false )  {  
						Mage::getSingleton('adminhtml/session')->addError( base64_decode('UGxlYXNlIGVudGVyIGxpY2Vuc2Uga2V5ICE=') );
						Mage::getSingleton('adminhtml/session')->setFormData($data);
						$this->_redirect('pdp/adminhtml_group/index');
						return;
					}
				}
				// end edit by david
                $model->save();
				//Update artworks info-------------------
				//Reset group of all pdp, and then assign again.
				if (is_array($pdps)) {
					$groupId = $model->getId();
					$pdpModel = Mage::getModel('pdp/design');
					$pdpCollection = $pdpModel->getCollection();
					$pdpCollection->addFieldToFilter('pdpgroup', $groupId);
					foreach ($pdpCollection as $item) {
						$oldInfo = $pdpModel->load($item->getId());
						$oldInfo->setPdpgroup(0);
						$oldInfo->setPosition(0);
						$oldInfo->save();
					}
					foreach ($pdps as $pdpId => $position) {
						$newModel = $pdpModel->load($pdpId);
						$newModel->setPdpgroup($groupId);
						$newModel->setPosition($position['position']);
						$newModel->save();
					}
				}
				//Update artworks info-------------------
				
                Mage::getSingleton('adminhtml/session')->addSuccess(Mage::helper('pdp')->__('Group was successfully saved'));
                Mage::getSingleton('adminhtml/session')->setFormData(false);

                if ($this->getRequest()->getParam('back')) {
                    $this->_redirect('*/*/edit', array('id' => $model->getId()));
                    return;
                }
                $this->_redirect('*/*/');
                return;
            } catch (Exception $e) {
                Mage::getSingleton('adminhtml/session')->addError( "Errorrrrr " . $e->getMessage());
                Mage::getSingleton('adminhtml/session')->setFormData($data);
                $this->_redirect('*/*/edit', array('id' => $this->getRequest()->getParam('id')));
                return;
            }
        }
        Mage::getSingleton('adminhtml/session')->addError(Mage::helper('pdp')->__('Unable to find item to save'));
        $this->_redirect('*/*/');
    }
	
    public function deleteAction() {
        if ($this->getRequest()->getParam('id') > 0) {
            try {
                $model = Mage::getModel('pdp/pdpgroup')->load($this->getRequest()->getParam('id'));
                $model->delete();

                Mage::getSingleton('adminhtml/session')->addSuccess(Mage::helper('adminhtml')->__('Group was successfully deleted'));
                $this->_redirect('*/*/');
            } catch (Exception $e) {
                Mage::getSingleton('adminhtml/session')->addError($e->getMessage());
                $this->_redirect('*/*/edit', array('id' => $this->getRequest()->getParam('id')));
            }
        }
        $this->_redirect('*/*/');
    }
	public function massDeleteAction() {
        $itemIds = $this->getRequest()->getParam('group');
        if (!is_array($itemIds)) {
            Mage::getSingleton('adminhtml/session')->addError(Mage::helper('adminhtml')->__('Please select item(s)'));
        } else {
            try {
                foreach ($itemIds as $itemId) {
                    $model = Mage::getModel('pdp/pdpgroup')->load($itemId);
                    $model->delete();
                }
                Mage::getSingleton('adminhtml/session')->addSuccess(
                        Mage::helper('adminhtml')->__(
                                'Total of %d record(s) were successfully deleted', count($itemIds)
                        )
                );
            } catch (Exception $e) {
                Mage::getSingleton('adminhtml/session')->addError($e->getMessage());
            }
        }
        $this->_redirect('*/*/index');
    }
	
	public function pdpAction(){
		$this->loadLayout();
		$this->getLayout()->getBlock('pdp_grid')
		->setPdp($this->getRequest()->getPost('pdp', null));
		$this->renderLayout();
	}
	public function pdpgridAction(){
		$this->loadLayout();
		$this->getLayout()->getBlock('pdp_grid')
		->setPdp($this->getRequest()->getPost('pdp', null));
		$this->renderLayout();
	}
}