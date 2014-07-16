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
        $extension = 'jpeg';
        $uniqueId = uniqid();

        $filename = $uniqueId . "." . $extension;
        $overlayName = "overlay_$uniqueId.$extension";

        if (file_exists(self::$_tmpDir . $filename))
            return;

        // Save canvas image
        $this->_saveCanvasImage($string, $filename);

        // save overlay image with transparent background
        //$this->_saveCanvasImage($overlayString, $overlayName);
        // Save overlay Image
        $this->_saveCanvasImage300DPI($overlayString, "overlay_$uniqueId");

        return $filename;
    }

    protected function _overlayImage($jpeg, $filename)
    {
        $overlay = Mage::getBaseDir('media') . DS . 'pdp/images/custom/overlay_bg.png';
        //$final = self::$_tmpDir . $filename . '.png';
        //Mage::log($overlay, null, 'debugging.log');
        $final = self::$_tmpDir . '300dpi_' . $filename . '.jpeg';

        $basename = pathinfo($jpeg, PATHINFO_FILENAME);
        if (preg_match("/ipad/i", $basename)) {
            $width = 3700;
            $height = 3700;
        }
        else {
            $width = 1850;
            $height = 1850;
        }

        $png = imagecreatefrompng($overlay);
        $jpeg = imagecreatefromjpeg($jpeg);

        $out = imagecreatetruecolor($width, $height);
        imagecopyresampled($out, $jpeg, 0, 0, 0, 0, $width, $height, $width, $height);
        imagecopyresampled($out, $png, 0, 0, 0, 0, $width, $height, $width, $height);

        imagejpeg($out, $final, 100);

        $image = file_get_contents($final);
        $image = substr_replace($image, pack("cnn", 1, 300, 300), 13, 5);

        file_put_contents($final, $image);
    }

    protected function _saveCanvasImage($string, $filename)
    {
        $data = base64_decode(str_replace(' ', '+', substr($string, 22)));

        $img = imagecreatefromstring($data);


        $w = imagesx($img);

        $h = imagesy($img);

        $alpha_image = imagecreatetruecolor($w, $h);

        imagecopyresampled($alpha_image, $img, 0, 0, 0, 0, $w, $h, $w, $h);

        imagejpeg($img, self::$_tmpDir . $filename, 100);

        imagedestroy($img);
    }

    protected function _saveCanvasImage300DPI($string, $filename)
    {
        $data = base64_decode(str_replace(' ', '+', substr($string, 22)));

        $img = imagecreatefromstring($data);

        $w = imagesx($img);

        $h = imagesy($img);

        $out = imagecreatetruecolor($w, $h);

        imagecopyresampled($out, $img, 0, 0, 0, 0, $w, $h, $w, $h);

        $final = self::$_tmpDir . $filename . '.jpeg';

        imagesavealpha($out, TRUE);

        imagejpeg($out, $final, 100);

        // create big image
        $this->_overlayImage($final, $filename);
    }

    protected function _xsaveCanvasImage300DPI($string, $filename)
    {
        $data = base64_decode(str_replace(' ', '+', substr($string, 22)));

        $img = imagecreatefromstring($data);

        $w = imagesx($img);

        $h = imagesy($img);

        $out = imagecreatetruecolor($w, $h);

        // white background
        $color = imagecolorallocate($out, 255, 255, 255);
        imagefill($out, 0, 0, $color);

        imagecopyresampled($out, $img, 0, 0, 0, 0, $w, $h, $w, $h);

        $final = self::$_tmpDir . $filename . '.jpg';

        imagesavealpha($out, TRUE);

        imagejpeg($out, $final, 100);

        $image = file_get_contents($final);

        $image = substr_replace($image, pack("cnn", 1, 300, 300), 13, 5);

        file_put_contents($final, $image);

//        imagesavealpha($img, TRUE);
//
//        imagejpeg($img, $final, 100);
//
//        $image = file_get_contents($final);
//
//        $image = substr_replace($image, pack("cnn", 1, 300, 300), 13, 5);
//
//        file_put_contents($final, $image);
    }

    protected function _saveCanvasImageWithTransparentBg($string, $filename)
    {
        $data = base64_decode(str_replace(' ', '+', substr($string, 22)));

        $img = imagecreatefromstring($data);


        $w = imagesx($img);

        $h = imagesy($img);

        $alpha_image = imagecreatetruecolor($w, $h);

        imagecopyresampled($alpha_image, $img, 0, 0, 0, 0, $w, $h, $w, $h);

        $colourBlack = imagecolorallocate($img, 0, 0, 0);
        imagecolortransparent($img, $colourBlack);
        //$black = imagecolorallocate($img, 0, 0, 0);
        // Make the background transparent
        // imagecolortransparent($img, $black);
//        $color = imagecolorallocatealpha($img, 0, 0, 0, 127);
//        imagefill($new, 0, 0, $color);
        //imagefill($img, 0, 0, 0x7fff0000);
        imagesavealpha($img, TRUE);
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
