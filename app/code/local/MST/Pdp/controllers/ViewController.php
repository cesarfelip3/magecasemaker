<?php

class MST_Pdp_ViewController extends Mage_Core_Controller_Front_Action
{

    public static $jsonDir;

    /**
     * Temporary custom image folder
     * 
     * @var type 
     */
    public static $_tmpDir;

    public function _construct()
    {
        self::$jsonDir = Mage::getBaseDir('media') . DS . "pdp" . DS . "json" . DS;
        self::$_tmpDir = Mage::getBaseDir('media') . DS . "pdp" . DS . "design" . DS . "tmp" . DS;
    }

    public function indexAction()
    {
        $this->loadLayout();
        $defaultTitle = Mage::getStoreConfig('pdp/setting/headertitle');
        $this->getLayout()->getBlock('head')->setTitle($defaultTitle);
        $this->renderLayout();
    }

    public function designAction()
    {
        $this->loadLayout();
        $this->getResponse()->setBody($this->getLayout()->getBlock('pdp_head')->toHtml());
        $this->renderLayout();
    }

    public function finalDesignAction()
    {
        $this->loadLayout();
        $this->renderLayout();
    }

    public function saveSampleDesignAction()
    {
        $jsonString = $this->getRequest()->getPost();
        $response = array();
        try {
            $folderPath = self::$jsonDir;
            $filename = "json_string_" . time() . ".txt";
            $result = file_put_contents($folderPath . $filename, $jsonString);
            if (!$result) {
                $response['error'] = true;
                $response['message'] = "Can't create file";
            }
            else {
                $response['success'] = true;
                $response['message'] = Mage::helper('pdp')->__('Item was successfully saved.');
            }
        }
        catch (Exception $e) {
            $response['error'] = true;
            $response['message'] = "Something went wrong!";
        }
        $this->getResponse()->setBody(json_encode($response));
    }

    public function viewSampleAction()
    {
        $fileName = self::$jsonDir . "json_string_1396944015.txt";
        try {
            $data = file_get_contents($fileName);
            print_r($data);
        }
        catch (Exception $e) {
            Zend_Debug::dump($e);
        }
    }

    public function getDesignPageAction()
    {
        $data = $this->getRequest()->getPost();
        Mage::register('pdp_data', $data);
        $this->loadLayout();
        $defaultTitle = Mage::getStoreConfig('pdp/setting/headertitle');
        $this->getLayout()->getBlock('head')->setTitle($defaultTitle);
        $this->renderLayout();
    }

    /**
     * Save custom image
     */
    public function saveCustomImageAction()
    {
        $response = array();
        try {
            $image = $this->getRequest()->getPost('img');
            $overlay = $this->getRequest()->getPost('overlay');
            $overlayBg = $this->getRequest()->getPost('overlayBg');

            $type = $this->getRequest()->getPost('type');

            if (trim($type) == "order") {

                $response['image'] = Mage::helper('pdp/image')->saveCanvasToImage2($image, $overlay, $overlayBg);
            } else {

                $response['image'] = Mage::helper('pdp/image')->saveCanvasToImage($image, $overlay, $overlayBg);
            }

            Mage::getModel('core/session')->setData('customImage', $response['image']);

            $this->_addProductToCart($this->getRequest()->getParam('productId'), $this->getRequest()->getParam('editId'));

            $response['status'] = 'success';
        }
        catch (Exception $e) {
            $response['debug'] = $e->getMessage() . ' : ' . $e->getLine() . ' : ' . $e->getFile();
            $response['status'] = 'failure';
        }
        $this->getResponse()->setBody(json_encode($response));
    }

    /**
     * Add product to cart
     * 
     * @param type $productId
     * @param type $qty
     */
    protected function _addProductToCart($productId, $editId, $qty = 1)
    {
        //Mage::log($productId . ' : ' . $qty, null, 'debugging.log');
        if ($productId) {
            $_product = Mage::getModel('catalog/product')->load($productId);
            $cart = Mage::getModel('checkout/cart');
            $cart->init();
            $cart->addProduct($_product, array('qty' => $qty));
            if ($editId != '') {
                Mage::getSingleton('checkout/session')
                        ->getQuote()
                        ->removeItem($editId)
                        ->save();
            }
            $cart->save();
            Mage::getSingleton('checkout/session')->setCartWasUpdated(true);
        }
    }

}
