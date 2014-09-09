var mst = jQuery.noConflict();
mst(document).ready(function($){
    var i = 0;
    $('.order-tables .item-options dt').each(function(){
        if($(this).html()=='pdpinfo'){
            i++;
            if ($('.content-header .head-sales-order').text()) {
            	var orderId = $('.content-header .head-sales-order').text().split('|')[0].split('#')[1].trim();
                var baseUrl = $("#mst_base_url").val(),
                    did = $(this).parents('.item-container').attr("id").split('_');
                var link = "<a target='_blank' href='" + baseUrl + "pdp/view/finaldesign/id/" + orderId +  "/did/"+did[2]+"'>View Design</a>";
                //$('.order-tables').after(link);
            }
            $(this).parent().html(link);
            /*
            $(this).html('All items info');
            $(this).next().addClass("saveimage"+i);
            $('.saveimage'+i+' script').remove();
            var text1 = $('.saveimage'+i).text();
            $('<div class="saveinfoimg'+i+'"></div>').insertAfter($('.saveimage'+i));
            $('.saveinfoimg'+i).prepend($.trim(text1.replace('...','')));
            $('.saveimage'+i).remove();
            var text_r = $('.saveinfoimg'+i).text(),
                text_arr = text_r.split('ϣ'),
                img_big = text_arr[0].split(';'),
                inlay = img_big[3].replace(" ","").split('-'),
                inlay_f = inlay[0].split(','),
                inlay_b = inlay[1].split(','),
                html = '';
            $('.saveinfoimg'+i).html('<label>Size Selected</label><ul class="list_size list_size_'+i+'"></ul>');
            console.log(img_big);
            for(ii=7;ii<img_big.length;ii++){
                var label = img_big[ii].split('-');
                if(label[1]>0){
                    $('.list_size_'+i).append('<li><label>'+label[0]+'</label><span> : '+label[1]+' item(s)</span></li>');
                };
            };
            if(text_arr.length>0){
                $('.saveinfoimg'+i).append('<div id="front_img_'+i+'" style="position: relative;"><div class="wrap_inlay" style="position: absolute; width:'+inlay_f[0]+'px; height: '+inlay_f[1]+'px; top:'+inlay_f[2]+'px; left:'+inlay_f[3]+'px"></div></div><div style="position: relative;" id="back_img_'+i+'"><div class="wrap_inlay" style="position: absolute; width:'+inlay_b[0]+'px; height: '+inlay_b[1]+'px; top: '+inlay_b[2]+'px; left:'+inlay_b[3]+'px"></div></div>');
                $('#front_img_'+i).append('<img src="'+img_big[1].replace(' ','')+'" alt="img_result_front" />');
                $('#back_img_'+i).append('<img src="'+img_big[2].replace(' ','')+'" alt="img_result_front" />');
            }
            for(ii=1;ii<text_arr.length;ii++){
                img = text_arr[ii].split('╦');
                if(img[0]=='front'){
                    if(img.length==10){
                        $('#front_img_'+i+' .wrap_inlay').append('<div class="item item_img" style="'+img[5]+'"><img style="'+img[6]+'" src="'+img[7]+'" alt="img_result" /></div>');
                    }else{
                        $('#front_img_'+i+' .wrap_inlay').append('<div class="item item_text" style="'+img[5]+'"><p style="'+img[7]+'">'+img[8]+'</p></div>');
                    }
                }else{
                    if(img.length==10){
                        $('#back_img_'+i+' .wrap_inlay').append('<div class="item item_img" style="'+img[5]+'"><img style="'+img[6]+'" src="'+img[7]+'" alt="img_result" /></div>');
                    }else{
                        $('#back_img_'+i+' .wrap_inlay').append('<div class="item item_text" style="'+img[5]+'"><p style="'+img[7]+'">'+img[8]+'</p></div>');
                    }
                }
                
                
            } 
            if(text_arr.length>0){
            }   
            */
        }
    });
});