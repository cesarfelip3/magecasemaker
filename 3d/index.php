<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8"/>
        <title>IPhone_Case</title>
        <meta name="description" content="" />

        <script src="js/swfobject.js"></script>
        <script>
            var flashvars = {
            };
            flashvars.imgURL = "http://127.0.0.1/Magento/magecasemaker/media/pdp/design/tmp/overlay_<?php echo $_GET['i']?>";
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
        <style>
            html, body { height:100%; overflow:hidden; }
            body { margin:0; }
        </style>
    </head>
    <body>
        <div id="altContent">
            <h1>IPhone_Case</h1>
            <p><a href="http://www.adobe.com/go/getflashplayer">Get Adobe Flash player</a></p>
        </div>
    </body>
</html>