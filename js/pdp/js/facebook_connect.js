(function ($, window, document, undefined) {
        get_all_photos = function (id) {
            var photos_album = document.getElementById('photos_album');
            photos_album.innerHTML = 'Photos are loading.....';
            if (id == 0) {
                photos_album.innerHTML = '';
                return;
            }
            FB.api("/" + id + "/photos", function (response) {
                var photos = response["data"],
                        pt_result = '<ul>';
                for (var pt = 0; pt < photos.length; pt++) {
                    //console.log(photos[pt].images[0].source);
                    pt_result += '<li><img class="fb-image" color="" src="' + photos[pt].images[0].source + '" /></li>';
                }
                photos_album.innerHTML = pt_result + '</ul>';
            });
        };
        
        var ItmyprofessionSocial = {
            init: function () {
                this._loadLibrary();

                this._build();
            },
            _loadLibrary: function () {
                    var that = this;
                    $.ajaxSetup({cache: true});
                    $.getScript('//connect.facebook.net/en_UK/all.js', function () {
                        FB.init({
                            appId: '383795131773275', //'383795131773275',
                            xfbml: true,
                            version: 'v2.2'
                        });
                        $('#loginbutton,#feedbutton').removeAttr('disabled');
                    });
                    
            },
            _build: function () {
                this.fbLogin();
            },
            fbLogin: function () {
                var that = this;
                $('#fb-auth').on('click', function () {
                    FB.login(function (response) {
                        //console.log('loginng..........');
                        if (response.authResponse) {
                            that.fbPhotos();
                        }
                    }, {scope: 'public_profile, user_photos, email'});
                });
            },
            fbPhotos: function () {
                var userInfo = document.getElementById('user-info');
                FB.api('/me/albums', function (response) {
                    var l = response.data.length,
                            rs_all,
                            all_img;
                    if (l > 0) {
                        userInfo.innerHTML = 'Photos are loading.....';
                        rs_all = '<select id="fb_album" onchange="get_all_photos(this.value)"><option value="0">-- Select your album --</option>';
                        for (var i = 0; i < l; i++) {
                            var album = response.data[i],
                                    albumid = album.id;
                            rs_all += '<option value="' + album.id + '">' + album.name + '</option>';
                        }
                        rs_all += '</select>';
                        userInfo.innerHTML = rs_all;
                    }
                    //
                });

                //console.log('------------ debugging  -----------------');
//                FB.api(
//                        "/me/photos",
//                        function (response) {
//                            //if (response && !response.error) {
//                            if (response.data && response.data.length > 0) {
//                                //console.log(response.data);
//                                var images = '<ul>';
//
//                                $.each(response.data, function (key, value) {
//                                    images += "<li><img src='" + value.picture + "' class='fb-image'/></li>";
//                                });
//                                images += '</ul>';
//                                $('#photos_album').html(images);
//                            }
//                        }
//                );
            }
        }.init();
    })(jQuery, window, document);