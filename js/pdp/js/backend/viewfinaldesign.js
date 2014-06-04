var mst = jQuery.noConflict();
function printDiv(divID) {
    //Get the HTML of div
    var divElements = document.getElementById(divID).innerHTML;
    //Get the HTML of whole page
    var oldPage = document.body.innerHTML;

    //Reset the page's HTML with div's HTML only
    document.body.innerHTML = 
      "<html><head><title></title></head><body>" + 
      divElements + "</body>";

    //Print Page
    window.print();

    //Restore orignal HTML
    document.body.innerHTML = oldPage;

  
}
/*function printPartOfPage(elementId) {
    var printContent = document.getElementById(elementId);
    var windowUrl = 'Final Design';
    var uniqueName = new Date();
    var windowName = 'Print' + uniqueName.getTime();
    var printWindow = window.open(windowUrl, windowName, 'left=200,top=200,width=0,height=0');

    printWindow.document.write(printContent.innerHTML);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
}*/
mst(document).ready(function($){
    var cart_i = 0;
	var screenW = parseInt($(window).width());
	var margin_left;
	
	
    $('#final_design input.design-option').each(function(){
        cart_i++;
        var src_final = $(this).val().split("+"),
            id = cart_i,
            img_first = src_final[0].split(";"),
            inlay_f = img_first[3].split("-"),
            inlay_f_info = inlay_f[0].split(','),
            inlay_b_info = inlay_f[1].split(',');
        
        $('#design_result').append('<div style="position: relative; float: left;" id="img_f_result_'+id+'" class="img_result"></div><div style="position: relative; float: left;" id="img_b_result_'+id+'" class="img_result"></div>');
        $('#img_f_result_'+id).append('<img id="front_image_'+ id +'" src="'+img_first[1]+'" alt="img_result_front" /><div class="wrap_inlay"></div>');
        $('#front_image_' + id).load(function(){
        	margin_left = parseInt($('#img_f_result_'+id).width());
            $('#img_f_result_'+id).css({"margin-left":(screenW - margin_left)/2});
        });
        $('#img_b_result_'+id).append('<img id="back_image_'+ id +'" src="'+img_first[2]+'" alt="img_result_front" /><div class="wrap_inlay"></div>');
        $('#back_image_' + id).load(function(){
        	margin_left = parseInt($('#img_b_result_'+id).width());
        	$('#img_b_result_'+id).css({"margin-left":(screenW - margin_left)/2});
        });
        //$('#img_f_result_'+id).append('<img src="'+img_first[1]+'" alt="img_result_front" /><div class="wrap_inlay"></div>').css({"margin-left": "10px"});
        //$('#img_b_result_'+id).append('<img src="'+img_first[2]+'" alt="img_result_front" /><div class="wrap_inlay"></div>').css({"margin-left": "10px"}); 		
        $('#img_f_result_'+id+ ' .wrap_inlay').css({"position":"absolute", "display" : "block", "width":inlay_f_info[0],"height":inlay_f_info[1],"top":inlay_f_info[2]+'px',"left":inlay_f_info[3]+'px'});
        $('#img_b_result_'+id+ ' .wrap_inlay').css({"position":"absolute", "display" : "block", "width":inlay_b_info[0],"height":inlay_b_info[1],"top":inlay_b_info[2]+'px',"left":inlay_b_info[3]+'px'});
        
        
        
        for(ii=1;ii<src_final.length;ii++){
            var items = src_final[ii].split("!");
            if(items[0]=='back'){
                if(items.length==10){
                    $('#img_b_result_'+id+ ' .wrap_inlay').append('<div class="c_items" style="'+items[5]+'"><img style="'+items[6]+'" src="'+items[7]+'" alt="img" /></div>');
                }else{
                    $('#img_b_result_'+id+ ' .wrap_inlay').append('<div class="c_items" style="'+items[5]+'"><p style="'+items[7]+'">'+items[8]+'</p></div>');
                }
            }else{
                if(items.length==10){
                    $('#img_f_result_'+id+ ' .wrap_inlay').append('<div class="c_items" style="'+items[5]+'"><img style="'+items[6]+'" src="'+items[7]+'" alt="img" /></div>');
                }else{
                    $('#img_f_result_'+id+ ' .wrap_inlay').append('<div class="c_items" style="'+items[5]+'"><p style="'+items[7]+'">'+items[8]+'</p></div>');
                }
            }
        }
    });
    
    $('#final_design input.design-option').each(function(){
        cart_i++;
        var src_final = $(this).val().split("+"),
            id = cart_i,
            img_first = src_final[0].split(";"),
            inlay_f = img_first[3].split("-"),
            inlay_f_info = inlay_f[0].split(','),
            inlay_b_info = inlay_f[1].split(',');
        
        $('#print_design_result').append('<div style="position: relative; float: left;" id="print_img_f_result_'+id+'" class="print_img_result"></div><div style="position: relative; float: left;" id="print_img_b_result_'+id+'" class="print_img_result"></div>');
        $('#print_img_f_result_'+id).append('<img id="print_front_image_'+ id +'" src="'+img_first[1]+'" alt="img_result_front" /><div class="wrap_inlay"></div>').css({"margin-left": "200px"});
        $('#print_img_b_result_'+id).append('<img id="back_image_'+ id +'" src="'+img_first[2]+'" alt="img_result_front" /><div class="wrap_inlay"></div>').css({"margin-left": "200px"});	
        $('#print_img_f_result_'+id+ ' .wrap_inlay').css({"position":"absolute", "display" : "block", "width":inlay_f_info[0],"height":inlay_f_info[1],"top":inlay_f_info[2]+'px',"left":inlay_f_info[3]+'px'});
        $('#print_img_b_result_'+id+ ' .wrap_inlay').css({"position":"absolute", "display" : "block", "width":inlay_b_info[0],"height":inlay_b_info[1],"top":inlay_b_info[2]+'px',"left":inlay_b_info[3]+'px'});
        for(ii=1;ii<src_final.length;ii++){
            var items = src_final[ii].split("!");
            if(items[0]=='back'){
                if(items.length==10){
                    $('#print_img_b_result_'+id+ ' .wrap_inlay').append('<div class="c_items" style="'+items[5]+'"><img style="'+items[6]+'" src="'+items[7]+'" alt="img" /></div>');
                }else{
                    $('#print_img_b_result_'+id+ ' .wrap_inlay').append('<div class="c_items" style="'+items[5]+'"><p style="'+items[7]+'">'+items[8]+'</p></div>');
                }
            }else{
                if(items.length==10){
                    $('#print_img_f_result_'+id+ ' .wrap_inlay').append('<div class="c_items" style="'+items[5]+'"><img style="'+items[6]+'" src="'+items[7]+'" alt="img" /></div>');
                }else{
                    $('#print_img_f_result_'+id+ ' .wrap_inlay').append('<div class="c_items" style="'+items[5]+'"><p style="'+items[7]+'">'+items[8]+'</p></div>');
                }
            }
        }
    }); 
});