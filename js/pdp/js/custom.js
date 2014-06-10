;
(function($, window, document, undefined) {
    var customPDP = {
        load: function() {
            alert('loading');
        },
        init: function() {
            alert('init');
            this.saveDesign();
        },
        saveDesign: function() {
            jQuery('#save_design').on('click', function() {
                alert('test');
            });
            jQuery('.pdp_add_to_cart').on('click', function() {
                alert('add to cart');
            });
        }
    };
})(jQuery, window, document)