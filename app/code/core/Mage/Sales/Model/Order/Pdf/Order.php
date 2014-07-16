<?php

/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magentocommerce.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magentocommerce.com for more information.
 *
 * @category    Mage
 * @package     Mage_Sales
 * @copyright   Copyright (c) 2014 Magento Inc. (http://www.magentocommerce.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

/**
 * Sales Order Shipment PDF model
 *
 * @category   Mage
 * @package    Mage_Sales
 * @author     Magento Core Team <core@magentocommerce.com>
 */
class Mage_Sales_Model_Order_Pdf_Order extends Mage_Sales_Model_Order_Pdf_Abstract
{

    protected function insertImage($image, $x1, $y1, $x2, $y2, $width, $height, &$page)
    {
        if (!is_null($image)) {
            try {
                $imageLocation = Mage::getBaseDir(Mage_Core_Model_Store::URL_TYPE_MEDIA) . DS . 'pdp/design/checkout/' . $image;
                $image = Zend_Pdf_Image::imageWithPath($imageLocation);

                //Draw image to PDF
                $page->drawImage($image, $x1, $y1, $x2, $y2);
            }
            catch (Exception $e) {
                return false;
            }
        }
    }

    /**
     * Return PDF document
     *
     * @param  array $shipments
     * @return Zend_Pdf
     */
    public function getPdf($order = array())
    {
        $width = 1000;
        $height = 1000;
        $this->_beforeGetPdf();
        $this->_initRenderer('invoice');

        $pdf = new Zend_Pdf();
        $this->_setPdf($pdf);
        $style = new Zend_Pdf_Style();
        $this->_setFontBold($style, 10);

        $page = $this->newPage();

        if ($order->getStore()->getId()) {
            Mage::app()->getLocale()->emulate($order->getStore()->getId());
            Mage::app()->setCurrentStore($order->getStore()->getId());
        }
        //$page = $this->newPage();
        /* Add image */
        $this->insertLogo($page, $order->getStore());
        /* Add address */
        $this->insertAddress($page, $order->getStore());
        /* Add head */
        $this->insertOrder(
                $page, $order, Mage::getStoreConfigFlag(self::XML_PATH_SALES_PDF_INVOICE_PUT_ORDER_ID, $order->getStoreId())
        );
        /* Add document text and number */
        $this->insertDocumentNumber(
                $page, Mage::helper('sales')->__('Order # ') . $order->getIncrementId()
        );
        /* Add body */
        foreach ($order->getAllItems() as $item) {
            // Create new image object 
            $imageLocation = Mage::getBaseDir(Mage_Core_Model_Store::URL_TYPE_MEDIA) . DS . 'pdp/design/checkout/' . $item->getFinalImage();
            if (file_exists($imageLocation)) {
                $page = $this->newPage();
                $image = Zend_Pdf_Image::imageWithPath($imageLocation);
                list($width, $height) = getimagesize($imageLocation);
                // Draw part of the image within a circle 
                $page->saveGS();
                $page->drawImage($image, 0, 100, $width, 100 + $height);
                $page->restoreGS();
            }

            // Create new overlay image 
            /*
            $overlayLocation = Mage::getBaseDir(Mage_Core_Model_Store::URL_TYPE_MEDIA) . DS . 'pdp/design/checkout/overlay_' . $item->getFinalImage();
            //Mage::log('overlay image : ' . $overlayLocation, null, 'debugging.log');
            if (file_exists($overlayLocation)) {
                $page = $this->newPage();
                $overlay = Zend_Pdf_Image::imageWithPath($overlayLocation);

                list ($width, $height) = getimagesize($overlayLocation);
                // Draw part of the image within a circle 
                $page->saveGS();
                $page->drawImage($overlay, 0, 100, $width, 100 + $height);
                $page->restoreGS();
            }*/

            $page = end($pdf->pages);
        }
        /* Add totals */
        //$this->insertTotals($page, $invoice);
        if ($order->getStore()->getStoreId()) {
            Mage::app()->getLocale()->revert();
        }

        $this->_afterGetPdf();
        return $pdf;
    }

    /**
     * Create new page and assign to PDF object
     *
     * @param  array $settings
     * @return Zend_Pdf_Page
     */
    public function newPage(array $settings = array())
    {
        /* Add new table head */
        $page = $this->_getPdf()->newPage(Zend_Pdf_Page::SIZE_A4);
        $this->_getPdf()->pages[] = $page;
        $this->y = 800;
        if (!empty($settings['table_header'])) {
            $this->_drawHeader($page);
        }
        return $page;
    }

}
