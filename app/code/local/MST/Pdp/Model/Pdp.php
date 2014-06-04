<?php
/**
* Magento Support Team.
* @category   MST
* @package    MST_Pdp
* @version    2.0
* @author     Magebay Developer Team <info@magebay.com>
* @copyright  Copyright (c) 2009-2013 MAGEBAY.COM. (http://www.magebay.com)
*/
class MST_Pdp_Model_Pdp extends Mage_Core_Model_Abstract
{
    public function _construct()
    {
        parent::_construct();
        $this->_init('pdp/pdp');
    }
	
	public function setDesignImage ($data) 
	{
		$model = Mage::getModel('pdp/images');
		$collection = $model->getCollection();
		$collection->addFieldToFilter('filename', $data['filename']);
		$collection->addFieldToFilter('image_type', $data['image_type']);
		$imageObj = $collection->getFirstItem()->getData('filename');
		if (count($imageObj) == "") {
			if ($data['filename'] != "" && $data['image_type'] != "") {
				$model->setData($data);
				$model->save();
			}
		}
        $returnData = $model->getData();
		return $returnData;
	}
	public function getImageCollection ()
	{
		$images = Mage::getModel('pdp/images')->getCollection()
        ->addFieldToFilter('image_type', 'custom')
		->setOrder('image_id', 'DESC')
		->setOrder('image_type');
		return $images;
	}
	public function getImageCollectionByCategory ($category)
	{
		if ($category === "0") {
			$images = Mage::getModel('pdp/images')->getCollection()
			->addFieldToFilter('image_type', 'custom')
			->setOrder('position', 'DESC')
			->setOrder('image_id', 'DESC');
		} else {
			/* $category_fillter = array('like'=>'%'. $category .'%');
			$images = Mage::getModel('pdp/images')->getCollection()
			->addFieldToFilter('image_type', 'custom')
			->addFieldToFilter('category', array($category_fillter))
			->setOrder('image_id', 'DESC')
			->setOrder('image_type'); */
			$images = Mage::getModel('pdp/images')->getCollection()
			->addFieldToFilter('image_type', 'custom')
			->addFieldToFilter('category', $category)
			->setOrder('position', 'DESC')
			->setOrder('image_id', 'DESC');
		}
		
		return $images;
	}
    
    public function getWoodCollection ()
	{
		$images = Mage::getModel('pdp/images')->getCollection()
        ->addFieldToFilter('image_type', 'wood')
		->setOrder('image_id', 'DESC')
		->setOrder('image_type');
		return $images;
	}
    
	public function getFilename ($image_id)
	{	
		$filename = Mage::getModel('pdp/images')->load($image_id)->getFilename();
		return $filename;
	}
	
	public function setDesignFont ($data) 
	{
		$model = Mage::getModel('pdp/fonts');
		$collection = $model->getCollection();
		$collection->addFieldToFilter('name', $data['name']);
		$collection->addFieldToFilter('ext', $data['ext']);
		$fontObj = $collection->getFirstItem()->getData('name');
		if (count($fontObj) == "") {
			if ($data['name'] != "" && $data['ext'] != "") {
				$model->setData($data);
				$model->save();
			}
		}
		$returnData = $model->getData();
		return $returnData;
	}
	
    public function getFontCollection ()
	{
		$fonts = Mage::getModel('pdp/fonts')->getCollection()
		->setOrder('name', 'ASC');
		return $fonts;
	}
	
	public function setDesignPrintarea ($data)
	{
		if ((int) $data['canvas_w'] > 0 && (int) $data['canvas_h'] > 0) {
			$model = Mage::getModel('pdp/printarea');
			$model->setData($data)->setId($data['id']);
			$model->save();
			return $model->getId();
		}
	}
	
