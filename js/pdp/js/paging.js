var paging = jQuery.noConflict();
paging(function($) {
    var baseUrl = $("#url_site").val().replace('index.php/', '');
    var mediaUrl = baseUrl + "media/pdp/images/";
    $('.content_designs').append('<span class="loading-img no-display">&nbsp;</span>');
    Paging = {
        init: function() {
            this.loadMoreImage();
            this.filterByCategory();
        },
        loadMoreImage: function() {
            $("#load_more_image").click(function() {
                //var currentPage = $("#current_page").val();
                var currentPage = $("#image_category_list li.active").attr("cr_act");
                //var category = Paging.getActiveCategory();
                var category = $('#image_category_list li.active span').attr("id");
                var pageSize = $("#default_page_size").val();
                $.ajax({
                    type: "POST",
                    url: baseUrl + "index.php/pdp/index/loadMoreImage",
                    data: {current_page: currentPage, category: category, page_size: pageSize},
                    beforeSend: function() {
                        $('.content_designs .loading-img').show();
                    },
                    error: function() {

                    },
                    success: function(response) {
                        if (response != "nomore") {
                            //Increment current page by 1
                            //$("#current_page").val(parseInt(currentPage) + 1);
                            $("#image_category_list li.active").attr("cr_act", parseInt(currentPage) + 1);
                            var data = $.parseJSON(response);
                            var item = "";
                            for (var i = 0; i < data.length; i++) {
                                item += "<li cat='" + data[i].category + "'> <a class='selection_img' rel='clover'><img color='" + data[i].color_img + "' src='" +
                                        mediaUrl + data[i].filename + "' id='img" + data[i].image_id + "'/></a> </li>";
                            }
                            $("#icon_list").append(item);

                        } else {
                            alert('No more items to load!');
                        }
                        $('.content_designs .loading-img').hide();
                    }
                });
            });
        },
        filterByCategory: function() {
            /**Category click**/
            $("#image_category_list li").click(function() {
                /**Remove all selected item**/
                var text_cate = $(this).find('span').text();
                $('.pdp_selected_category').html(text_cate);
                $('#image_category_list').hide();
                $("#image_category_list li.active").removeClass('active');
                $(this).addClass('active');
                $('#icon_list li[cat!=' + $(this).children('span').attr("id") + ']').hide();
                $('#icon_list li[cat=' + $(this).children('span').attr("id") + ']').show();
                if (!$(this).hasClass("cat_loaded")) {
                    $(this).addClass("cat_loaded");
                    var currentPage = 2,
                            category = $('#image_category_list li.active span').attr("id"),
                            pageSize = $("#default_page_size").val(),
                            page_size = parseInt(currentPage - 1) * parseInt(pageSize);
                    $.ajax({
                        type: "POST",
                        url: baseUrl + "index.php/pdp/index/loadMoreImage",
                        data: {current_page: 1, category: category, page_size: page_size},
                        beforeSend: function() {
                            $('.content_designs .loading-img').show();
                        },
                        error: function() {

                        },
                        success: function(response) {
                            if (response != "nomore") {
                                var data = $.parseJSON(response);
                                var item = "";
                                for (var i = 0; i < data.length; i++) {
                                    item += "<li cat='" + data[i].category + "'> <a class='selection_img' rel='clover'><img color='" + data[i].color_img + "' src='" +
                                            mediaUrl + data[i].filename + "' id='img" + data[i].image_id + "'/></a> </li>";
                                }
                                $("#icon_list").append(item);
                                $("#image_category_list li.active").attr("cr_act", 2);
                            } else {
                                alert('No more items to load!');
                            }
                            $('.content_designs .loading-img').hide();
                        }
                    });
                }
                //Change curent page
                //$('#current_page').val();
                /*
                 
                 
                 var currentPage = $("#current_page").val();
                 var category = Paging.getActiveCategory();
                 var pageSize = $("#default_page_size").val();
                 var page_size = parseInt(currentPage - 1) * parseInt(pageSize);
                 $.ajax({
                 type : "POST",
                 url : baseUrl + "index.php/pdp/index/loadMoreImage",
                 data : {current_page : 1, category : category, page_size : page_size},
                 beforeSend : function() {
                 $("#icon_list").addClass('loading-img');
                 },
                 error : function() {
                 
                 }, 
                 success : function(response) {
                 if (response != "nomore") {
                 var data = $.parseJSON(response);
                 var item = "";
                 for (var i = 0; i < data.length; i++) {
                 item += "<li cat='"+ data[i].category +"'> <a class='selection_img' rel='clover'><img color='"+ data[i].color_img +"' src='" + 
                 mediaUrl + data[i].filename +"' id='img" + data[i].image_id + "'/></a> </li>";
                 }
                 $("#icon_list").html(item);
                 } else {
                 alert('No more items to load!');
                 }
                 $("#icon_list").removeClass('loading-img');
                 }
                 });
                 */
            });
        }
    }
    Paging.init();

});