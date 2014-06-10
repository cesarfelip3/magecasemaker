var frontendPopup = jQuery.noConflict();
frontendPopup(function($) {
    var baseUrl = $("#base_url").val(),
            currentProductId = $("#current_product_id").val(),
            designPageUrl = baseUrl + "pdp/view/getDesignPage",
            w_window = $(window).width();
    LoadDesign = {
        load: function() {
            $(".design-btn .design-product").on("click", function() {
                if (!$(this).hasClass("loaded")) {
                    $('.product-img-box').hide();
                    var cartItemId = $("#cart_item_id").val(),
                            shareId = $("#pdp_design_share").val(),
                            pdpData = {product_id: currentProductId, item_id: cartItemId, share_id: shareId};
                    LoadDesign.sendRequest(designPageUrl, pdpData, LoadDesign.prepareDesignPage);
                } else {
                    //show popup here
                    //$('#pdp_design_button').click();
                }
            });
        }(),
        init: function() {
            var action = $("#pdp_design_action").val(),
                    shareId = $("#pdp_design_share").val(),
                    cartItemId = $("#cart_item_id").val();
            if (action != "" || shareId != "" || cartItemId != "") {
                //Validate product form
                alert('test');
                var addToCartForm = new VarienForm('product_addtocart_form', true);
                if (addToCartForm.validator.validate()) {
                    $(window).load(function() {
                        $(".design-btn .design-product").click();
                    });
                }
            }
        }(),
        sendRequest: function(url, data, callback) {
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                beforeSend: function() {
                    console.log("Sending request...");
                    $(".pdp_loading").show();
                },
                success: function(data) {
                    callback(data);
                    $(".pdp_loading").hide();
                }
            });
        },
        prepareDesignPage: function(data) {
            $(".design-btn .design-product").addClass('loaded');
            $('body').append('<div id="pdp_popup"><div class="overlay"></div></div>');
            $("#pdp_design_popup").appendTo($('#pdp_popup')).html(data);
            var w_design = $('.wrap_inlay_center').width(),
                    w_pdp = parseInt(w_design) + 330;
            //$('#pdp_design_popup').width(w_pdp);
            //$("#pdp_design_button").colorbox({inline:true,width:"90%",height:'850px',escKey: false,overlayClose: false});
            //$('#pdp_design_button').click();
            //LoadDesign.center_canvas();

        },
        center_canvas: function() {
            var w_pdp = $('#cboxLoadedContent').width(),
                    w_design = $('#product-image-wrap').width();
            console.log(w_design);
        },
        hidePdpCustomOption: function() {
            $('#product-options-wrapper dl dt').each(function() {
                if ($(this).children('label').text() == 'pdpinfo') {
                    $(this).hide();
                    $(this).next("dd").addClass("pdp_info").hide();
                }
            });
        }(),
        updatePDPCustomOption: function(design) {
            $("#product-options-wrapper .pdp_info input").val(design);
        }
    }
});