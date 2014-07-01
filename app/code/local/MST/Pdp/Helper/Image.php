<?php

/**
 * Image Helper
 *
 * @author Santosh Moktan <itmyprofession@gmail.com>
 */
class MST_Pdp_Helper_Image extends Mage_Core_Helper_Abstract
{

    /**
     * Temporary custom image folder
     * 
     * @var type 
     */
    public static $_tmpDir;

    public function __construct()
    {
        self::$_tmpDir = Mage::getBaseDir('media') . DS . "pdp" . DS . "design" . DS . "tmp" . DS;
        if (!is_dir(self::$_tmpDir)) {
            mkdir(self::$_tmpDir, 0777, true);
        }
    }

    /**
     * Save canvas string to image
     * 
     * @param type $string
     */
    public function saveCanvasToImage($string, $overlayString)
    {
        $extension = 'png';
        $uniqueId = uniqid();
        
        $filename = $uniqueId . "." . $extension;
        $overlayName = "overlay_$uniqueId.$extension";

        if (file_exists(self::$_tmpDir . $filename))
            return;

        // Save canvas image
        $this->_saveCanvasImage($string, $filename);

        // Save overlay Image
        $this->_saveCanvasImage($overlayString, $overlayName);

        return $filename;
    }

    protected function _saveCanvasImage($string, $filename)
    {
        $data = base64_decode(str_replace(' ', '+', substr($string, 22)));

        $img = imagecreatefromstring($data);


        $w = imagesx($img);

        $h = imagesy($img);

        $alpha_image = imagecreatetruecolor($w, $h);

        imagecopyresampled($alpha_image, $img, 0, 0, 0, 0, $w, $h, $w, $h);

        imagepng($img, self::$_tmpDir . $filename, 0);

        imagedestroy($img);
    }

    /**
     * Get session Image name
     */
    public function getSessionImage()
    {
        return Mage::getModel('core/session')->getData('customImage');
    }

    /**
     * Get Final Image
     * 
     * @param type $item
     * @return type
     */
    public function getFinalImage($item)
    {
        $results = $item->getOptionByCode("final_image");
        if (!is_null($results))
            $results = unserialize($results->getValue());
        return $results;
    }

}
