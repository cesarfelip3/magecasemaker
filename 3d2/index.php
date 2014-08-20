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
<?php
$_imageUrl = 'http://www.udesingify.com/media/pdp/design/checkout/300dpi_overlay_53efe53f9eecc.jpeg';
$_caseAWD = 'http://www.udesingify.com/3d2/assets/iPhone-4/iPhone-4.awd';
?>
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
                    "http://www.udesingify.com/3d2/IPhoneCase.swf",
                    "altContent", "100%", "100%", "10.0.0",
                    "http://www.udesingify.com/3d2/expressInstall.swf",
                    flashvars, params, attributes);
        </script>
        <style>
            html, body { height:100%; overflow:hidden; }
            body { margin:0; }
        </style>
    </head>
    <body>
        <div id="altContent" style="height:800px;">
            <h1>IPhone_Case</h1>
            <p><a href="http://www.adobe.com/go/getflashplayer">Get Adobe Flash player</a></p>
        </div>
    </body>
</html>