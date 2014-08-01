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
        <style>
            html, body { height:100%; overflow:hidden; }
            body { margin:0; }
        </style>
    </head>
    <body>
        <section class="container" style="width:80%; margin: 0 auto; background: #eee;">
            testing
            <div id="view-3d">
            </div>
        </section>
    </body>
</html>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript">
    (function($) {
        $(document).ready(function() {
            $.ajax({
                type: "GET",
                url: "testview.php?i=53dbaad1a709d.jpeg"
            }).done(function(response) {
                $('#view-3d').html(response);
            });
        });
    })(jQuery);
</script> 