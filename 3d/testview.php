<?php
if (version_compare(phpversion(), '5.2.0', '<') === true) {
    die('ERROR: Whoops, it looks like you have an invalid PHP version. Magento supports PHP 5.2.0 or newer.');
}

require_once('../app/Mage.php'); //Path to Magento
umask(0);
Mage::app(1);
?>
<script src="js/swfobject.js"></script>
<script>
    var flashvars = {
    };
    flashvars.imgURL = "<?php echo Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_MEDIA); ?>/pdp/design/tmp/overlay_<?php echo $_GET['i'] ?>";
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
                "IPhoneCase.swf",
                "altContent", "100%", "100%", "10.0.0",
                "expressInstall.swf",
                flashvars, params, attributes);
</script>
<div id="altContent">
    <h1>IPhone_Case</h1>
    <p><a href="http://www.adobe.com/go/getflashplayer">Get Adobe Flash player</a></p>
</div>