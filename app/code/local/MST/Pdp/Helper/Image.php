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
    protected $_overlayBg;

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

    // put new overlay image spec here
    // iphone5 is file basename of overlay image

    public $overlay_spec = array (
        "iphone5" => array (

            // the position of content area in overlay image

            "left" => 589,
            "top" => 148,
            "right" => 1717,
            "bottom" => 2190,

            // the required width and height
            "width" => 945,
            "height" => 1713
        ),
        "iphone_5" => array (
            "left" => 589,
            "top" => 148,
            "right" => 1717,
            "bottom" => 2190,
            "width" => 945,
            "height" => 1713
        ),
        "iphone4" => array (
            "left" => 591,
            "top" => 221,
            "right" => 1750,
            "bottom" => 2105,
            "width" => 1004,
            "height" => 1631
        ),
        "samsunggalaxys3" => array (
            "left" => 593,
            "top" => 146,
            "right" => 1715,
            "bottom" => 1958,
            "width" => 1063,
            "height" => 1712
        ),
        "samsunggalaxys4" => array (
            "left" => 593,
            "top" => 146,
            "right" => 1717,
            "bottom" => 1933,
            "width" => 1078,
            "height" => 1713
        ),
        "ipad" => array(
            "left" => 640,
            "top" => 434,
            "right" => 1685,
            "bottom" => 1894,
            "width" => 1800,
            "height" => 2492
        ),
        "iphone6plus" => array(
            "left" => 564,
            "top" => 142,
            "right" => 1736,
            "bottom" => 2211,
            "width" => 1170,
            "height" => 2070
        ),
        "iphone6" => array(
            "left" => 649,
            "top" => 140,
            "right" => 1654,
            "bottom" => 1940,
            "width" => 1005,
            "height" => 1800
        )
    );

    public function saveCanvasToImage2($string, $overlayString, $overlayBg)
    {
        $extension = 'jpeg';
        $uniqueId = uniqid();

        $this->_overlayBg = $overlayBg;

        $filename = $uniqueId . "." . $extension;
        $overlayName = "overlay_$uniqueId.$extension";

        if (file_exists(self::$_tmpDir . $filename))
            return;

        // Save canvas image
        $this->_saveImageOfCanvas($string, $filename);

        // save overlay image with transparent background
        //$this->_saveCanvasImage($overlayString, $overlayName);
        // Save overlay Image
        $this->_saveCanvasImage300DPI2($overlayString, "overlay_$uniqueId");

        return $filename;
    }

    protected function _saveImageOfCanvas($string, $filename)
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

    protected function _saveCanvasImage300DPI2($string, $filename)
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

        $this->_addOverlayImage($final, $filename, 2340, 2340);
    }

    protected function _addOverlayImage($jpeg, $filename, $width, $height)
    {
        $overlayDirectory = Mage::getBaseDir('media') . DS . 'pdp/images/custom';

        $overlay = $overlayDirectory . DS . $this->_overlayBg . '.png';

        if (!file_exists($overlay))
            $overlay = Mage::getBaseDir('media') . DS .
                'pdp/images/custom/overlay_bg.png';

        $final = self::$_tmpDir . '300dpi_' . $filename . '.jpeg';

        $png = imagecreatefrompng($overlay);
        $jpeg = imagecreatefromjpeg($jpeg);

        $out = imagecreatetruecolor($width, $height);
        imagecopyresampled($out, $jpeg, 0, 0, 0, 0, $width, $height, $width, $height);
        imagecopyresampled($out, $png, 0, 0, 0, 0, $width, $height, $width, $height);

        // lets resize it

        $spec = $this->overlay_spec[$this->_overlayBg];
        $width = $spec['width'];
        $height = $spec['height'];

        $left = $spec['left'];
        $top = $spec['top'];
        $right = $spec['right'];
        $bottom = $spec['bottom'];

        $width_orig = $right - $left;
        $height_orig = $bottom - $top;

        $image_cropped = imagecreatetruecolor($width, $height);
        //$image = imagecreatefromjpeg($filename);
        imagecopyresampled($image_cropped, $out, 0, 0, $left, $top, $width, $height, $width_orig, $height_orig);

        //

        imagejpeg($image_cropped, $final, 100);

        $image = file_get_contents($final);
        $image = substr_replace($image, pack("cnn", 1, 300, 300), 13, 5);

        file_put_contents($final, $image);
    }

    //==========================================
    //
    //==========================================

    public function saveCanvasToImage($string, $overlayString, $overlayBg)
    {
        $extension = 'jpeg';
        $uniqueId = uniqid();

        $this->_overlayBg = $overlayBg;

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
        $overlayDirectory = Mage::getBaseDir('media') . DS . 'pdp/images/custom/3dview';
        
        $overlay = $overlayDirectory . DS . $this->_overlayBg . '.png';

        if (!file_exists($overlay))
            $overlay = Mage::getBaseDir('media') . DS .
                    'pdp/images/custom/overlay_bg.png';

        //$final = self::$_tmpDir . $filename . '.png';
        //Mage::log($overlay, null, 'debugging.log');
        $final = self::$_tmpDir . '300dpi_' . $filename . '.jpeg';

        $width = 462;
        $height = 462;

        $png = imagecreatefrompng($overlay);
        $jpeg = imagecreatefromjpeg($jpeg);

//        $out = imagecreatetruecolor(310, 415);
//        imagecopyresampled($out, $jpeg, 0, 0, 0, 0, 310, 415, $width, $height);
//        imagecopyresampled($out, $png, 0, 0, 0, 0, 310, 415, $width, $height);

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
