<?php
if (version_compare(phpversion(), '5.2.0', '<') === true) {
    die('ERROR: Whoops, it looks like you have an invalid PHP version. Magento supports PHP 5.2.0 or newer.');
}

require_once('../app/Mage.php'); //Path to Magento
umask(0);
Mage::app(1);
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8"/>
        <title>IPhone_Case</title>
        <meta name="description" content="" />

        <script src="http://www.udesingify.com/3d2/js/swfobject.js"></script>
        <script>
            var flashvars = {
            };
<?php if (isset($_POST['img'])) : ?>
                $_imageUrl = "<?php echo Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_MEDIA);?>/pdp/design/tmp/300dpi_overlay_<?php echo $_POST['img'] ?>";
<?php else : ?>
                $_imageUrl = 'http://www.udesingify.com/media/pdp/design/checkout/300dpi_overlay_53efe53f9eecc.jpeg';
<?php endif; ?>
<?php $_caseAWD = 'http://www.udesingify.com/3d2/assets/iPhone-4/iPhone-4.awd'; ?>

            flashvars.imgURL = "<?php echo $_imageUrl; ?>";
            flashvars.caseAWD = "<?php echo $_caseAWD; ?>";
//flashvars.caseAWD = "assets/SG_4/SG_4.awd";
            var params = {
                menu: "false",
                scale: "noScale",
                allowFullscreen: "true",
                allowScriptAccess: "always",
                bgcolor: "",
                wmode: "direct" // can cause issues with FP settings & webcam
            };
            var attributes = {
                id: "IPhoneCase"
            };
            swfobject.embedSWF(
                    "http://www.udesingify.com/3d2/IPhoneCase.swf", "altContent", "100%", "500px", "10.0.0", "http://www.udesingify.com/3d2/expressInstall.swf", flashvars, params, attributes);
        </script>
        <style>
            html, body { height:100%; overflow:hidden; }
            body { margin:0; }
        </style>
    </head>
    <body>
        <div id="altContent" style="height:500px;">
            <h1>IPhone_Case</h1>
            <p><a href="http://www.adobe.com/go/getflashplayer">Get Adobe Flash player</a></p>
        </div>
    </body>
</html>