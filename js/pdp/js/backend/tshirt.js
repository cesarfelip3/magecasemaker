var tshirt = jQuery.noConflict();
tshirt(function($){
	var baseUrl = $("#base_url").val();
	var mediaUrl = $("#media_url").val();
	Tshirt = {
		design : function (url) {
			$.ajax({
				type : "GET",
				url : url,
				beforeSend : function () {
					$("#loading-mask").attr("style","left: -2px; top: 0px; width: 1034px; height: 833px;");
					$("#loading-mask").show();
				},
				success : function(data) {
					if (data != "") {  
						$("#loading-mask").hide();
						$('#design-info-form').html(data);
						$('#designForm').modal('show');
					    Tshirt.initializeBoxDesign();
                         
					} else {
						alert("File Not Found!");
						$("#loading-mask").hide();
					}
				}
			});
		},
        previewImage : function(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    //console.log(e);
                    $('#designImage').attr('src', e.target.result).load(function(){
                        var w_inlay = parseInt($('#designImage').width())-2,
                            h_inlay = parseInt($('#designImage').height())-2;
                            $('.inlay_area').css({"width":w_inlay+'px','height':h_inlay+'px',"left":'0',"top":'0'});
                            $('.img_area').css("margin-left",(parseInt($('.tab-content').width())-w_inlay)/2+'px');
                            $('#iwidth').val(w_inlay);
                            $('#iheight').val(h_inlay);
                            $('#itop').val(0);
                            $('#ileft').val(0);
                    });
                    $('#designImage').removeAttr('style');
                }
                reader.readAsDataURL(input.files[0]);
            }
        },
		previewImageBack : function(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    //console.log(e);
                    $('#designImageBack').attr('src', e.target.result).load(function(){
                        var w_inlay = parseInt($('#designImageBack').width())-2,
                            h_inlay = parseInt($('#designImageBack').height())-2;
                            $('.img_area_back').css("margin-left",(parseInt($('.tab-content').width())-w_inlay)/2+'px');
                            $('.inlay_area_back').css({"width":w_inlay+'px','height':h_inlay+'px',"left":'0',"top":'0'});
                            $('#iwidth_back').val(w_inlay);
                            $('#iheight_back').val(h_inlay);
                            $('#itop_back').val(0);
                            $('#ileft_back').val(0);
                    });
                    $('#designImageBack').removeAttr('style');
                }
                reader.readAsDataURL(input.files[0]);
            }
        },
		saveTshirtColor : function() {
			$("#tshirt_color_form").submit();
		},
		addMoreColorImage : function() {
			$("#add_more_color_image").click(function() {
				var counter = parseInt($("#counter").val()) + 1;
				$("#counter").val(counter);
				var row = "";
				row += "<tr>";
					row += "<td><input class='span required-entry' type='text' id='colorpicker_" + counter + "' name='color-image["+ counter +"]' value=''/></td>";
					row += "<td><input class='span' type='text' id='colorname_" + counter + "' name='color-name["+ counter +"]' value=''/></td>";
					row += "<td><input type='file' name='styleimage_" + counter + "' /></td>";
					row += "<td><input type='file' class='required-entry' name='colorimage_" + counter + "' /></td>";
					row += "<td><input type='file' class='' name='colorimageback_" + counter + "' /></td>";
					row += "<td><input type='text' class=' span9 validate-number' name='price["+ counter +"]' value=''/></td>";
					row += "<td><input type='text' class='span9 validate-digits' name='sort["+ counter +"]' value=''/></td>";
					row += "<td><button type='button' class='colorimage-option' id='removeimg_" + counter + "'>Remove</button></td>";
				row += "</tr>";

				$("#tshirt_color_option").append(row);
				Tshirt.activeColorPicker("#colorpicker_" + counter);
			});
		},
		addMorePdpOption : function() {
			$("#add_more_option").click(function() {
				//Show table's head
				$("#pdp_advanced_options").show();
				$("#tshirt .row-fluid").show();
				$("#pdp_advanced_options .option_head").show();
				var counter = parseInt($("#counter").val()) + 1;
				$("#counter").val(counter);
				var row = "";
				row += "<tr>";
					row += "<td><input type='text' class='required-entry' id='optionlabel_" + counter + "' name='option-label["+ counter +"]' value=''/></td>";
					row += "<td><input type='text' class='span9 validate-number' name='option-price["+ counter +"]' value=''/></td>";
					row += "<td><input type='text' class='span9 validate-digits' name='option-sort["+ counter +"]' value=''/></td>";
					row += "<td><button type='button' class='option-item' id='removeoption_" + counter + "'>Remove</button></td>";
				row += "</tr>";

				$("#pdp_advanced_options").append(row);
			});
		},
		removeColorImageOption : function() {
			$("#tshirt_color_option").on('click', '.colorimage-option' , function() {
				$(this).parent().parent().remove();
			});
		},
		removePdpOption : function() {
			$("#pdp_advanced_options").on('click', '.option-item' , function() {
				//Check if there are 2 row only (head and current row), then hide head as well
				var rowNum = $("#pdp_advanced_options tr").length;
				if (rowNum == 2) {
					$("#pdp_advanced_options").hide();
				}
				$(this).parent().parent().remove();
			});
		},
		activeColorPicker : function(selector) {
			/**Color picker**/
			$(selector).ColorPicker({
				color: '#c4b5c4',
				onShow: function (colpkr) {
					$(colpkr).fadeIn(300);
					return false;
				},
				onHide: function (colpkr) {
					$(colpkr).fadeOut(300);
					return false;
				},
				onChange: function (hsb, hex, rgb) {
					$(selector).css('backgroundColor', '#' + hex);
					$(selector).val(hex);
				}
			});
		},
        initializeBoxDesign : function(){
            var w = parseInt($('#iwidth').val())-2,
                h = parseInt($('#iheight').val())-2,
                t = $('#itop').val(),  
                l = $('#ileft').val(),
                src = $('#designImage').attr('src'),
    			img = new Image();
    			img.src = src;	           
            $('#design-info-form .inlay_area').attr("style",'width:'+w+'px; height:'+h+'px;top:'+t+'px;left:'+l+'px;');
            $('#design-info-form .inlay_area').resizable({
                containment: '.img_area',
    			aspectRatio: false,
    			handles:     'se',
                resize: function(event) {
                    $('#iwidth').val($(this).width());
                    $('#iheight').val($(this).height());
                }
    		});
            //Create tab function for tabs design
            $('#design-manage .nav li').click(function(){
                $('#design-manage .nav li.active').removeClass("active");
                $(this).addClass("active");
                var active_li = $(this).attr("rel");
                $('#design-manage .list_design > tbody > tr:not(.thead)').hide();
                $('.'+active_li).show();
            });
            $( "#design-info-form .inlay_area" ).draggable({ containment: '.img_area',
                start: function(){
                    
                },
                drag: function(){
                    $('#itop').val(parseInt($(this).position().top));
                    $('#ileft').val(parseInt($(this).position().left));        
                }
             });
             $('#iwidth').change(function(){
                var max_w = $('#print_area .img_area').width(),
                    change_w = $(this).val(),
                    left_cr = $('#ileft').val(),
                    max_w_cr = parseInt(max_w)-parseInt(left_cr)-2;
                if(change_w>max_w_cr){
                    change_w = max_w_cr;
                    $(this).val(max_w_cr);
                }  
                if(change_w<10){
                    change_w = 10;
                    $(this).val(10);
                }   
                $('#print_area .inlay_area').width(change_w);
             });
             $('#tshirt .nav-tabs li:eq(1), #tshirt .nav-tabs li:eq(2)').addClass("uncheck");
             $('#tshirt .nav-tabs li:eq(1)').click(function(){
                if($(this).hasClass("uncheck")){
                    $('#front').show();
                    var w_img = $('#designImage').width(),
                        w_wrap = $('.tab-content').width();
			        $('#design-info-form .img_area').attr("style",'margin:0 0 0 '+(parseInt(w_wrap)-parseInt(w_img))/2+'px');
                    $('#front').removeAttr("style");
                    $(this).removeClass("uncheck");
                }
             });
             $('#tshirt').append('<div id="save_img"></div>');
             $('#save_img').css("opacity",0).append('<image id="backimg_forsave" src="'+$('#designImageBack').attr("src")+'" />');
             var w_img_back;
             $('#backimg_forsave').load(function(){
                 w_img_back =  $(this).width();
                 $('#save_img').remove();  
             }); 
             $('#tshirt .nav-tabs li:eq(2)').click(function(){
                if($(this).hasClass("uncheck")){
                    $(this).removeClass("uncheck");
                    var w_wrap = $('.tab-content').width();
			        $('#design-info-form-back .img_area_back').attr("style",'margin:0 0 0 '+(parseInt(w_wrap)-parseInt(w_img_back))/2+'px');
                    //$('#back').removeAttr("style");
                }
             });
             $('#iheight').change(function(){
                var max_h = $('#print_area .img_area').height(),
                    change_h = $(this).val(),
                    top_cr = $('#itop').val(),
                    max_h_cr = parseInt(max_h)-parseInt(top_cr)-2;
                if(change_h>max_h_cr){
                    change_h = max_h_cr;
                    $(this).val(max_h_cr);
                }  
                if(change_h<10){
                    change_h = 10;
                    $(this).val(10);
                }   
                $('#print_area .inlay_area').height(change_h);
             });
             $('#ileft').change(function(){
                var max_h = $('#print_area .img_area').width(),
                    change_h = $(this).val(),
                    top_cr = $('#iwidth').val(),
                    max_h_cr = parseInt(max_h)-parseInt(top_cr)-2;
                if(change_h>max_h_cr){
                    change_h = max_h_cr;
                    $(this).val(max_h_cr);
                }  
                if(change_h<0){
                    change_h = 0;
                    $(this).val(0);
                }   
                $('#print_area .inlay_area').css("left",change_h+'px');
             });
             $('#itop').change(function(){
                var max_t = $('#print_area .img_area').height(),
                    change_t = $(this).val(),
                    height_cr = $('#iheight').val(),
                    max_t_cr = parseInt(max_t)-parseInt(height_cr)-2;
                if(change_t>max_t_cr){
                    change_t = max_t_cr;
                    $(this).val(max_t_cr);
                }  
                if(change_t<0){
                    change_t = 0;
                    $(this).val(0);
                }   
                $('#print_area .inlay_area').css("top",change_t+'px');
             });
        },
		initializeBoxDesignBack : function(){
            var w = $('#iwidth_back').val(),
                h = $('#iheight_back').val(),
                t = $('#itop_back').val(),  
                l = $('#ileft_back').val();
			var src = $('#designImageBack').attr('src');
			var img = new Image();
			img.src = src;
			$('#design-info-form-back .img_area_back').attr("style",'width:' + img.width + 'px; height:' + img.height + 'px');
            $('#design-info-form-back .inlay_area_back').attr("style",'width:'+w+'px; height:'+h+'px;top:'+t+'px;left:'+l+'px;');
            $('#design-info-form-back .inlay_area_back').resizable({
                containment: '.img_area_back',
    			aspectRatio: false,
    			handles:     'se',
                resize: function(event) {
                    $('#iwidth_back').val($(this).width());
                    $('#iheight_back').val($(this).height());
                }
    		});
            $( "#design-info-form-back .inlay_area_back" ).draggable({ containment: '.img_area_back',
                start: function(){
                    
                },
                drag: function(){
                    $('#itop_back').val(parseInt($(this).position().top));
                    $('#ileft_back').val(parseInt($(this).position().left));        
                }
             });
             $('#iwidth_back').change(function(){
                var max_w = $('#print_area_back .img_area_back').width(),
                    change_w = $(this).val(),
                    left_cr = $('#ileft_back').val(),
                    max_w_cr = parseInt(max_w)-parseInt(left_cr)-2;
                if(change_w>max_w_cr){
                    change_w = max_w_cr;
                    $(this).val(max_w_cr);
                }  
                if(change_w<10){
                    change_w = 10;
                    $(this).val(10);
                }   
                $('#print_area_back .inlay_area_back').width(change_w);
             });
             $('#iheight_back').change(function(){
                var max_h = $('#print_area_back .img_area_back').height(),
                    change_h = $(this).val(),
                    top_cr = $('#itop_back').val(),
                    max_h_cr = parseInt(max_h)-parseInt(top_cr)-2;
                if(change_h>max_h_cr){
                    change_h = max_h_cr;
                    $(this).val(max_h_cr);
                }  
                if(change_h<10){
                    change_h = 10;
                    $(this).val(10);
                }   
                $('#print_area_back .inlay_area_back').height(change_h);
             });
             $('#ileft_back').change(function(){
                var max_h = $('#print_area_back .img_area_back').width(),
                    change_h = $(this).val(),
                    top_cr = $('#iwidth_back').val(),
                    max_h_cr = parseInt(max_h)-parseInt(top_cr)-2;
                if(change_h>max_h_cr){
                    change_h = max_h_cr;
                    $(this).val(max_h_cr);
                }  
                if(change_h<0){
                    change_h = 0;
                    $(this).val(0);
                }   
                $('#print_area_back .inlay_area_back').css("left",change_h+'px');
             });
             $('#itop_back').change(function(){
                var max_t = $('#print_area_back .img_area_back').height(),
                    change_t = $(this).val(),
                    height_cr = $('#iheight_back').val(),
                    max_t_cr = parseInt(max_t)-parseInt(height_cr)-2;
                if(change_t>max_t_cr){
                    change_t = max_t_cr;
                    $(this).val(max_t_cr);
                }  
                if(change_t<0){
                    change_t = 0;
                    $(this).val(0);
                }   
                $('#print_area_back .inlay_area_back').css("top",change_t+'px');
             });
        }
	}
	/**T-Shirt Options**/
	Tshirt.initializeBoxDesign();
	Tshirt.initializeBoxDesignBack();
	Tshirt.addMoreColorImage();
	Tshirt.addMorePdpOption();
	Tshirt.removeColorImageOption();
	Tshirt.removePdpOption();
});