<?php

/**

* Magento Support Team.

* @category   MST

* @package    MST_Pdp

* @version    2.0

* @author     Magebay Developer Team <info@magebay.com>

* @copyright  Copyright (c) 2009-2013 MAGEBAY.COM. (http://www.magebay.com)

*/

class MST_Pdp_Adminhtml_PdpController extends Mage_Adminhtml_Controller_Action

{

    protected function _initAction()

    {

        $this->loadLayout()

            ->_setActiveMenu('pdp/pdp')

            ->_addBreadcrumb(Mage::helper('adminhtml')->__('Design Manager'), Mage::helper('adminhtml')->__('Design Manager'));

        return $this;

    }

    public function uploadAction()

    {

        //$this->_initAction();

		$this->loadLayout()->_setActiveMenu('pdp/pdp');

        $this->renderLayout();

    }

	

	public function imageAction()

    {

        //$this->_initAction();

		$this->loadLayout()->_setActiveMenu('pdp/pdp');

        $this->renderLayout();

    }

	public function fontAction()

    {

        //$this->_initAction();

		$this->loadLayout()->_setActiveMenu('pdp/pdp');

        $this->renderLayout();

    }

	public function designAction()

    {

        //$this->_initAction();

		$this->loadLayout()->_setActiveMenu('pdp/pdp');

        $this->renderLayout();

    }

	public function printAreaAction ()

