<?php

/**
 * Magento Support Team.
 * @category   MST
 * @package    MST_Pdp
 * @version    2.0
 * @author     Magebay Developer Team <info@magebay.com>
 * @copyright  Copyright (c) 2009-2013 MAGEBAY.COM. (http://www.magebay.com)
 */
class MST_Pdp_Helper_Data extends Mage_Core_Helper_Abstract
{

    protected static $_design = null;
    protected static $_imgPath = null;
    protected static $_fontPath = null;

    public function __construct()
    {
        self::$_design = Mage::getModel('pdp/pdp');
        self::$_imgPath = Mage::getBaseDir('media') . DS . 'pdp' . DS . 'images' . DS;
        self::$_fontPath = Mage::getBaseDir('media') . DS . 'pdp' . DS . 'fonts' . DS;
    }

    public function getImagePath()
    {
        return Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_MEDIA) . 'pdp/images/';
    }

    public function getFontPath()
    {
        return Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_MEDIA) . 'pdp/fonts/';
    }

    public function getDesignCollection()
    {
        $collection = self::$_design->getEnableDesignCollection();
        return $collection;
    }

    public function getCustomImages()
    {
        return self::$_design->getImageCollection();
    }

    public function getWoodImages()
    {
        return self::$_design->getWoodCollection();
    }

    public function getFonts()
    {
        return self::$_design->getFontCollection();
    }

    public function getInlayInfoByFilename($filename)
    {
        $data = self::$_design->getInlayInfoByFilename($filename);
        $cW = $data->getCanvasW();
        $cH = $data->getCanvasH();
        $cT = $data->getCanvasT();
        $cL = $data->getCanvasL();
        $inlay = array($cW, $cH, $cT, $cL);
        return join(',', $inlay);
    }

    public function removeImageFile($filename)
    {
        return unlink(self::$_imgPath . $filename);
    }

    public function removeFontFile($filename)
    {
        return unlink(self::$_fontPath . $filename);
    }

    public function getViewPerPage()
    {
        return array(20, 50, 100);
    }

    public function getCategoryFilterOptions()
    {
        $category = Mage::getModel('pdp/artworkcate')->getCategoryFilterOptions();
        return $category;
    }

    public function pagingCollection($current_page, $page_size, $view_per_page, $collection, $total, $url, $category)
    {

        $collection_counter = $total;
        $collection->setCurPage($current_page);
        $collection->setPageSize($page_size);

        $skin_url = Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_SKIN);
        $arrowLeft = $skin_url . "adminhtml/default/default/images/pager_arrow_left.gif";
        $arrowRight = $skin_url . "adminhtml/default/default/images/pager_arrow_right.gif";
        $paging_text = "<div class='paging-area'>";
        # Get total pages
        $size = ceil($collection_counter / $page_size);
        $paging_text .= "Page ";
        # Previous button
        if ($current_page != 1) {
            $page = $current_page - 1;
            $paging_text.="<div id='previous_div'><a id='previous_page_btn' href='#' onclick='ImgItem.pagingCollection(this.id,\"" . $url . "\")'>" . '<img class="arrow" alt="Go to Previous page" src="' . $arrowLeft . '">' . "</a></div>";
        }
        else {
            $paging_text .= '<img class="arrow" alt="Go to Previous page" src="' . $arrowLeft . '">';
        }
        # Input textbox enter page number
        $paging_text .= "<input class='span1' type='text' id='current_page_input' name='current_page_input' size='1' value='" . $current_page . "'/>";
        # Next button
        if ($current_page != (int) $size) {
            $page = $current_page + 1;
            $paging_text .= "<div id='next_div'><a id='next_page_btn' href='#' onclick='ImgItem.pagingCollection(this.id,\"" . $url . "\")'>" . '<img class="arrow" alt="Go to Next page" src="' . $arrowRight . '">' . "</a></div>";
        }
        else {
            $paging_text .= '<img class="arrow" alt="Go to Next page" src="' . $arrowRight . '">';
        }
        # View per page dropdown
        $view_dropdown = "<select id='view_per_page' class='span1' name='view_per_page' onchange='ImgItem.pagingCollection(this.id,\"" . $url . "\")'>";
        foreach ($view_per_page as $option) {
            $view_dropdown .= "<option value='" . $option . "' " . (($option == $page_size) ? 'selected="selected"' : '') . ">$option</option>";
        }
        $view_dropdown .= "</select>";

        # Category
        $categorys = $this->getCategoryFilterOptions();
        $category_dropdown = "<select id='category_filter' name='category_filter' onchange='ImgItem.pagingCollection(this.id,\"" . $url . "\")'>";
        foreach ($categorys as $key => $value) {
            $category_dropdown .= "<option value='" . $key . "' " . (((string) $key === $category) ? 'selected="selected"' : '') . ">$value</option>";
        }
        $category_dropdown .= "</select>";

        $paging_text .= " of " . $size . " pages | View $view_dropdown | Category $category_dropdown | Total " . $collection_counter . " records found.";
        $paging_text.="</div>"; //End paging-are div
        return array(
            'paging_text' => $paging_text,
            'collection' => $collection,
        );
    }

    public function formatFee($amount)
    {
        return Mage::helper('pdp')->__('Fee');
    }

    public function getTotalDesignPrice()
    {
        $total = 0;
        $cartHelper = Mage::helper('checkout/cart');
        $items = $cartHelper->getCart()->getItems();
        foreach ($items as $item) {
            $qty = $item->getQty();
            $options = $item->getProduct()->getTypeInstance(true)->getOrderOptions($item->getProduct());
            $customOption = $options['options'][0]['option_value'];
            $optionArr = explode('+', $customOption);
            $priceArr = explode(';', $optionArr[0]);
            $price = $priceArr[6] * $qty;
            $total += floatval($price);
        }
        return $total;
    }

    public function setCustomItemPrice($price)
    {
        Mage::getSingleton('core/session')->setCustomItemPrice($price);
    }

    public function getCustomItemPrice()
    {
        return Mage::getSingleton('core/session')->getCustomItemPrice();
    }

    public function resetCustomItemPrice($price)
    {
        Mage::getSingleton('core/session')->setCustomItemPrice('');
    }

    public function getAdminTemplates($productId)
    {
        $response = "";
        $collection = Mage::getModel('pdp/admintemplate')->getCollection();
        $collection->addFieldToFilter('product_id', $productId);
        if (count($collection) > 0) {
            $response = $collection->getFirstItem()->getPdpDesign();
        }
        return $response;
    }

    public function getFacebookSetting()
    {
        $isEnableFacebook = Mage::getStoreConfig('pdp/social/enable_facebook');
        if ($isEnableFacebook == 1) {
            $appId = Mage::getStoreConfig('pdp/social/facebook_app_id');
            $secretKey = Mage::getStoreConfig('pdp/social/facebook_secret_key');
            return array('facebook_app_id' => $appId, 'facebook_secret_key' => $secretKey);
        }
        return false;
    }

    /* edit by David */

    public function get_content_id($file, $id)
    {
        $h1tags = preg_match_all("/(<div id=\"{$id}\">)(.*?)(<\/div>)/ismU", $file, $patterns);
        $res = array();
        array_push($res, $patterns[2]);
        array_push($res, count($patterns[2]));
        return $res;
    }

    public function get_div($file, $id)
    {
        $h1tags = preg_match_all("/(<div.*>)(\w.*)(<\/div>)/ismU", $file, $patterns);
        $res = array();
        array_push($res, $patterns[2]);
        array_push($res, count($patterns[2]));
        return $res;
    }

    public function get_domain($url)
    {
        //$dev = 'dev';
        $dev = $_SERVER['SERVER_NAME'];
        if (!preg_match("/^http/", $url))
            $url = 'http://' . $url;
        if ($url[strlen($url) - 1] != '/')
            $url .= '/';
        $pieces = parse_url($url);
        $domain = isset($pieces['host']) ? $pieces['host'] : '';
        if (preg_match('/(?P<domain>[a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})$/i', $domain, $regs)) {
            $res = preg_replace('/^www\./', '', $regs['domain']);
            return $res;
        }
        return $dev;
    }

    /* end */

    public function getPrintAreaInfo($productId, $designAreaId)
    {
        $itemsModel = Mage::getModel('pdp/designareaitem')->getCollection();
        $itemsModel->addFieldToFilter('product_id', $productId);
        $itemsModel->addFieldToFilter('side_id', $designAreaId);
        if (count($itemsModel) > 0) {
            $printAreaId = $itemsModel->getFirstItem()->getInlayId();
            $inlayModel = Mage::getModel('pdp/printarea')->load($printAreaId);
            return $inlayModel->getData();
        }
        return null;
    }

    public function saveImage($inputName, $mediaPath)
    {
        $imageName = $_FILES[$inputName]['name'];
        //$mediaUrl = Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_LINK) . $mediaPath;
        if ($imageName != "") {
            try {
                $ext = substr($imageName, strrpos($imageName, '.') + 1);
                $filename = $inputName . '-' . time() . '.' . $ext;
                $uploader = new Varien_File_Uploader($inputName);
                $uploader->setAllowedExtensions(array('jpg', 'jpeg', 'gif', 'png', 'bmp', 'svg+xml')); // or pdf or anything
                $uploader->setAllowRenameFiles(false);
                $uploader->setFilesDispersion(false);
                $path = Mage::getBaseDir('media') . DS . $mediaPath;
                $uploader->save($path, $filename);
                return $filename;
            }
            catch (Exception $e) {
                Mage::getSingleton('adminhtml/session')->addError($e->getMessage());
                echo "Error while upload inlay image";
                return;
            }
        }
        return "";
    }

    public function getDesignSides($productId)
    {
        $model = Mage::getModel('pdp/pdpside');
        $collection = $model->getActiveDesignSides($productId);
        $list = "<ul>";
        $baseImageUrl = $this->getImagePath();
        foreach ($collection as $side) {
            //Zend_Debug::dump($side->getData());
            list($width, $height) = getimagesize(self::$_imgPath. $side->getFilename());
            //Mage::log($width . $height, null, 'debugging.log');
            //$width = imagesx(self::$_imgPath . $side->getFilename());
            //$side->getInlayW();
            //$height = imagesy(self::$_imgPath . $side->getFilename()); //$side->getInlayH();
            $top = 0; //$side->getInlayT();
            $left = 0; //$side->getInlayL();
            $inlayString = "$width,$height,$top,$left";
            $list .= "<li class='pdp_side_item_content' inlay='" . $inlayString . "' tab='side_" . $side->getId() .
                    "' side_img='" . $side->getFilename() . "' label='" . $side->getLabel() . "' title='" . $side->getLabel() . "'>";
            $list .= "<img id='thumbnail_" . $side->getId() . "' width='120' src='" . $baseImageUrl . $side->getFilename() . "' />";
            $list .= "<label>" . $this->__($side->getLabel()) . "</label>";
            $list .= "</li>";
        }
        $list .= "</ul>";
        return $list;
    }

}