	public function saveDesignAreaItem($productId, $sideId, $inlayId) {
		$id = NULL;
		$model = Mage::getModel('pdp/designareaitem')->getCollection();
		$model->addFieldToFilter('product_id', $productId);
		$model->addFieldToFilter('side_id', $sideId);
		if (count($model) > 0 ) {
			$id = $model->getFirstItem()->getId();
		}
		$data['product_id'] = $productId;
		$data['side_id'] = $sideId;
		$data['inlay_id'] = $inlayId;
		$printModel = Mage::getModel('pdp/designareaitem');
		$printModel->setData($data)->setId($id);
		$printModel->save();
		return $printModel->getId();
	}
	public function getDesignSides($productId) {
		$inlayTable = Mage::getSingleton('core/resource')->getTableName('mst_pdp_printarea');
		$collection = Mage::getModel('pdp/designareaitem')->getCollection();
		$fieldToSelect = array('t2.filename', 't2.canvas_w', 't2.canvas_h', 't2.canvas_t', 't2.canvas_l');
		$collection->getSelect()->join(array('t2' => $inlayTable), 'main_table.inlay_id = t2.id', $fieldToSelect);
		$collection->addFieldToFilter('product_id', $productId);
		//join with side table to get side label
		//$sideTable = Mage::getSingleton('core/resource')->getTableName('mst_pdp_design_areas');
		//$collection->getSelect()->join(array('t3' => $sideTable), 'main_table.side_id = t3.id', 't3.label');
		return $collection;
	}
	public function setDesign($data)
	{
		if ($data['design_id'] != "") {
			$model = Mage::getModel('pdp/design')->setData($data)->setId($data['design_id']);
			$model->save();
			return $model->getId();
		} else {
			$model = Mage::getModel('pdp/design');
			$model->setData($data);
			$model->save();
			return $model->getId();
		}		
	}
	
	public function getEnableDesignCollection()
	{
		$collection = Mage::getModel('pdp/design')->getCollection();
		$collection->addFieldToFilter('status', 1);
		$collection->setOrder('position', 'ASC');
		//$collection->setOrder('title', 'ASC');
		return $collection;
	}
	
	public function getDesignPrintareaCollection()
	{
		$collection = Mage::getModel('pdp/printarea')->getCollection();
		$collection->setOrder('position', 'ASC');
		$collection->setOrder('title', 'ASC');
		return $collection;
	}
	public function getDesignCollection()
	{
		$collection = Mage::getModel('pdp/design')->getCollection();
		$collection->setOrder('pdpgroup', 'DESC');
		$collection->setOrder('position', 'ASC');
		//$collection->setOrder('title', 'ASC');
		return $collection;
	}
	public function getDesignPrintarea ($design_id)
	{
		$collection = $this->getDesignPrintareaCollection();
		$collection->addFieldToFilter('id', $design_id);
		$collection->getFirstItem();
		return $collection;
	}
	public function getInlayInfoByFilename($filename)
	{
		$model = Mage::getModel('pdp/printarea')->getCollection();
		$model->addFieldToFilter('filename', $filename);
		return $model->getFirstItem();
	}
	