	{

		$data = $this->getRequest()->getParams();

		if ((int) $data['design_id'] > 0) {

			$mediaPath = Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_MEDIA);

			$design = Mage::getModel('pdp/pdp')->getDesignPrintarea($data['design_id'])->getData();

			$designInfo = $design[0];

			$imgPath = $mediaPath ."pdp/images/" . $designInfo['filename'];

			$designInfo['image_path'] = $imgPath;



			//$this->getResponse()->setBody($imgPath);

			$this->getResponse()->setBody(

				$this->getLayout()->createBlock('core/template')

				->setTemplate('pdp/printarea.phtml')

				->setData($designInfo)

				->setUseAjax(true)

				->toHtml()

			);

		} else {

            $this->getResponse()->setBody(

				$this->getLayout()->createBlock('core/template')

				->setTemplate('pdp/printarea.phtml')

				->setUseAjax(true)

				->toHtml()

			);

		}

	}

	public function deleteImageAction ()

	{

		$data = $this->getRequest()->getParams();

		if ($data['image_id'] != "") {

			$image = Mage::getModel('pdp/images')->load($data['image_id']);

            $filename = $image->getFilename();

            $path = Mage::getBaseDir('media').DS.'pdp/images/';

            unlink($path . $filename);

            $image->delete();

			$this->getResponse()->setBody("delete_" . $data['image_id']);

		}

	}

    

    public function deleteFontAction ()

	{

		$data = $this->getRequest()->getParams();

		if ($data['font_id'] != "") {

			$font = Mage::getModel('pdp/fonts')->load($data['font_id']);

            $filename = $font->getFilename();

            $path = Mage::getBaseDir('media').DS.'pdp/fonts/';

            unlink($path . $filename);

            $font->delete();

			$this->getResponse()->setBody("delete_" . $data['font_id']);

		}

	}

	public function deletePrintareaAction ()

	{

		$data = $this->getRequest()->getParams();

		if ($data['id'] != "") {

			$design = Mage::getModel('pdp/printarea')->load($data['id']);

            $filename = $design->getFilename();

            $path = Mage::getBaseDir('media').DS.'pdp/images/';

            unlink($path . $filename);

            $design->delete();

			$this->getResponse()->setBody("delete_" . $data['id']);

		}

	}

	public function disablePrintareaAction ()

	{

		$data = $this->getRequest()->getParams();

		if ($data['id'] != "") {

			$model = Mage::getModel('pdp/printarea');

			$currentStatus = $model->load($data['id'])->getStatus();

			$responseText = "";

			if ($currentStatus == 1) {

				$newStatus = 2;

				$responseText = $this->__("Enable");

			} else {

				$newStatus = 1;

				$responseText = $this->__("Disable");

			}

			

			$model->setStatus($newStatus);

			$model->save();

			$this->getResponse()->setBody("disable_" . $data['id'] . '-' .$responseText.'-'.$newStatus);

		}

	}

	public function saveAction()

	{

		

		$data = $_REQUEST;

		

		if ($data['design_id'] != "") {

			$oldData = Mage::getModel('pdp/design')->load($data['design_id']);

			/**If image not change, keep the old filename**/

			$data['filename'] = $oldData->getFilename();

			$data['status'] = $oldData->getStatus();

			$data['filename_back'] = $oldData->getFilenameBack();

		}

		/* echo "<pre>";

		print_r($data);

		die('Testing'); */

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

				$this->_redirect('pdp/adminhtml_pdp/design');

				return;

			}

		}

		// end edit by david

		$pdpObject = Mage::getModel('pdp/pdp');

		/**Save Front Image Info**/

		if ($data['front_image_id'] != "") {

			$oldImageData = Mage::getModel('pdp/printarea')->load($data['front_image_id']);

			$frontData['filename'] = $oldImageData->getFilename();

		}

		if (!empty($_FILES['filename']['name'])) {

			try {

				$imageName = $_FILES['filename']['name'];

				$ext = substr($imageName, strrpos($imageName, '.') + 1);

				$filename = "Front-" . time() . '.' . $ext;

				$uploader = new Varien_File_Uploader('filename');

				$uploader->setAllowedExtensions(array('jpg', 'jpeg', 'gif', 'png', 'bmp', 'svg+xml'));

				$uploader->setAllowRenameFiles(false);

				$uploader->setFilesDispersion(false);

				$path = Mage::getBaseDir('media').DS.'pdp/images/';

				//Remove old image if edit new image

				unlink($path . $frontData['filename']);

				$uploader->save($path, $filename);

				$frontData['filename'] = $filename;

			} catch (Exception $e) {

				Mage::getSingleton('adminhtml/session')->addError($e->getMessage());

				$this->_redirect('*/*/design');

				return;

			}

		}

		$frontData['canvas_w'] = $data['iwidth'];

		$frontData['canvas_h'] = $data['iheight'];

		$frontData['canvas_t'] = $data['itop'];

		$frontData['canvas_l'] = $data['ileft'];

		$frontData['image_id'] = $data['front_image_id'];

		if ($frontData['filename'] != "" && $frontData['canvas_l'] != "" && $frontData['canvas_t'] != ""

			&& $frontData['canvas_w'] != "" && $frontData['canvas_h'] != "") 

		{

			$pdpObject->setDesignPrintarea($frontData);

		}

		/**Save Back Image Info**/

		if ($data['back_image_id'] != "") {

			$oldImageDataBack = Mage::getModel('pdp/printarea')->load($data['back_image_id']);

			$backData['filename'] = $oldImageDataBack->getFilename();

		}

		if (!empty($_FILES['filename_back']['name'])) {

			try {

				$imageName = $_FILES['filename_back']['name'];

				$ext = substr($imageName, strrpos($imageName, '.') + 1);

				$filename_back = "Back-" . time() . '.' . $ext;

				$uploader = new Varien_File_Uploader('filename_back');

				$uploader->setAllowedExtensions(array('jpg', 'jpeg', 'gif', 'png', 'bmp', 'svg+xml'));

				$uploader->setAllowRenameFiles(false);

				$uploader->setFilesDispersion(false);

				$path = Mage::getBaseDir('media').DS.'pdp/images/';

				//Remove old image if edit new image

				unlink($path . $backData['filename']);

				$uploader->save($path, $filename_back);

				

				$backData['filename'] = $filename_back;

			} catch (Exception $e) {

				Mage::getSingleton('adminhtml/session')->addError($e->getMessage());

				$this->_redirect('*/*/design');

				return;

			}

		}

		$backData['canvas_w'] = $data['iwidth_back'];

		$backData['canvas_h'] = $data['iheight_back'];

		$backData['canvas_t'] = $data['itop_back'];

		$backData['canvas_l'] = $data['ileft_back'];

		$backData['image_id'] = $data['back_image_id'];

		

		if ($backData['filename'] != "" && $backData['canvas_l'] != "" && $backData['canvas_t'] != ""

			&& $backData['canvas_w'] != "" && $backData['canvas_h'] != "") 

		{

			$pdpObject->setDesignPrintarea($backData);

		}

		

		/**Save Design Info**/

		$designData['design_id'] = $data['design_id'];

		$designData['title'] = $data['title'];

		$designData['pdpgroup'] = $data['group'];

		//$designData['price'] = $data['price'];

		$designData['position'] = $data['position'];

		$designData['product_id'] = $data['product_id'];

		$designData['filename'] = $frontData['filename'];

		$designData['filename_back'] = $backData['filename'];

		//$data['options']['type'] = $data['type'];

		//$data['options']['size'] = serialize($data['size']);

		//$data['options']['color'] = $data['color'];

		//$options = serialize($data['options']);

		//$designData['options'] = $options;

		

		if ($designData['title'] != "" 

			//&& $designData['price'] != ""

			&& $designData['filename'] != "") 

		{

			$designId = $pdpObject->setDesign($designData);

			

			/**Save Advanced Option Info**/

			//Reset option before save

			Mage::getModel('pdp/pdpoption')->removeOptions($designId);

			$pdpOptions = $data['option-label'];

			foreach ($pdpOptions as $key => $value) {

				$pdpOption = array();

				$pdpOption['design_id'] = $designId;

				$pdpOption['sort'] = $data['option-sort'][$key];

				//$pdpOption['price'] = $data['option-price'][$key];

				$pdpOption['option_label'] = $data['option-label'][$key];

				$pdpObject->setPdpOption($pdpOption);

			}

			

			Mage::getSingleton('adminhtml/session')->addSuccess("PDP was successfully saved");

		}

		if ($data['save_and_continue_edit'] != "") {

			$url = Mage::helper("adminhtml")->getUrl("pdp/adminhtml_designtemplate_tshirt/index/",array("id"=> $designId ));

		} else {

			$url = Mage::helper("adminhtml")->getUrl("pdp/adminhtml_pdp/design/");

		}

		Mage::app()->getResponse()->setRedirect($url);

	}

	

	public function saveColorAction()

	{

		$image_id = $_POST['image_id_color'];

		$hexCode = str_replace('#', '', $_POST['color']);

		if ($hexCode == "" || $image_id == "" || $_FILES['color_image']['name'] == "") {

			$url = Mage::helper("adminhtml")->getUrl("pdp/adminhtml_pdp/image/");

			Mage::app()->getResponse()->setRedirect($url);

			return;

		}

		if (!empty($_FILES['color_image']['name'])) {

			try {

				$imageName = $_FILES['color_image']['name'];

				$ext = substr($imageName, strrpos($imageName, '.') + 1);

				$filename = "ColorImage_" . time() . '.' . $ext;

				$uploader = new Varien_File_Uploader('color_image');

				$uploader->setAllowedExtensions(array('jpg', 'jpeg', 'gif', 'png', 'bmp', 'svg+xml')); // or pdf or anything

				/* $size=filesize($_FILES['image']['tmp_name']);

				$test=getimagesize($_FILES['image']['tmp_name']); */

				$uploader->setAllowRenameFiles(false);

				$uploader->setFilesDispersion(false);

				$path = Mage::getBaseDir('media').DS.'pdp/images/';

				$uploader->save($path, $filename);

				$data['filename'] = $filename;

			} catch (Exception $e) {

				Mage::getSingleton('adminhtml/session')->addError($e->getMessage());

				$this->_redirect('*/*/image');

				return;

			}

		}

		$data['image_id'] = $image_id;

		$data['color'] = $hexCode;

		$data['filename'];

		Mage::getModel('pdp/pdp')->addColorImage($data);

		$url = Mage::helper("adminhtml")->getUrl("pdp/adminhtml_pdp/image/");

		Mage::app()->getResponse()->setRedirect($url);

	}

	public function saveTshirtColorAction() 

	{

		$data = $_REQUEST;

		$colorImage = $data['color-image'];

		$pdpModel = Mage::getModel('pdp/pdp');

		foreach ($colorImage as $key => $value) {

			$designColor = array();

			$imageName = $_FILES['colorimage_' . $key]['name'];

			if ($imageName != "") {

				try {

					$ext = substr($imageName, strrpos($imageName, '.') + 1);

					$filename = "DesignColor" . time() . $key . '.' . $ext;

					$uploader = new Varien_File_Uploader('colorimage_' . $key);

					$uploader->setAllowedExtensions(array('jpg', 'jpeg', 'gif', 'png', 'bmp', 'svg+xml')); // or pdf or anything

					$uploader->setAllowRenameFiles(false);

					$uploader->setFilesDispersion(false);

					$path = Mage::getBaseDir('media').DS.'pdp/images/';

					$uploader->save($path, $filename);

					$designColor['filename'] = $filename;

				} catch (Exception $e) {

					Mage::getSingleton('adminhtml/session')->addError($e->getMessage());

					$this->_redirect('*/*/design');

					return;

				}

			}

			

			$imageNameBack = $_FILES['colorimageback_' . $key]['name'];

			if ($imageNameBack != "") {

				try {

					$ext = substr($imageNameBack, strrpos($imageNameBack, '.') + 1);

					$filename = "DesignColorBack" . time() . $key . '.' . $ext;

					$uploader = new Varien_File_Uploader('colorimageback_' . $key);

					$uploader->setAllowedExtensions(array('jpg', 'jpeg', 'gif', 'png', 'bmp', 'svg+xml')); // or pdf or anything

					$uploader->setAllowRenameFiles(false);

					$uploader->setFilesDispersion(false);

					$path = Mage::getBaseDir('media').DS.'pdp/images/';

					$uploader->save($path, $filename);

					$designColor['filename_back'] = $filename;

				} catch (Exception $e) {

					Mage::getSingleton('adminhtml/session')->addError($e->getMessage());

					$this->_redirect('*/*/design');

					return;

				}

			}

			

			$styleImage = $_FILES['styleimage_' . $key]['name'];

			if ($styleImage != "") {

				try {

					$ext = substr($styleImage, strrpos($styleImage, '.') + 1);

					$filename = "StyleImage" . time() . $key . '.' . $ext;

					$uploader = new Varien_File_Uploader('styleimage_' . $key);

					$uploader->setAllowedExtensions(array('jpg', 'jpeg', 'gif', 'png', 'bmp', 'svg+xml')); // or pdf or anything

					$uploader->setAllowRenameFiles(false);

					$uploader->setFilesDispersion(false);

					$path = Mage::getBaseDir('media').DS.'pdp/images/';

					$uploader->save($path, $filename);

					$designColor['style_image'] = $filename;

				} catch (Exception $e) {

					Mage::getSingleton('adminhtml/session')->addError($e->getMessage());

					$this->_redirect('*/*/design');

					return;

				}

			}

			

			$designColor['design_id'] = $data['design_id'];

			$designColor['sort'] = $data['sort'][$key];

			//$designColor['price'] = $data['price'][$key];

			$designColor['color_name'] = $data['color-name'][$key];

			$designColor['hexcode'] = $data['color-image'][$key];

			$pdpModel->setDesignColor($designColor);

		}

		$url = Mage::helper("adminhtml")->getUrl("pdp/adminhtml_pdp/design/");

		Mage::app()->getResponse()->setRedirect($url);

	}

	

	public function saveArtworkColorAction() 

	{

		$data = $_REQUEST;

		$colorImage = $data['color-image'];

		$pdpModel = Mage::getModel('pdp/pdp');

		foreach ($colorImage as $key => $value) {

			$designColor = array();

			$styleImage = $_FILES['artworkimage_' . $key]['name'];

			if ($styleImage != "") {

				try {

					$ext = substr($styleImage, strrpos($styleImage, '.') + 1);

					$filename = "ArtworkColor" . time() . $key . '.' . $ext;

					$uploader = new Varien_File_Uploader('artworkimage_' . $key);

					$uploader->setAllowedExtensions(array('jpg', 'jpeg', 'gif', 'png', 'bmp', 'svg+xml')); // or pdf or anything

					$uploader->setAllowRenameFiles(false);

					$uploader->setFilesDispersion(false);

					$path = Mage::getBaseDir('media').DS.'pdp/images/';

					$uploader->save($path, $filename);

					$designColor['filename'] = $filename;

				} catch (Exception $e) {

					Mage::getSingleton('adminhtml/session')->addError($e->getMessage());

					$this->_redirect('*/*/image');

					return;

				}

			}

			

			$designColor['image_id'] = $data['image_id'];

			$designColor['sort'] = $data['sort'][$key];

			$designColor['color'] = $colorImage[$key];

			$pdpModel->addColorImage($designColor);

		}

		$url = Mage::helper("adminhtml")->getUrl("pdp/adminhtml_pdp/image/");

		Mage::app()->getResponse()->setRedirect($url);

	}

	

	public function artworkColorAction() 

	{		

		$this->loadLayout()->_setActiveMenu('pdp/pdp');

		$this->renderLayout();

	}

	public function artworkColorInfoAction() 

	{

		$imageId = $this->getRequest()->getParam('image_id');

		if ($imageId != "") {

			$info = Mage::getModel('pdp/pdp')->getImageInfo($imageId);

			$info['add_color_url'] = Mage::helper("adminhtml")->getUrl("pdp/adminhtml_pdp/artworkcolor/",array("image_id"=> $imageId));

			$this->getResponse()->setBody(json_encode($info));

		}

	}

}