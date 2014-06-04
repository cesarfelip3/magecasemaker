<?php

class MST_Pdp_PdptemplateController extends Mage_Core_Controller_Front_Action
{

    public function saveAction()
    {
        $design = $_POST['design'];
        if ($design != "") {
            $data['pdp_design'] = $design;
            $data['id'] = $_POST['id'];
            if (Mage::getSingleton('customer/session')->isLoggedIn()) {
                $customerData = Mage::getSingleton('customer/session')->getCustomer();
                $customerId = $customerData->getId();
                $data['customer_id'] = $customerId;
                Mage::getModel('pdp/pdptemplate')->savePdpTemplate($data);
            }
        }
    }

    public function savesessionAction()
    {
        $design = $_POST['design'];
        if ($design != "") {
            Mage::getSingleton("core/session")->setPdptemplateDesign($design);
        }
        else {
            echo "No design found!";
        }
    }

    public function preDispatch()
    {
        parent::preDispatch();

        if (!Mage::getSingleton('customer/session')->authenticate($this)) {
            $this->setFlag('', 'no-dispatch', true);
            // adding message in customer login page
            Mage::getSingleton('core/session')
                    ->addError(Mage::helper('pdp')->__('Please sign in or create a new account'));
        }
    }

    public function viewAction()
    {
        $this->loadLayout();
        $this->getLayout()->getBlock('head')->setTitle($this->__('My Custom PDP Designs'));
        $this->renderLayout();
    }

    public function updatePdptemplateAction()
    {
        $action = $_POST['action'];
        $id = $_POST['id'];
        if ($action != "" && $id != "") {
            $model = Mage::getModel('pdp/pdptemplate')->load($id);
            $oldStatus = $model->getStatus();
            if ($action == "status") {
                if ($oldStatus == 1) {
                    $model->setStatus(2);
                }
                else {
                    $model->setStatus(1);
                }
                $model->save();
            }
            else {
                $model->delete();
                echo "Removed";
            }
        }
    }

}