	public function updateDesignPosition ($id, $position)
	{
		$model = Mage::getModel('pdp/printarea')->load($id);
		$model->setPosition($position);
		$model->save();
	}
	public function enableDesign ($id)
	{
		$model = Mage::getModel('pdp/design')->load($id);
		$model->setStatus(1);
		$model->save();
	}
	public function disableDesign ($id)
	{
		$model = Mage::getModel('pdp/design')->load($id);
		$model->setStatus(2);
		$model->save();
	}
	public function deleteDesign ($id)
	{
		$model = Mage::getModel('pdp/design')->load($id)->delete();
	}
	public function deleteImageByFilename($filename)
	{
		$images = Mage::getModel('pdp/images')->getCollection();
		$images->addFieldToFilter('filename', $filename);
		if ( count($images) > 0) {
			$id = $images->getFirstItem()->getId();
			Mage::getModel('pdp/images')->load($id)->delete();
		}
	}
	public function deleteImageById($id)
	{
		$image = Mage::getModel('pdp/images')->load($id);
		$filename = $image->getFilename();
		$isRemoved = Mage::helper('pdp')->removeImageFile($filename);
		$image->delete();
		
	}
	public function deleteFontById($id)
	{
		$font = Mage::getModel('pdp/fonts')->load($id);
		$filename = $font->getName() . '.' . $font->getExt();
		$isRemoved = Mage::helper('pdp')->removeFontFile($filename);
		$font->delete();
	}
	public function getImageInfo($imageId)
	{
		$images = Mage::getModel('pdp/images')->load($imageId);
		$categoryTitle = Mage::getModel('pdp/artworkcate')->load($images->getCategory())->getTitle();
		
		$colorImage = $this->getColorImage($imageId);
		$data['image'] = $images->getData();
		$data['colorimage'] = $colorImage;
		$data['category_title'] = $categoryTitle;
		return $data;
	}
	public function updateImageInfo($data)
	{
		$imageId = $data['image_id'];
		$category = $data['category'];
		if ($imageId != "" && $category != "") {
			$model = Mage::getModel('pdp/images')->setCategory($category)->load($imageId);
			$model->setCategory($category);
			$model->save();
		}
	}
	public function addColorImage($data) 
	{
		$model = Mage::getModel('pdp/colorimage');
		$model->setData($data);
		$model->save();
	}
	public function getColorImage($imageId)
	{
		$collection = Mage::getModel('pdp/colorimage')->getCollection();
		$collection->addFieldToFilter('image_id', $imageId);
		
		$data = array();
		foreach ($collection as $item) {
			$data[] = join('-', $item->getData());
		}
		return join(',', $data);
	}
	public function getColorImageFrontend($imageId)
	{
		$collection = Mage::getModel('pdp/colorimage')->getCollection();
		$collection->addFieldToFilter('image_id', $imageId);
		
		$data = array();
		foreach ($collection as $item) {
			$img_color = array($item->getColor(), $item->getFilename());
			$data[] = join('-', $img_color);
		}
		return join(',', $data);
	}
	public function deleteColorImage ($id)
	{
		$imgColor = Mage::getModel('pdp/colorimage')->load($id);
		//Remove image file
		$filename = $imgColor->getFilename();
		$isRemoved = Mage::helper('pdp')->removeImageFile($filename);
		$imgColor->delete();
	}
	public function deleteDesignColor ($id)
	{
		$imgColor = Mage::getModel('pdp/designcolor')->load($id);
		//Remove image file
		$filename = $imgColor->getFilename();
		$filenameBack = $imgColor->getFilenameBack();
		$isRemoved = Mage::helper('pdp')->removeImageFile($filename);
		$isRemovedBack = Mage::helper('pdp')->removeImageFile($filenameBack);
		$imgColor->delete();
	}
	public function setDesignColor($data) {
		$model = Mage::getModel('pdp/designcolor');
		$model->setData($data);
		$model->save();
	}
	public function setPdpOption($data) {
		$model = Mage::getModel('pdp/pdpoption');
		$model->setData($data);
		$model->save();
	}
	public function getDesignStyles() {
		$collection = Mage::getModel('pdp/designcolor')->getCollection()->setOrder('sort', 'ASC');
		return $collection;
	}
	public function getDesignColor($designId) {
		$collection = Mage::getModel('pdp/designcolor')->getCollection()->setOrder('sort', 'ASC');
		$collection->addFieldToFilter('design_id', $designId);
		$data = array();
		foreach ($collection as $option) {
			$data[] = $option->getData();
		}
		return json_encode($data);
	}
	public function getPdpOption($designId) {
		$collection = Mage::getModel('pdp/pdpoption')->getCollection();
		$collection->addFieldToFilter('design_id', $designId);
		return $collection;
	}
/* 	public function updateDesignColorPosition($position) {
		$posArr = explode(',', $position);
		$model = Mage::getModel('pdp/designcolor');
		foreach ($posArr as $option) {
			$temp = explode('_', $option);
			$model->load($temp[0]);
			$model->setSort($temp[1]);
			$model->save();
		}
	}
	public function updateDesignColorPrice($price) {
		$priceArr = explode(',', $price);
		$model = Mage::getModel('pdp/designcolor');
		foreach ($priceArr as $option) {
			$temp = explode('_', $option);
			$model->load($temp[0]);
			$model->setPrice($temp[1]);
			$model->save();
		}
	}
	public function updateDesignColorName($colorName) {
		$nameArr = explode(',', $colorName);
		$model = Mage::getModel('pdp/designcolor');
		foreach ($nameArr as $option) {
			$temp = explode('_', $option);
			$model->load($temp[0]);
			$model->setColorName($temp[1]);
			$model->save();
		}
	} */
	public function updateDesignStyle($colorName, $price, $position) {
		$nameArr = explode(',', $colorName);
		$priceArr = explode(',', $price);
		$posArr = explode(',', $position);
		$model = Mage::getModel('pdp/designcolor');
		
		for ($i = 0; $i < count($nameArr); $i++) {
			$nameTemp = explode('_', $nameArr[$i]);
			$priceTemp = explode('_', $priceArr[$i]);
			$positionTemp = explode('_', $posArr[$i]);
			
			$designId = $nameTemp[0];
			$newName = $nameTemp[1];
			$newPrice = $priceTemp[1];
			$newPosition = $positionTemp[1];
			
			$model->load($designId);
			$model->setColorName($newName);
			$model->setPrice($newPrice);
			$model->setSort($newPosition);
			$model->save();
		}
	}
}