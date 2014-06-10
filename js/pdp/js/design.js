var mst = jQuery.noConflict();
mst.fn.ForceNumericOnly = function() {
    return this.each(function() {
        mst(this).keydown(function(e) {
            var a = e.charCode || e.keyCode || 0;
            return (a == 8 || a == 9 || a == 46 || (a >= 37 && a <= 40) || (a >= 48 && a <= 57) || (a >= 96 && a <= 105))
        })
    })
};
mst(document).ready(function($) {

    $('body').prepend('<div class="loadding_initializing no-display"><div class="p_wrap"><p>Initializing...</p><div class="process_wrap"><span id="process_pdp_ini"></span></div><span id="ini_count">0%</span></div></div>');

    var m = $('#url_site').val().replace('index.php/', ''),
            numImages = $("#design_control img").length,
            local_zindex = 1000,
            loaded = 0,
            tint_image = {},
            pdp_history = [],
            window_width = $(window).width(),
            left_ini = parseInt((window_width - 400) / 2);

    $('.loading_initializing .p_wrap').css('left', left_ini);

    $("#design_control img").load(function() {
        ++loaded;
        $('span#ini_count').html(parseInt((loaded / numImages) * 100) + '%');
        $('.loading_initializing .process_wrap #process_pdp_ini').css("width", parseInt((loaded / numImages) * 100) + '%');
        if (loaded == numImages) {
        } else {
        }
    });

    $('body').append('<div style="display:none;" class="no-display" id="save_original_img_text"></div>');

    //$('#product-image-wrap-front,#product-image-wrap-back').attr('z_index', 1000);
    $('#add_text_input').click(function() {
        $('.image_item.active, .pdp_text_list li.active').removeClass("active");
    });

    $('#wrap_inlay').attr("tab", $('#pdp_side_items li:eq(0)').attr('tab'));

    $('.wrap_inlay').hover(function() {
        $(this).addClass("act2");
    }, function() {
        $(this).removeClass("act2");
    });

    $('.tshirt-size li').prepend('<span class="prev_t">Prev</span>').append('<span class="next_t">Next</span>');

    $('.size_qty, #select_font_size, #h-shadow, #v-shadow, #t-blur').ForceNumericOnly();

    var o = $('#t-shirt-type').val(), first_item;

    if ($('#pdp_side_items li.active').length == 0) {
        first_item = $('#pdp_side_items li:eq(0)');
    } else {
        first_item = $('#pdp_side_items li.active');
    }

    first_item.addClass("active");

    $('.color_wrap li, .tshirt-size li').hide();
    //$('.wrap_inlay_center').each(function(){
    //    var tab = $(this).attr("tab")

    $('.wrap_inlay_center').append('<img id="main_image" src="' + m + 'media/pdp/images/no_image.jpg" />');
    //});
    //$('#product-image-wrap-back .wrap_inlay_center').append('<img id="main_image_back" src="' + m + 'media/pdp/images/no_image.jpg" />');
    //if ($('#list_color li').length > 0) {
    //var inlay = first_item.attr("inlay").split(",");

    $('#main_image').attr("src", first_item.find('img').attr("src"));
    console.log(first_item);
    var w_img_f = $('#main_image').width();
    var h_img_f = $('#main_image').height();

    var inlay = w_img_f + ',' + h_img_f + ',0,0';
    //var inlay = first_item.attr('inlay');
    inlay = inlay.split(',');
    //console.log(inlay);




    //$('#main_image_front,#main_image_back').hide();
    $('#wrap_inlay').css({
        "width": inlay[0] + 'px',
        "height": inlay[1] + 'px',
        "top": inlay[2] + 'px',
        "left": inlay[3] + 'px'
    });

    /////////////////////////////////Setup the first Canvas//////////////////////////
    $('#canvas_area').attr({
        'width': inlay[0],
        'height': inlay[1]
    });

    var canvas = new fabric.Canvas('canvas_area', {
    });
    var img_bg = m + 'media/pdp/images/' + $('#pdp_side_items li.active').attr('side_img');
    var mainImage = fabric.Image.fromURL(img_bg, function(img) {
        // disable image selection
        img.set('selectable', false);
        canvas.add(img);
    });

    $('#pdp_side_items li').each(function() {
        $('.wrapper_pdp').append($(this).children('img').clone().addClass('pdp_img_session_' + $(this).index()).removeAttr('width').hide());
        pdp_history[$(this).index()] = JSON.stringify(canvas);
    });

    ////////////////////////No Group////////////////////////////////////
    //canvas.selection = false;
    //}

    $('#edit_item_wrap').owlCarousel({
        items: 7, //10 items above 1000px browser width
        itemsDesktop: [1000, 7], //5 items between 1000px and 901px
        itemsDesktopSmall: [900, 4], // betweem 900px and 601px
        itemsTablet: [600, 2], //2 items between 600 and 0
        itemsMobile: [340, 1], // itemsMobile disabled - inherit from itemsTablet option
        lazyLoad: true,
        navigation: true,
        navigationText: ["&#xf053;", "&#xf054;"],
    });

    $('.pdp_color_list ul').owlCarousel({
        items: 12, //10 items above 1000px browser width
        itemsDesktop: [1000, 7], //5 items between 1000px and 901px
        itemsDesktopSmall: [900, 4], // betweem 900px and 601px
        itemsTablet: [600, 2], //2 items between 600 and 0
        itemsMobile: [340, 1], // itemsMobile disabled - inherit from itemsTablet option
        lazyLoad: true,
        navigation: true,
        navigationText: ["&#xf053;", "&#xf054;"],
    });

    $('#select_font').owlCarousel({
        items: 10, //10 items above 1000px browser width
        itemsDesktop: [1000, 7], //5 items between 1000px and 901px
        itemsDesktopSmall: [900, 4], // betweem 900px and 601px
        itemsTablet: [600, 2], //2 items between 600 and 0
        itemsMobile: [340, 1], // itemsMobile disabled - inherit from itemsTablet option
        lazyLoad: true,
        navigation: true,
        navigationText: ["&#xf053;", "&#xf054;"],
    });

    $('.add_artwork > a').on('click', function() {
        $('.tab_content:not(#select_image)').slideUp(200);
        $('#select_image').slideToggle(600);
    });

    $('.add_text > a').on('click', function() {
        $('#add_text').slideToggle(600);
        $('#font_outline_colorpicker').hide();
        $('.tab_content:not(#add_text), .pdp_extra_item').slideUp(200);
        $('.pdp_text_list li.active').removeClass("active");
    });

    $('.pdp_close').click(function() {
        $(this).parent().parent().parent().slideUp(600);
    });

    $('.pdp_text_list ul li').click(function() {
        $('.pdp_text_list ul li.active').removeClass("active");
        $('#add_text_input').val($(this).text());
        $(this).addClass("active");
    });

    $('.pdp_text_list ul li.active').click(function() {
        $('#add_text_action').click();
    });

    $('#pdp_side_items li').click(function() {
        canvasEvents.save_design($('#pdp_side_items li.active').index(), $('#main_image').width(), $('#main_image').height());
        $('#pdp_side_items li.active').removeClass("active");
        $(this).addClass("active");
        var tab = $(this).attr("tab"),
                tab_current = $('#wrap_inlay').attr('tab'),
                tab_index = $('#pdp_side_items li[tab=' + tab_current + ']').index();
        if ($('.product-image.act .wrap_inlay_center').attr("tab") != tab) {
            $('.product-image.act .wrap_inlay_center').attr("tab", tab);
            $('#wrap_inlay').attr('tab', tab);
            pdp_history[tab_index] = JSON.stringify(canvas);
            canvasEvents.reset_canvas(tab);
            //canvasEvents.clearSelected();
        }
    });

    $('#rotate-180').click(function() {
        $('#pdp_rotate_item').slideToggle(400);
        $('.tab_content:not(#pdp_rotate_item)').slideUp(300);
    });
    ///////////////////////////////Text tab///////////////////////////

    $('#pdp_edit_text_tab a').click(function() {
        $('#pdp_edit_text_tab a.active').removeClass("active");
        $(this).addClass('active');
        $('.pdp_edit_text_tab_content').slideUp(300);
        $('#' + $(this).attr("tab")).slideDown(400);
    });

    $('.pdp_edit_font_style li a.text').click(function() {
        $(this).toggleClass("active");
        canvasEvents.editText();
    });

    $('#pdp_search_text').keyup(function() {
        var key = $(this).val().toUpperCase();
        $('.pdp_text_list li').each(function() {
            if ($(this).text().toUpperCase().indexOf(key) >= 0) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $('#pdp_edit_text_style li a.align').click(function() {
        $('#pdp_edit_text_style li a.align.active').removeClass("active");
        $(this).addClass("active");
        canvasEvents.editText();
    });

    $('#pdp_font_size_input').bind("slider:changed", function(event, data) {
        $('#pdp_font_size_value').html($(this).val() + 'px');
        var activeObject = canvas.getActiveObject();
        if (!activeObject)
            return;
        canvasEvents.editText();
    });

    $('.wrapper_pdp .product-image').click(function() {
        $('.wrapper_pdp .product-image.act').removeClass('act');
        $(this).addClass('act');
    });

    $('.tshirt-size input').change(function() {
        if (($(this).val() == '') || ($(this).val() < 0)) {
            $(this).val(0)
        }
        ;
        $(this).val(parseInt($(this).val()));
    });

    $('#design_control .control_tab .tab_main').click(function() {
        var a = $(this).attr("tab");
        $('#design_control .control_tab .tab_main.active').removeClass("active");
        $(this).addClass("active");
        $('.tab_content').hide();
        $('.' + a).show()
    });

    $('.tab_design_image a').click(function() {
        $('.tab_design_image .active').removeClass("active");
        $(this).addClass("active");
        var tab_act = $(this).attr("tab-content");
        $('.content_tab > div').hide();
        $('.content_tab .' + tab_act).show();
    });

    //updat inlay option
    update_inlay_option();

    $('#toolbox-phone-select').change(function() {
        var a = $(this).val(),
                ip_id = $(this).find("option:selected").attr("ip_id");
        $('#ip_id').val(ip_id);
        update_inlay_option();
        $('#main_image').attr("src", m + 'media/pdp/images/' + a)
    });

    $('#add_text_action').click(function() {
        var text1 = $('#add_text_input').val(),
                text2 = $('.pdp_text_list li.active').text();
        if (text2 != '') {
            canvasEvents.addText(text2);
        } else {
            if (text1 != '') {
                canvasEvents.addText(text1);
            }
        }
    });
    $('#use_shadow', '#shadow_item').click(function() {
        // $('#use_shadow','#shadow_item').click(function() {
        if (!$(this).hasClass('active')) {
            $('.font_outline_color > div').show();
            canvasEvents.addShadowItem();
            $(this).addClass("active");
        } else {
            $('.font_outline_color > div:not(.use_shadow)').hide();
            canvasEvents.removeShadow();
            $(this).removeClass("active");
        }
        $('#font_outline_colorpicker').hide();
    });

    $('.tshirt-size .next_t').click(function() {
        var a = $(this).parent().children('.size_qty').val();
        $(this).parent().children('.size_qty').val(parseInt(a) + 1);
    });

    $('.tshirt-size .prev_t').click(function() {
        var a = $(this).parent().children('.size_qty').val();
        if (a > 0) {
            $(this).parent().children('.size_qty').val(parseInt(a) - 1);
        }
    });

    $('.change_font .next_t').click(function() {
        var a = $(this).prev().val();
        $(this).prev().val(parseInt(a) + 1);
        canvasEvents.editText();
    });

    $('.change_font .prev_t').click(function() {
        var a = $(this).next().val();
        if (($(this).next().attr("id") == 't-blur') && (a == 0)) {
        } else {
            if (($(this).next().attr("id") == 'select_font_size') && (a < 3)) {
            } else {
                $(this).next().val(parseInt(a) - 1);
            }
        }
        canvasEvents.editText();
    });

    $('#pdp_edit_text_input').keyup(function() {
        canvasEvents.editText();
    });

    $('#image_category_list, #select_image').show();

    var h_cate_list = $('#image_category_list').height();

    $('#image_category_list, #select_image').hide();

    $('.design_label span').click(function() {
        $('#image_category_list').slideToggle(600);
    });

    $('#image_category_list').hover(function() {
        $(this).stop(true, false).animate({'height': h_cate_list}, 600);
    }, function() {
        $(this).stop(true, false).animate({'height': '0px'}, 600, function() {
            $(this).height(h_cate_list).hide();
        });
    });
    ////////////////////////////Change color function ///////////////////////////////
    function rgb2hex(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2);
    }
    $('#font_color_div1, #font_outline_color1, #color_item1').click(function() {
        $(this).addClass("pdp_cr_color");
        $('.color_content').show();
        $('.color_display, .color_content li a.act').removeClass("act");
        $(this).find('.color_display').addClass("act");
        var current_color = $(this).find('.color_display').css("background-color");
        $('.color_content li a').each(function() {
            if ($(this).css('background-color') == current_color) {
                $(this).addClass("act");
                $('#selected_color').val(rgb2hex(current_color));
                $('a.selected_color').css("background-color", current_color);
            }
        });
    });

    $('#font_outline_color').click(function() {
        $('#font_outline_colorpicker').slideToggle(300);
    });

    $('.inlay_div.color, .color_content_wrap .bt_done').click(function() {
        $('.color_content').hide();
        $('#pdp_color_text').removeClass('pdp_cr_color');
        $('.color_display').removeClass("act");
    });

    $('#pdp_color_text li a').click(function() {
        $('#pdp_color_text li a.active').removeClass("active");
        $(this).addClass("active");
        var color = $(this).css("background-color");
        canvasEvents.changeColor(color);

    });

    $('#pdp_color_item li a').click(function() {
        $('#pdp_color_item li a.active').removeClass("active");
        $(this).addClass("active");
        var color = $(this).css("background-color");
        canvasEvents.changeColor(color);
    });

    $('.color_content li a:not(.selected_color, .bt_done)').click(function() {
        $('.color_content li a.act').removeClass("act");
        $(this).addClass("act");
        var color;
        if ($(this).hasClass("pdp_color_ori")) {
            color = 'ori';
            $('#selected_color').val('');
            $('.color_display.act').css('background-color', '#FFF');
        } else {
            color = $(this).css("background-color");
            $('#selected_color').val(rgb2hex(color));
            $('.color_display.act').css('background-color', color);
        }
        $('a.selected_color').css("background-color", color);
        var activeObject = canvas.getActiveObject();
        if (!activeObject)
            return;
        if ($('#pdp_color_text').hasClass('pdp_cr_color')) {
            $('#pdp_color_text input').val('#' + rgb2hex(color));
        }
        if (activeObject.text) {
            canvasEvents.editText();
        }
        if ($('#use_shadow').hasClass("active")) {
            canvasEvents.editShadowItem();
        }
        if ($('#color_item').hasClass("active")) {
            canvasEvents.changeColor(color);
        }
    });

    $('#selected_color').change(function() {
        $('a.selected_color').css('background-color', '#' + $(this).val());
    });
    ////////////////////////////Change font color ///////////////////////////////

    $('#select_font li').each(function() {
        $(this).css('font-family', $(this).attr("rel"))
    });

    $('#select_font li').click(function() {
        $('#select_font li.active').removeClass("active");
        $(this).addClass("active");
        //$('#select_font_span').css("font-family", $(this).attr("rel")).html($(this).attr("rel"));
        canvasEvents.editText();
    });

    /////////////////////////////////Add item to canvas///////////////////////////////
    $('#icon_list, #lists_img_upload, #photos_album').on('click', 'img', function() {
        var url = $(this).attr("src"),
                type_img = url.split('.'),
                wimg = $(this).width(),
                himg = $(this).height();
        //canvasEvents.clearSelected();
        $('#design_control .tab_content').slideUp(200);
        //$('#select_image').slideToggle(600);
        if ((type_img[type_img.length - 1] != 'svg')) {
            fabric.Image.fromURL(url, function(image) {
                image.set({
                    left: 0,
                    top: 0,
                    angle: 0,
                    width: wimg,
                    height: himg,
                    padding: setting.padding
                });
                image.transparentCorners = true;
                image.cornerSize = 10;
                image.scale(1).setCoords();
                canvas.add(image).setActiveObject(image);
                canvasEvents.centerX();
                canvasEvents.centerY();
                //pdp_history.push(JSON.stringify(canvas));
            });
        } else {
            canvasEvents.addSvg(url);
        }
    });

    $(".add-to-cartfefeefef .btn-cart").click(function() {
        return false
    });

    $("#undo, #redo, #clear222").click(function() {
        // undone[this.className]();
        $.undone(this.id);
    });

    $(document).keydown(function(e) {
        var key = e.which;
        if (e.ctrlKey) { // ctrl
            if (key === 90)
                $.undone("undo"); // z
            if (key === 89)
                $.undone("redo"); // y
        }
    });

    $(window).on("undone:change", function(e, name, undoLen, redoLen) {
        $("#undo").prop("disabled", !undoLen);
        $("#redo").prop("disabled", !redoLen);
        //$("input").val(undoLen)
    });

    /*Save Design*/
    $('#save_design').click(function() {
        //canvasEvents.save_design_json();
        canvasEvents.saveCustomImage();
    });

    jQuery('.pdp_add_to_cart').on('click', function() {
        canvasEvents.save_design($('#pdp_side_items li.active').index(), $('#main_image').width(), $('#main_image').height());
        $('#pdp_popup').hide();

        // save image
        canvasEvents.saveCustomImage();

        jQuery('.product-img-box').show();
        jQuery('.product-image').show();

        var img_bg = m + 'media/pdp/images/' + $('#pdp_side_items li.active').attr('side_img');
        canvas.setBackgroundImage(img_bg, canvas.renderAll.bind(canvas));

        jQuery('.product-image img').attr('src', canvas.toDataURL('png'));
        //window.location = m + 'index.php/checkout/cart/';
    });

    function saveCustomerDesign(design) {
        //Check customer logged in or not
        var customerId = $("#customer_id").val();
        if (customerId == "") {
            alert("Not done yet");
            return false;
            if (confirm("Please login to save your design!")) {
                console.log("Redirect");
                $.ajax({
                    url: m + 'index.php/pdp/pdptemplate/savesession',
                    type: 'POST',
                    data: {
                        design: design
                    },
                    beforeSend: function() {
                        $('.pdploading').show()
                    },
                    success: function(a) {
                        $('.pdploading').hide();
                        if (a == "") {
                            window.location = m + 'index.php/customer/account/login/';
                        } else {
                            alert(a);
                        }
                    }
                });
            }
            return false;
        }

        var editid = $('#wid').val();

        $.ajax({
            url: m + 'index.php/pdp/pdptemplate/save',
            type: 'POST',
            data: {
                design: design,
                id: editid
            },
            beforeSend: function() {
                $('.pdploading').show()
            },
            success: function(a) {
                $('.pdploading').hide();
                if (a == "") {
                    window.location = m + 'index.php/pdp/pdptemplate/view/';
                } else {
                    //alert(a);
                    //window.location = m + 'index.php/customer/account/login/';
                    console.log(a);
                }
            }
        });
    }
    /** End save design */
    $('#files_upload').hover(function() {
        if (!$(this).hasClass("active")) {
            document.getElementById('files_upload').addEventListener('change', handleFileSelect, false);
            $(this).addClass("active")
        }
    });

    function update_inlay_option() {
        console.log('up_inlay_option...........');
        var a = $('#ip_id').val(),
                inlay_w = $('#width' + a).val(),
                inlay_h = $('#height' + a).val(),
                inlay_t = $('#top' + a).val(),
                inlay_l = $('#left' + a).val();
        $('#wrap_inlay_front').css({
            "left": inlay_l + "px",
            "top": inlay_t + "px",
            "width": inlay_w,
            "height": inlay_h
        })
    }
    ;

    function handleFileSelect(d) {
        var g = d.target.files;
        for (var i = 0, f; f = g[i]; i++) {
            if (!f.type.match('image.*')) {
                continue
            }
            var h = new FileReader();
            h.onload = (function(c) {
                return function(e) {
                    var a = $('#lists_img_upload span').length;
                    var b = document.createElement('span');
                    b.innerHTML = ['<img id="img_up_' + a++ + '" color="" class="thumb pdp_img_upload" src="', e.target.result, '" title="', escape(c.name), '"/>'].join('');
                    document.getElementById('lists_img_upload').insertBefore(b, null)
                }
            })(f);
            h.readAsDataURL(f)
        }
        $('#files_upload').val("")
    }

    $('#lists_img_upload2').hover(function() {
        var a = 0;
        $('#lists_img_upload span img').each(function() {
            a++;
            $(this).attr("id", 'img_upload_' + a).attr("color", "")
        })
    });
    /////////////////////////////// Edit active item/group //////////////////////////////////////
    var canvasEvents = {
        objectSelected: function() {
            var activeObject = canvas.getActiveObject();
            if (activeObject.text) {
                canvasEvents.changeToEditText(activeObject);
            } else {
                //canvasEvents.resetTextForm();
                canvasEvents.changeToEditItem();
            } //
            //Show something
            $('#edit_item_wrap').addClass('active');
            $('#edit_item_wrap > div').css('opacity', 1);
        },
        removeShadow: function() {
            var activeObject = canvas.getActiveObject();
            if (!activeObject)
                return;
            activeObject.setShadow('none');
            canvasEvents.resetShadowForm();
            canvasEvents.renderall();
        },
        resetShadowForm: function() {
            $('#use_shadow').removeClass("active");
            $('#h-shadow').val(0);
            $('#v-shadow').val(0);
            $('#t-blur').val(0);
            $('#font_outline_color_value').css({"background-color": '#FFF', 'color': '#000'}).val('#FFFFFF');
            $('.font_outline_color > div:not(.use_shadow)').hide();
        },
        addShadowItem: function() {
            var activeObject = canvas.getActiveObject();
            if (!activeObject)
                return;
            setting_shadow = {
                h_shadow: $('#h-shadow').val(),
                v_shadow: $('#v-shadow').val(),
                blur: $('#t-blur').val(),
                color: $('#font_outline_color_value').val()
            }
            activeObject.setShadow({
                color: setting_shadow.color,
                blur: setting_shadow.blur,
                offsetX: setting_shadow.v_shadow,
                offsetY: setting_shadow.h_shadow
            });
            canvasEvents.renderall();
        },
        renderall: function() {
            canvasEvents.save_history();
            canvasEvents.save_design2();
            canvas.calcOffset().renderAll();
        },
        reset_canvas: function(tab) {
            var item_act = $('#pdp_side_items li[tab=' + tab + ']'),
                    item_img,
                    tab_index = $('#pdp_side_items li[tab=' + tab + ']').index(),
                    item_inlay;
            if (item_act.length > 0) {
                item_img = m + 'media/pdp/images/' + item_act.attr('side_img');
                if (item_img != '') {
                    $('#main_image').attr("src", item_img);
                    item_inlay = item_act.attr('inlay').split(',');
                    $('#wrap_inlay').html('<canvas id="canvas_area"></canvas>');
                    $('#wrap_inlay').css({
                        'width': item_inlay[0] + 'px',
                        'height': item_inlay[1] + 'px',
                        'top': item_inlay[2] + 'px',
                        'left': item_inlay[3] + 'px',
                    });
                    $('#canvas_area').attr({
                        'width': item_inlay[0],
                        'height': item_inlay[1]
                    });
                    canvas = new fabric.Canvas('canvas_area', {});
                    canvas.clear();
                    canvas.observe('object:selected', canvasEvents.objectSelected);
                    canvas.observe('object:modified', canvasEvents.save_design2);
                    canvas.observe('object:added', canvasEvents.save_design2);
                    canvas.observe('before:selection:cleared', canvasEvents.objectUnselected);
                    canvasEvents.load_json(pdp_history[tab_index]);
                    canvasEvents.centerCanvas();
                    canvasEvents.renderall();
                }
            }
        },
        save_history: function() {
            var index = $('#pdp_side_items li.active').index();
            pdp_history[index] = JSON.stringify(canvas);
        },
        editShadowItem: function() {
            var activeObject = canvas.getActiveObject();
            if (!activeObject)
                return;
            var shadow = activeObject.get("shadow");
            if ((shadow != null) && (shadow.color != 'none')) {
                setting_shadow = {
                    h_shadow: $('#h-shadow').val(),
                    v_shadow: $('#v-shadow').val(),
                    blur: $('#t-blur').val(),
                    color: $('#font_outline_color_value').val()
                }
                activeObject.setShadow({
                    color: setting_shadow.color,
                    blur: setting_shadow.blur,
                    offsetX: setting_shadow.v_shadow,
                    offsetY: setting_shadow.h_shadow
                });
            } else {
                canvasEvents.resetShadowForm();
            }
            canvasEvents.renderall();
        },
        changeToEditItem: function() {
            var activeObject = canvas.getActiveObject();
            if (!activeObject)
                return;
            $('#color_item').show();
            $('#edit_text, #pdp_edit_text, #font_outline_colorpicker').hide();
            var opacity = activeObject.get('opacity');
            $('#pdp_opacity_input').val(opacity * 10);
            var shadow = activeObject.get('shadow');
            if ((shadow == null) || (shadow.color == 'none')) {
                canvasEvents.resetShadowForm();
            } else {
                $('.font_outline_color > div:not(.use_shadow)').show();
                $('#h-shadow').val(shadow.offsetY);
                $('#v-shadow').val(shadow.offsetX);
                $('#t-blur').val(shadow.blur);
                $('#font_outline_color_value').val(shadow.color).css('background-color', shadow.color);
                $('#use_shadow').addClass('active');
            }
        },
        editText: function() {
            var activeObject = canvas.getActiveObject();
            if (!activeObject)
                return;
            if (!activeObject.text)
                return;
            if ($('#pdp_edit_text_input').val() != '') {
                activeObject.setText($('#pdp_edit_text_input').val());
            } else {
                canvas.remove(activeObject);
            }
            $('#edit_item_wrap, #edit_text').show();
            $('#font_outline_colorpicker').hide();
            var color = $('#pdp_color_text li a.active').css('background-color'),
                    font_family = $('#select_font li.active').attr("rel"),
                    line_height = $('#pdp_edit_text_line_height_input').val() / 10,
                    font_weight,
                    font_style,
                    text_align,
                    font_size = $('#pdp_font_size_input').val(),
                    text_deco = '';
            if ($('.pdp_edit_font_style .bold').hasClass("active")) {
                font_weight = 'bold';
            } else {
                font_weight = '';
            }
            if ($('.pdp_edit_font_style .italic').hasClass("active")) {
                font_style = 'italic';
            } else {
                font_style = '';
            }
            if ($('.pdp_edit_font_style .underline').hasClass("active")) {
                text_deco += ' underline ';
            }
            if ($('.pdp_edit_font_style .overline').hasClass("active")) {
                text_deco += ' overline ';
            }
            if ($('.pdp_edit_font_style .line-through').hasClass("active")) {
                text_deco += ' line-through ';
            }
            if ($('#pdp_edit_text_style .align.align_left').hasClass("active")) {
                text_align = 'left';
            }
            if ($('#pdp_edit_text_style .align.align_right').hasClass("active")) {
                text_align = 'right';
            }
            if ($('#pdp_edit_text_style .align.align_center').hasClass("active")) {
                text_align = 'center';
            }
            activeObject.set({
                'fill': color,
                fontSize: font_size,
                fontStyle: font_style,
                fontWeight: font_weight,
                textDecoration: text_deco,
                fontFamily: font_family,
                lineHeight: line_height,
                textAlign: text_align
            });
            if ($('#use_shadow').hasClass('active')) {
                setting_shadow = {
                    h_shadow: $('#h-shadow').val(),
                    v_shadow: $('#v-shadow').val(),
                    blur: $('#t-blur').val(),
                    color: $('#font_outline_color_value').val()
                }
                activeObject.setShadow({
                    color: setting_shadow.color,
                    blur: setting_shadow.blur,
                    offsetX: setting_shadow.v_shadow,
                    offsetY: setting_shadow.h_shadow
                });
            } else {
                canvasEvents.resetShadowForm();
                activeObject.setShadow('none');
            }
            canvasEvents.renderall();
        },
        addText: function(text) {
            $('#add_text').slideUp(300);
            $('#add_text_input').val('');
            var color = '#111',
                    font_family = 'Arial',
                    font_weight, font_style,
                    text_deco = '';
            var center = canvas.getCenter(),
                    textObj = new fabric.Text(text, {
                        fontFamily: font_family,
                        left: center.left,
                        top: center.top,
                        fontSize: 20,
                        textAlign: "left",
                        fill: color,
                        lineHeight: '1.3',
                        fontStyle: "", //"", "normal", "italic" or "oblique"
                        fontWeight: "normal", //bold, normal, 400, 600, 800
                        textDecoration: "", //"", "underline", "overline" or "line-through"
                        shadow: '', //2px 2px 2px #fff
                        padding: setting.padding
                    });
            textObj.lockUniScaling = false;
            textObj.hasRotatingPoint = true;
            textObj.transparentCorners = true;
            textObj.cornerColor = setting.border;
            canvas.add(textObj).setActiveObject(textObj);
            canvasEvents.centerX();
            canvasEvents.centerY();
            canvasEvents.renderall();
        },
        changeToEditText: function(a) {
            $('#edit_text').show();
            $('#edit_item_wrap').addClass('active');
            $('#edit_item_wrap > div').css('opacity', 1);
            //$('.design_control .add_text').click();
            $('#color_item, #pdp_color_fill, #font_outline_colorpicker').hide();
            if (!a)
                return false;
            $('#pdp_edit_text_input').val(a.getText());
            var font_family = a.get('fontFamily'),
                    font_size = a.get('fontSize'),
                    text_deco = a.get('textDecoration'),
                    font_style = a.get('fontStyle'),
                    text_align = a.get('textAlign'),
                    font_weight = a.get('fontWeight'),
                    color = a.get('fill'),
                    line_height = a.get('lineHeight'),
                    shadow = a.get('shadow');
            if ((shadow != '') && (shadow.color != 'none')) {
                $('.font_outline_color > div').show();
                $('#use_shadow').addClass("active");
                $('#h-shadow').val(shadow.offsetY);
                $('#v-shadow').val(shadow.offsetX);
                $('#t-blur').val(shadow.blur);
                $('#font_outline_color_value').val(shadow.color).css('background-color', shadow.color);
            } else {
                canvasEvents.resetShadowForm();
            }
            $('.pdp_edit_font_style a, #pdp_edit_text_style a').removeClass("active");
            $('#pdp_font_size_value').html(font_size + 'px');
            if (text_align == 'right') {
                $('#pdp_edit_text_style .align_right').addClass("active");
            } else {
                if (text_align == 'center') {
                    $('#pdp_edit_text_style .align_center').addClass("active");
                } else {
                    $('#pdp_edit_text_style .align_left').addClass("active");
                }
            }

            if (font_weight == 'bold') {
                $('.pdp_edit_font_style .bold').addClass("active");
            }
            if (font_style == 'italic') {
                $('.pdp_edit_font_style .italic').addClass("active");
            }
            if (text_deco.indexOf('underline') > 0) {
                $('.pdp_edit_font_style .underline').addClass("active");
            }
            if (text_deco.indexOf('overline') > 0) {
                $('.pdp_edit_font_style .overline').addClass("active");
            }
            if (text_deco.indexOf('line-through') > 0) {
                $('.pdp_edit_font_style .line-through').addClass("active");
            }
            $('#pdp_color_text li a.active').removeClass("active");
            if (color == '#111') {
                $('#pdp_color_text li:eq(0) a').addClass("active");
                //$('#pdp_color_text input').val('#111111');
            } else {
                $('#pdp_color_text li a').each(function() {
                    if ($(this).css('background-color') == color) {
                        $(this).addClass("active");
                    }
                });
                //$('#pdp_color_text input').val('#'+rgb2hex(color));
            }
            $('#pdp_color_text_input').css('background-color', color);
            $('#select_font li').removeClass("active");
            $('#select_font li[rel=' + font_family + ']').addClass("active");
            //$('#select_font_span').html(font_family);
            $('#pdp_edit_text_line_height_input').val(line_height * 10);
            $('#pdp_font_size_input').val(font_size);
        },
        addSvg: function(el) {
            fabric.loadSVGFromURL(el, function(objects, options) {
                var loadedObject = fabric.util.groupSVGElements(objects, options),
                        center = canvas.getCenter();
                loadedObject.set({
                    left: center.left,
                    top: center.top,
                    fill: setting.color,
                    transparentCorners: true,
                    padding: setting.padding
                });
                loadedObject.setCoords();
                loadedObject.hasRotatingPoint = true;
                loadedObject.lockUniScaling = true;
                canvas.add(loadedObject).setActiveObject(loadedObject);
                canvasEvents.centerX();
                canvasEvents.centerY();
            });
        },
        resetTextForm: function() {
            $('#pdp_font_size_input').val(20);
            $('#pdp_font_size_value').html('20px');
            $('#pdp_edit_text_line_height_input').val(13);
            $('#use_shadow').attr("checked", false);
            //$('.font_shape .h-shadow,.font_shape .v-shadow, .font_shape .blur, .font_shape .color').hide();
            $('#add_text_action').show();
            $("#edit_text_action, #edit_text, .pdp_edit_text_tab_content").hide();
            $('#add_text_input').val("");
            $('#select_font_span').html("Arial").css("font-family", "Arial");
            //$('#select_font_size').val("20");
            $('#pdp_edit_text_tab_content').show();
            //$('#h-shadow, #v-shadow, #t-blur').val(0);
            //$('#font_color_div > div').css("backgroundColor", "#444");
            $('#pdp_color_text input').val('#111111');
            //$('#pdp_color_text #pdp_color_text_input').css('background-color','#111');
            //$('#font_outline_color > div').css("backgroundColor", "#fff");
            $('#font_outline_colorpicker').setColor('#FFFFFF');
            $('#pdp_edit_text .active, #pdp_edit_text_style .active').removeClass("active");
            $('#pdp_edit_text_tab a:eq(0),#pdp_edit_text_style .align_left').addClass('active');
            $('#select_font li').removeClass("active");
            $('#select_font li:eq(0)').addClass("active");
        },
        objectUnselected: function() {
            //canvasEvents.resetTextForm();
            $('.pdp_extra_item, .tab_content, #font_outline_colorpicker').slideUp(400);
            $('#edit_item_wrap .active').removeClass('active');
            $('#edit_item_wrap').removeClass('active');
            $('#edit_item_wrap > div').css('opacity', .5);
        },
        clearSelected: function() {
            this.objectUnselected();
            canvas.deactivateAll().renderAll();
            canvasEvents.renderall();
        },
        centerX: function() {
            var active = canvas.getActiveObject();
            if (!active)
                return;
            canvas.centerObjectH(active);
            active.setCoords();
            canvasEvents.renderall();
        },
        centerY: function() {
            var active = canvas.getActiveObject();
            if (!active)
                return;
            canvas.centerObjectV(active);
            active.setCoords();
            canvasEvents.renderall();
        },
        rotateRight: function(canvas) {
            var active = canvas.getActiveObject();
            if (!active)
                return;
            var angle = active.get('angle');
            active.rotate(angle + 45);
            active.setCoords();
            canvasEvents.renderall();
        },
        rotateLeft: function(canvas) {
            var active = canvas.getActiveObject();
            if (!active)
                return;
            var angle = active.get('angle');
            active.rotate(angle - 45);
            active.setCoords();
            canvasEvents.renderall();
        },
        flipX: function() {
            var active = canvas.getActiveObject();
            if (!active)
                return;
            active.flipX = active.flipX ? false : true;
            active.setCoords();
            canvasEvents.renderall();
        },
        flipY: function() {
            var active = canvas.getActiveObject();
            if (!active)
                return;
            active.flipY = active.flipY ? false : true;
            active.setCoords();
            canvasEvents.renderall();
        },
        load_json: function(objs) {
            var json = JSON.parse(objs);
            var objects = json.objects;
            canvas.clear();
            for (var i = 0; i < objects.length; i++) {
                var klass = fabric.util.getKlass(objects[i].type);
                if (klass.async) {
                    klass.fromObject(objects[i], function(img) {
                        canvas.add(img);
                    });
                } else {
                    canvas.add(klass.fromObject(objects[i]));
                }
            }
        },
        copyObject: function() {
            var active = canvas.getActiveObject();
            if (!active)
                return;
            if (fabric.util.getKlass(active.type).async) {
                active.clone(function(clone) {
                    clone.set({
                        transparentCorners: true,
                        cornerColor: setting.border
                    })
                    canvas.add(clone);
                });
            } else {
                canvas.add(active.clone().set({
                    transparentCorners: true,
                    cornerColor: setting.border
                }));
            }
            canvasEvents.renderall();
        },
        removeObject: function() {
            var active = canvas.getActiveObject();
            if (active) {
                canvas.remove(active);
                canvasEvents.renderall();
            }
        },
        moveObject: function(direction) {
            var active = canvas.getActiveObject();
            if (active) {
                if (direction == 'up') {
                    active.setTop(active.getTop() - 1).setCoords();
                    canvasEvents.renderall();
                } else if (direction == 'down') {
                    active.setTop(active.getTop() + 1).setCoords();
                    canvasEvents.renderall();
                } else if (direction == 'left') {
                    active.setLeft(active.getLeft() - 1).setCoords();
                    canvasEvents.renderall();
                } else if (direction == 'right') {
                    active.setLeft(active.getLeft() + 1).setCoords();
                    canvasEvents.renderall();
                }
            }
        },
        applyFilter: function(index, filter) {
            var obj = canvas.getActiveObject();
            obj.filters[index] = filter;
            obj.applyFilters(canvas.renderAll.bind(canvas));
        },
        changeColor: function(color) {
            var activeObject = canvas.getActiveObject();
            if (!activeObject)
                return;
            if ((activeObject.text) || (activeObject.type == 'path')) {
                if (color == 'transparent') {
                    activeObject.set("fill", '#FFF');
                } else {
                    activeObject.set("fill", color);
                }
            } else {
                if (color == 'transparent') {
                    canvasEvents.applyFilter(12, false);
                } else {
                    filters = new fabric.Image.filters.Tint({
                        color: color
                    });
                    canvasEvents.applyFilter(12, filters);
                }
            }
            canvasEvents.renderall();
        },
        convert_svg: function(img_bg, inlay, index) {
            if (!fabric.Canvas.supports('toDataURL')) {
                alert('This browser doesn\'t provide means to serialize canvas to an image');
            } else {
                img_bg = $('#main_image').attr('src');
                inlay = '247,384,81,136,513,490';
                //window.open(canvas.toDataURL('png'));
                canvasEvents.clearSelected();
                var inlay_info = inlay.split(',');
                //canvas_f.item(0).setVisible(0);
                $('#pdp_result_2').html('<canvas id="canvas_export_2"></canvas>');
                $('#canvas_export_2').attr({
                    'width': inlay_info[0],
                    'height': inlay_info[1]
                });
                var canvas_export_2 = new fabric.Canvas('canvas_export_2', {
                    opacity: 1
                });
                var json = JSON.parse(pdp_history[index]);
                var objects = json.objects;
                //console.log(pdp_history[index]);
                for (var i = 0; i < objects.length; i++) {
                    var klass = fabric.util.getKlass(objects[i].type);
                    if (klass.async) {
                        klass.fromObject(objects[i], function(img) {
                            canvas_export_2.add(img);
                        });
                    } else {
                        canvas_export_2.add(klass.fromObject(objects[i]));
                    }
                }
                ;
                canvas_export_2.renderAll();
                $('#pdp_canvas_result').html('<canvas id="canvas_export"></canvas>');
                $('#canvas_export').attr({
                    'width': inlay_info[4],
                    'height': inlay_info[5]
                });
                var canvas_export = new fabric.Canvas('canvas_export', {opacity: 1});
                canvas_export.setBackgroundImage(img_bg, canvas_export.renderAll.bind(canvas_export));
                fabric.Image.fromURL(canvas_export_2.toDataURL('png'), function(image) {
                    image.set({
                        //left: canvas_export_info.left_f,
                        //top: canvas_export_info.top_f,
                        left: 136, //inlay_info[2],
                        top: 81, //inlay_info[3],
                        width: inlay_info[0],
                        height: inlay_info[1],
                        angle: 0,
                        selectable: false
                    });
                    image.transparentCorners = true;
                    image.cornerSize = 10;
                    image.scale(1).setCoords();
                    canvas_export.add(image);
                });
                canvas_export.renderAll();
                //imageObj.src = canvas_f.toDataURL('png');
                $('#pdp_result').animate({'opacity': 1}, 600, function() {
                    //$('#pdp_side_items li:eq('+index+')').children('img').attr('src',canvas_export.toDataURL('png'));
                    $('#pdp_result').append('<img width="120" src="' + canvas_export_2.toDataURL('png') + '">');
                });
                //return canvas_export.toDataURL('png');
                //canvas_f.item(0).setVisible(1);
                //canvas_b.item(0).setVisible(1);
            }
        },
        save_png: function(img_bg, inlay, index) {
            if (!fabric.Canvas.supports('toDataURL')) {
                alert('This browser doesn\'t provide means to serialize canvas to an image');
            } else {
                //img_bg = $('#main_image').attr('src');
                //inlay = '247,384,81,136,513,490';
                //window.open(canvas.toDataURL('png'));
                canvasEvents.clearSelected();
                var inlay_info = inlay.split(',');
                //canvas_f.item(0).setVisible(0);
                $('#pdp_result_2').html('<canvas id="canvas_export_2"></canvas>');
                $('#canvas_export_2').attr({
                    'width': inlay_info[0],
                    'height': inlay_info[1]
                });
                var canvas_export_2 = new fabric.Canvas('canvas_export_2', {
                    opacity: 1
                });
                var json = JSON.parse(pdp_history[index]);
                var objects = json.objects;
                //console.log(pdp_history[index]);
                for (var i = 0; i < objects.length; i++) {
                    var klass = fabric.util.getKlass(objects[i].type);
                    if (klass.async) {
                        klass.fromObject(objects[i], function(img) {
                            canvas_export_2.add(img);
                        });
                    } else {
                        canvas_export_2.add(klass.fromObject(objects[i]));
                    }
                }
                ;
                canvas_export_2.renderAll();
                $('#pdp_canvas_result').html('<canvas id="canvas_export"></canvas>');
                $('#canvas_export').attr({
                    'width': inlay_info[4],
                    'height': inlay_info[5]
                });
                var canvas_export = new fabric.Canvas('canvas_export', {opacity: 1});
                canvas_export.setBackgroundImage(img_bg, canvas_export.renderAll.bind(canvas_export));
                fabric.Image.fromURL(canvas_export_2.toDataURL('png'), function(image) {
                    image.set({
                        //left: canvas_export_info.left_f,
                        //top: canvas_export_info.top_f,
                        left: parseFloat(inlay_info[3]),
                        top: parseFloat(inlay_info[2]),
                        width: inlay_info[0],
                        height: inlay_info[1],
                        angle: 0,
                        selectable: false
                    });
                    image.transparentCorners = true;
                    image.cornerSize = 10;
                    image.scale(1).setCoords();
                    canvas_export.add(image);
                });
                canvas_export.renderAll();
                //imageObj.src = canvas_f.toDataURL('png');
                $('#pdp_result').animate({'opacity': 1}, 600, function() {
                    $('#pdp_side_items li:eq(' + index + ')').children('img').attr('src', canvas_export.toDataURL('png'));
                    //$('#pdp_result').append('<img width="120" src="' + canvas_export.toDataURL('png') + '">');
                });
            }
        },
        save_design2: function() {
            var info_save = '';
            canvasEvents.save_history();
            if (!fabric.Canvas.supports('toDataURL')) {
                alert('This browser doesn\'t provide means to serialize canvas to an image');
            } else {
                var img_bg = m + 'media/pdp/images/' + $('#pdp_side_items li.active').attr('side_img'),
                        inlay = $('#pdp_side_items li.active').attr('inlay'),
                        index = $('#pdp_side_items li.active').index();

//                console.log(img_bg);
//                console.log(inlay);
//                console.log(index);
//                window.open(canvas.toDataURL('png'));
                var inlay_info = inlay.split(',');
                $('#pdp_canvas_result').html('<canvas id="canvas_export"></canvas>');
                $('#canvas_export').attr({
                    'width': $('#main_image').width(),
                    'height': $('#main_image').height()
                });
                var canvas_export = new fabric.Canvas('canvas_export', {opacity: 1});
                canvas_export.setBackgroundImage(img_bg, canvas_export.renderAll.bind(canvas_export));
                fabric.Image.fromURL(canvas.toDataURL('png'), function(image) {
                    image.set({
                        left: parseFloat(inlay_info[3]),
                        top: parseFloat(inlay_info[2]),
                        width: inlay_info[0],
                        height: inlay_info[1],
                        angle: 0,
                        selectable: false
                    });
                    image.transparentCorners = true;
                    image.cornerSize = 10;
                    image.scale(1).setCoords();
                    canvas_export.add(image);
                });
                canvas_export.renderAll();
                $('#pdp_result').animate({'opacity': 1}, 600, function() {
                    $('#pdp_side_items li:eq(' + index + ')').children('img').attr('src', canvas_export.toDataURL('png'));
                    $('#pdp_result').html('');
                });
            }
        },
        save_design: function(index, w, h) {
            var info_save = '';
            canvasEvents.save_history();
            if (!fabric.Canvas.supports('toDataURL')) {
                alert('This browser doesn\'t provide means to serialize canvas to an image');
            } else {
                var img_bg = m + 'media/pdp/images/' + $('#pdp_side_items li:eq(' + index + ')').attr('side_img'),
                        inlay = $('#pdp_side_items li:eq(' + index + ')').attr('inlay');
                //window.open(canvas.toDataURL('png'));
                canvasEvents.clearSelected();
                var inlay_info = inlay.split(',');
                $('#pdp_canvas_result').html('<canvas id="canvas_export"></canvas>');
                $('#canvas_export').attr({
                    'width': w,
                    'height': h
                });
                var canvas_export = new fabric.Canvas('canvas_export', {opacity: 1});
                canvas_export.setBackgroundImage(img_bg, canvas_export.renderAll.bind(canvas_export));
                fabric.Image.fromURL(canvas.toDataURL('png'), function(image) {
                    image.set({
                        //left: canvas_export_info.left_f,
                        //top: canvas_export_info.top_f,
                        left: parseFloat(inlay_info[3]),
                        top: parseFloat(inlay_info[2]),
                        width: inlay_info[0],
                        height: inlay_info[1],
                        angle: 0,
                        selectable: false
                    });
                    image.transparentCorners = true;
                    image.cornerSize = 10;
                    image.scale(1).setCoords();
                    canvas_export.add(image);
                });
                canvas_export.renderAll();
                //imageObj.src = canvas_f.toDataURL('png');
                $('#pdp_result').animate({'opacity': 1}, 600, function() {
                    $('#pdp_side_items li:eq(' + index + ')').children('img').attr('src', canvas_export.toDataURL('png'));
                    $('#pdp_result').html('');
                    //$('#pdp_result').append('<img width="120" src="' + canvas_export.toDataURL('png') + '">');
                });
            }

        },
        save_design_json: function() {
            var string_json = '';
            $('#pdp_side_items li').each(function() {
                string_json += $(this).attr('side_img') + '╦' + pdp_history[$(this).index()] + 'ϣ';
            });
            return string_json;
        },
        saveSampleDesign: function() {
            $("#save_sample_design").click(function() {
                alert('save sample design .............');
                var jsonString = canvasEvents.save_design_json();
                $.ajax({
                    type: "POST",
                    url: $("#url_site").val() + "/pdp/view/saveSampleDesign",
                    data: {json_string: jsonString},
                    beforeSend: function() {

                    },
                    error: function() {
                        console.log("Something went wrong...!");
                    },
                    success: function(data) {
                        var jsonData = $.parseJSON(data);
                        if (jsonData.success) {
                            alert(jsonData.message);
                        }
                        if (jsonData.error) {
                            alert(jsonData.message);
                        }
                    }
                });
            });
        },
        centerCanvas: function() {
            var w_wrap = $('.wrapper_pdp').width(),
                    w_canvas = $('.wrap_inlay_center').width();
            $('.wrap_inlay_center').css("margin-left", (w_wrap - w_canvas) / 2 + 'px');
        },
        saveCustomImage: function() {
            canvasEvents.save_history();
            if (!fabric.Canvas.supports('toDataURL')) {
                alert('This browser doesn\'t provide means to serialize canvas to an image');
            } else {
                var img_bg = m + 'media/pdp/images/' + $('#pdp_side_items li.active').attr('side_img');
                //alert(img_bg);
                //canvas.setBackgroundImage(img_bg, canvas.renderAll.bind(canvas));
                //remove border, selection while saving
                canvas.deactivateAll().renderAll();
                console.log(canvas.toDataURL('png'));

                // save custom image
                jQuery.ajax({
                    type: 'POST',
                    url: $("#url_site").val() + "/pdp/view/saveCustomImage",
                    data: {img: canvas.toDataURL({format: 'png', quality: 1})},
                    success: function(response) {
                        return;
                        if (!response.success) {
                            alert('Error!');
                            return;
                        }
                    }
                });
            }
        }
    }

    canvasEvents.saveSampleDesign();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var $sendBackwardsEl = $('#send-backwards');
    $sendBackwardsEl.on('click', function(canvas) {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.sendBackwards(activeObject);
        }
    });
    var $sendToBackEl = $('#send-to-back');
    $sendToBackEl.on('click', function(canvas) {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.sendToBack(activeObject);
        }
    });
    var $bringForwardEl = $('#bring-forward');
    $bringForwardEl.on('click', function(canvas) {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.bringForward(activeObject);
        }
    });
    var $bringToFrontEl = $('#bring-to-front');
    $bringToFrontEl.on('click', function(canvas) {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.bringToFront(activeObject);
        }
    });
    //////////////////////////////////EDIT BOTTOM FUNCTION/////////////////////////////////////////////////////////////////
    $('#edit_item_wrap .item').click(function() {
        if ($('#edit_item_wrap').hasClass("active")) {
            $('#edit_item_wrap .item.active').removeClass("active");
            $(this).toggleClass("active");
            var tab_act = $(this).attr("tab");
            $('.pdp_extra_item:not(#' + tab_act + ')').slideUp(500);
            $('#' + tab_act).slideToggle(500);
        }
    });
    //////////////////////////////////EDIT FUNCTIONS/////////////////////////////////////////////////////////////////
    $('#move_item .m_tl').click(function() {
        var active = canvas.getActiveObject();
        if (!active)
            return;
        active.animate({
            'top': setting.padding + 2,
            'left': setting.padding + 2
        }, {
            duration: 500,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: ''
        });
    });
    $('#move_item .m_tr').click(function() {
        var active = canvas.getActiveObject(),
                w_act = active.getWidth(),
                w_cv = canvas.getWidth();
        if (!active)
            return;
        active.animate({
            'top': setting.padding + 2,
            'left': w_cv - w_act - setting.padding - 2
        }, {
            duration: 500,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: ''
        });
    });
    $('#move_item .m_bl').click(function() {
        var active = canvas.getActiveObject(),
                h_act = active.getHeight(),
                h_ch = canvas.getHeight();
        if (!active)
            return;
        active.animate({
            'top': h_ch - h_act - setting.padding - 2,
            'left': setting.padding + 2
        }, {
            duration: 500,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: ''
        });
    });
    $('#move_item .m_br').click(function() {
        var active = canvas.getActiveObject(),
                h_act = active.getHeight(),
                w_act = active.getWidth(),
                h_ch = canvas.getHeight(),
                w_cv = canvas.getWidth();
        if (!active)
            return;
        active.animate({
            'top': h_ch - h_act - setting.padding - 2,
            'left': w_cv - w_act - setting.padding - 2
        }, {
            duration: 500,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: ''
        });
    });
    $('#move_item .m_tc').click(function() {
        var active = canvas.getActiveObject(),
                h_act = active.getHeight(),
                w_act = active.getWidth(),
                h_ch = canvas.getHeight(),
                w_cv = canvas.getWidth();
        if (!active)
            return;
        active.animate({
            'top': setting.padding + 2,
            'left': (w_cv - w_act) / 2 - setting.padding / 2 - 1
        }, {
            duration: 500,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: ''
        });
    });
    $('#move_item .m_cr').click(function() {
        var active = canvas.getActiveObject(),
                h_act = active.getHeight(),
                w_act = active.getWidth(),
                h_ch = canvas.getHeight(),
                w_cv = canvas.getWidth();
        if (!active)
            return;
        active.animate({
            'top': (h_ch - h_act) / 2 - setting.padding / 2 - 1,
            'left': w_cv - w_act - setting.padding - 2
        }, {
            duration: 500,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: ''
        });
    });
    $('#move_item .m_cl').click(function() {
        var active = canvas.getActiveObject(),
                h_act = active.getHeight(),
                w_act = active.getWidth(),
                h_ch = canvas.getHeight(),
                w_cv = canvas.getWidth();
        if (!active)
            return;
        active.animate({
            'top': (h_ch - h_act) / 2 - setting.padding / 2 - 1,
            'left': setting.padding + 2
        }, {
            duration: 500,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: ''
        });
    });
    $('#move_item .m_bc').click(function() {
        var active = canvas.getActiveObject(),
                h_act = active.getHeight(),
                w_act = active.getWidth(),
                h_ch = canvas.getHeight(),
                w_cv = canvas.getWidth();
        if (!active)
            return;
        active.animate({
            'top': h_ch - h_act - setting.padding - 2,
            'left': (w_cv - w_act) / 2 - setting.padding / 2 - 1
        }, {
            duration: 500,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: ''
        });
    });
    $('#move_item .m_cc').click(function() {
        canvasEvents.center();
        //canvasEvents.centerX();
    });
    /*
     var $sendBackwardsEl = $('#send-backwards');
     $sendBackwardsEl.on('click', function() {
     var activeObject = canvas.getActiveObject();
     if (activeObject) {
     canvas.sendBackwards(activeObject);
     }
     });
     */
    var $sendToBackEl = $('#move_to_back');
    $sendToBackEl.on('click', function() {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.sendToBack(activeObject);
        }
    });
    var $bringForwardEl = $('#move_to_front');
    $bringForwardEl.on('click', function() {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.bringForward(activeObject);
        }
    });
    /*
     var $bringToFrontEl = $('#bring-to-front');
     $bringToFrontEl.on('click', function() {
     var activeObject = canvas.getActiveObject();
     if (activeObject) {
     canvas.bringToFront(activeObject);
     }
     });
     */
    //$('#centerX').on('click', canvasEvents.centerX);
    //$('#centerY').on('click', canvasEvents.centerY);
    $('#pdp_flip_x').on('click', canvasEvents.flipX);
    $('#pdp_flip_y').on('click', canvasEvents.flipY);
    //$('#rotateRight').on('click', canvasEvents.rotateRight);
    //$('#rotateLeft').on('click', canvasEvents.rotateLeft);
    $('#delete_item').on('click', canvasEvents.removeObject);
    $('#duplicate_item').on('click', canvasEvents.copyObject);
    //$('#color_list').on('click', 'li', function () {
    //    var color = $(this).attr("color");
    //    canvasEvents.changeColor(color);
    //});
    ///////////////////////////////Reset active///////////////////////////
    $('html').on('click', function(e) {
        var target = $('#canvas-container, #select_image, #add_text, #canvas_area, .pdp_extra_item, #pdp_opacity_item, .color_content, .control_tab, .canvas-container, .edit_area , #add_text, .p_rotate_wrap > div, .control_area, #edit_item_wrap').has(e.target).length;
        if (target === 0) {
            canvasEvents.clearSelected();
        }
        var cl_target = $('#font_outline_colorpicker, #font_outline_color').has(e.target).length;
        if (cl_target === 0) {
            $('#font_outline_colorpicker').slideUp(200);
        }
    });
    canvas.observe('object:selected', canvasEvents.objectSelected);
    canvas.observe('object:modified', canvasEvents.save_design2);
    canvas.observe('object:added', canvasEvents.save_design2);
    canvas.observe('before:selection:cleared', canvasEvents.objectUnselected);
    //canvas.observe('object:modified', 'canvasEvents.saveDesign'); 
    $(window).on('keydown', function(e) {
        var key = e.keyCode || e.which;
        if (key == 37) { // left arrow
            canvasEvents.moveObject('left');
            return false;
        } else if (key == 38) { // up arrow
            canvasEvents.moveObject('up');
            return false;
        } else if (key == 39) { // right arrow
            canvasEvents.moveObject('right');
            return false;
        } else if (key == 40) { // down arrow
            canvasEvents.moveObject('down');
            return false;
        } else if (key == 46) { // delete key
            canvasEvents.removeObject();
            return false;
        }
    });
    ////////////////////////////////////Save Design//////////////////////////////////////////////////////
    $('.action_pdp .save_svg').on('click', function() {
        //window.open('data:image/svg+xml;utf8,' + encodeURIComponent(canvas.toSVG()));
        $('#canvas_result').html('<img src="' + canvas_export_f.toDataURL('png') + '"><img src="' + canvas_export_b.toDataURL('png') + '">');
        //$('#canvas_result').html('<img src="'+'data:image/svg+xml;utf8,' + encodeURIComponent(canvas_f.toSVG())+'"><img src="'+'data:image/svg+xml;utf8,' + encodeURIComponent(canvas_b.toSVG())+'">');
    });
    $('.action_pdp .save_json').on('click', function() {
        //alert(JSON.stringify(canvas));
        $('#canvas_result').html(JSON.stringify(canvas_f));
    });
    $('#load_json_btn').click(function() {
        var json = $('#json_area').val();
        //load_json(json);
    });

    function load_json3333(objs) {
        var json = JSON.parse(objs);
        var objects = json.objects;
        canvas.clear();
        for (var i = 0; i < objects.length; i++) {
            var klass = fabric.util.getKlass(objects[i].type);
            if (klass.async) {
                klass.fromObject(objects[i], function(img) {
                    canvas.add(img);
                });
            } else {
                canvas.add(klass.fromObject(objects[i]));
            }
        }
    }
    ;
    ///////////////////////////////////////active facebook////////////////////////
    if ($('#fb_get_id').val() != '') {
        $('.add_artwork_tab').click();
        $('.tab_design_image .facebook_api').click();
    }
    $('#facebook_album').change(function() {
        var fid = $(this).val();
        $('#fb_image_list li:not(.' + fid + ')').hide();
        $('#fb_image_list li.fb_album_' + fid).show();
    });
    $(window).on('resize', function() {
        setting.center_canvas();
    });
    setting = {
        color: '#000',
        border: '#88AFFB',
        padding: 5,
        cornerSize: 8,
        center_canvas: function() {
            var w_pdp_wapper = $('.wrap_pdp_design').width();
            $(".product-image").each(function() {
                $(".product-image").hide();
                $(this).show();
                var w_canvas = $(this).find('.wrap_inlay_center img').width();
                $(this).find('.wrap_inlay_center').css({'margin-left': (w_pdp_wapper - w_canvas) / 2 + 'px', 'float': 'left'});
            });
            $(".product-image:not(.act)").hide();
            $(".product-image.act").show();
            canvasEvents.renderall();
        },
        first_category: function() {
            var first_item = $('#image_category_list li:eq(0) span').text();
            $('.pdp_selected_category').html(first_item);
        },
        acitve_slider: function() {
            $('#h-shadow').noUiSlider({
                range: [-50, 50],
                start: [0],
                handles: 1,
                slide: function() {
                    canvasEvents.editShadowItem();
                }
            });
            $('#v-shadow').noUiSlider({
                range: [-50, 50],
                start: [0],
                handles: 1,
                slide: function() {
                    canvasEvents.editShadowItem();
                }
            });
            $('#t-blur').noUiSlider({
                range: [0, 50],
                start: [0],
                handles: 1,
                slide: function() {
                    canvasEvents.editShadowItem();
                }
            });
            $('#pdp_opacity_input').noUiSlider({
                range: [0, 10],
                start: [10],
                handles: 1,
                slide: function() {
                    var opacity = $(this).val() / 10;
                    var active = canvas.getActiveObject();
                    if (!active)
                        return;
                    active.set("opacity", opacity);
                    canvasEvents.renderall();
                },
                serialization: {
                }
            });
            $('#pdp_font_size_input').noUiSlider({
                range: [1, 200],
                start: [20],
                handles: 1,
                slide: function() {
                    //canvasEvents.editItem();
                    canvasEvents.editText();
                    $('#pdp_font_size_value').html($(this).val() + 'px');
                }
            });
            $('#pdp_edit_text_line_height_input').noUiSlider({
                range: [1, 100],
                start: [13],
                handles: 1,
                slide: function() {
                    //canvasEvents.editItem();
                    canvasEvents.editText();
                }
            });
            $('#font_outline_colorpicker').farbtastic(function(color) {
                $("#font_outline_color_value").css("background-color", color);
                canvasEvents.editShadowItem();
                $("#font_outline_color_value").val(color);
            });
            //.farbtastic('#font_outline_color_value');
        }
    }
    setting.first_category();
    $('.product-img-box').waitForImages(function() {
        setting.center_canvas();
    });
    setting.acitve_slider();
    /////////////////////Demo slider
    $("#range_1").noUiSlider({
        range: [10, 40],
        start: [20, 30],
        handles: 1,
        serialization: {
            to: $('#rang_1_val')
        }
    });

    //canvasEvents.resetTextForm();
    ///////////////////////////////////////////////////////
    var keyStr = "ABCDEFGHIJKLMNOP" +
            "uyuyuytun767tut6y7656766675" +
            "ghijklmnopqrstuv" +
            "wxyz0123456789+/" +
            "=";
    function encode64(input) {
        input = escape(input);
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;
        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);
        return output;
    }
    function decode64(input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;
        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        do {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);
        return unescape(output);
    }

    $("ul.pdp_text_tag li").click(function() {
        var my_tag = $(this).attr('class');
        $('.pdp_text_list ul li').hide(100);
        $('.pdp_text_list ul').find('li.' + my_tag).show(100);
    });
    $('ul.pdp_text_tag li.all_tag').click(function() {
        $('.pdp_text_list ul').find('li').show(100);
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 So which other events are available in Fabric? Well, from mouse-level ones there are "mouse:down", "mouse:move", and "mouse:up". From generic ones, there are "after:render". Then there are selection-related events: "before:selection:cleared", "selection:created", "selection:cleared". And finally, object ones: "object:modified", "object:selected", "object:moving", "object:scaling", "object:rotating", "object:added", and "object:removed"
 
 
 */