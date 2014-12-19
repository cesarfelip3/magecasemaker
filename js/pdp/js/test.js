var pdp_setting = jQuery.noConflict();
pdp_setting.fn.ForceNumericOnly = function () {
    return this.each(function () {
        pdp_setting(this).keydown(function (e) {
            var t = e.charCode || e.keyCode || 0;
            return t == 8 || t == 9 || t == 46 || t >= 37 && t <= 40 || t >= 48 && t <= 57 || t >= 96 && t <= 105
        })
    })
};
pdp_setting(document).ready(function (e) {
    var t = e("#url_site").val().replace("index.php/", ""), n, r = [], s = [], o = 1e3, u = e("#currency_symbol").val(), a = {}, f;
    PDPsetting = {add_html: function () {
            e("body").prepend('<div class="pdploading nodisplay"><span>Please wait...</span></div>');
            e("body").append('<div style="display:none;" class="nodisplay" id="save_original_img_text"></div><div id="pdp_canvas_result" class="nodisplay"></div>');
            e("#product-image-wrap").prepend('<img id="main_image" src="' + t + 'media/pdp/images/no_image.jpg" />');
            e(".wrapper_pdp").append(e(".color_content"));
            e(".wrapper_pdp .wrap_pdp_design").append('<div id="pdp_info_item"><ul></ul></div>');
            e(".wrapper_pdp .wrap_pdp_design").append('<div id="pdp2_canvas_layer"><canvas id="pdp2_canvas_layer_cv"></canvas></div>')
        }, edit_cart_item: function (e) {
        }, center_design_area: function () {
            e("#main_image").load(function () {
                var t = e(".wrap_pdp_design").width(), n = e("#main_image").width(), r = parseInt((t - n) / 2);
                e("#product-image-wrap").css("margin-left", r + "px")
            })
        }, position_color: function () {
            var t = e("body").width(), n = e(".wrapper_pdp").width(), r = e(".color_content_wrap").width(), i = (t - n) / 2 - r + n;
            e(".color_content_wrap").css("left", i + "px")
        }, change_color: function () {
            e("#pdp_side_items li").each(function () {
                var t = e(this).attr("tab"), n = e("#pdp_media_url").val(), r = e(".design-color-image li.active").attr(t);
                e(this).attr("side_img", r).children("img").attr("src", n + r);
                e(".pdp_info_save[alt=" + t + "]").attr("side_img", r)
            });
            PDPsetting.change_image()
        }, save_first_design: function () {
        }, handle_files_select: function (t) {
            var n = t.target.files;
            for (var r = 0, i; i = n[r]; r++) {
                if (!i.type.match("image.*")) {
                    continue
                }
                var s = new FileReader;
                s.onload = function (t) {
                    return function (n) {
                        var r = e("#lists_img_upload span").length;
                        var i = document.createElement("span");
                        i.innerHTML = ['<img id="img_up_' + r++ + '" color="" class="thumb" src="', n.target.result, '" title="', escape(t.name), '"/>'].join("");
                        document.getElementById("lists_img_upload").insertBefore(i, null)
                    }
                }(i);
                s.readAsDataURL(i)
            }
            e("#files_upload").val("")
        }, change_image: function () {
            var t = e("#pdp_side_items li.active").attr("side_img"), n = e("#pdp_media_url").val();
            e("#main_image").attr("src", n + t).load(function () {
                canvasEvents.renderall()
            })
        }, change_side: function () {
            var t = e("#pdp_side_items li.active"), n = t.attr("side_img"), r = t.attr("tab"), i = e("#pdp_info_" + r).val(), s = e("#pdp_media_url").val(), o = t.attr("inlay").split(",");
            e("#main_image").attr("src", s + n);
            e("#wrap_inlay").css({width: o[0] + "px", height: o[1] + "px", top: o[2] + "px", left: o[3] + "px"}).show()
        }, display_design_as_html: function (e) {
        }, init: function () {
            function p(e, t, n, r) {
                var i = r / n;
                if (n >= e && i <= 1) {
                    n = e;
                    r = n * i;
                    r *= .9;
                    n *= .9
                } else if (r >= t) {
                    r = t;
                    n = r / i;
                    r *= .9;
                    n *= .9
                }
                return{width: n, height: r}
            }
            canvasEvents = {objectSelected: function () {
                    var t = n.getActiveObject();
                    canvasEvents.showinfo();
                    if (t.text) {
                        canvasEvents.changeToEditText(t)
                    } else {
                        canvasEvents.changeToEditItem()
                    }
                    e("#pdp_info_item li.active").removeClass("active");
                    e('#pdp_info_item li[rel="' + t.name + '"]').addClass("active");
                    e("#edit_item_wrap").addClass("active");
                    e("#edit_item_wrap .item:not(#edit_text, #color_item)").css("opacity", 1)
                }, removeShadow: function () {
                    var e = n.getActiveObject();
                    if (!e)
                        return;
                    e.setShadow("none");
                    canvasEvents.resetShadowForm();
                    canvasEvents.renderall()
                }, showinfo: function () {
                    var t = n.getActiveObject();
                    if (!t)
                        return;
                    e("#pdp_info_item").show();
                    e("#pdp_info_item ." + t.name + " .item_size").html(parseInt(t.currentWidth) + " x " + parseInt(t.currentHeight))
                }, makelistcolor: function (r, s) {
                    if (r != "" && r != undefined) {
                        r = r.split(",")
                    } else {
                        r = ""
                    }
                    e(".pdp_color_list ul").hide();
                    e(".pdp_color_list .pdp_color_png").show();
                    if (e(".pdp_color_list .pdp_color_png").length == 0) {
                        e(".pdp_color_list").append('<ul class="pdp_color_png"></ul>');
                        e(".pdp_color_png").on("click", "a", function () {
                            e(".pdp_color_png .active").removeClass("active");
                            e(this).addClass("active");
                            var r = n.getActiveObject(), i = r.top, s = r.angle, o = r.width, u = r.height, a = r.scaleX, f = r.scaleY, l = r.left, c = r.icolor, h = r.id, p = r.name, d = t + "media/pdp/images/artworks/" + e(this).attr("rel");
                            n.remove(r);
                            fabric.Image.fromURL(d, function (e) {
                                e.set({left: l, top: i, angle: s, scaleX: a, scaleY: f, icolor: c, id: h, isrc: d, name: p, width: o, height: u, padding: setting.padding});
                                e.transparentCorners = true;
                                e.cornerSize = 10;
                                n.add(e).setActiveObject(e)
                            });
                            n.renderAll()
                        })
                    }
                    for (i = 0; i < r.length; i++) {
                        var o = r[i].split("__");
                        e(".pdp_color_list ul.pdp_color_png").append('<li alt="' + s + '"><a title="" rel="' + o[1] + '" style="background-color:#' + o[0] + '">' + o[1] + "</a></li>")
                    }
                    if (e("ul.pdp_color_png li:visible").length == 0) {
                        e(".nomore_color").show()
                    } else {
                        e(".nomore_color").hide()
                    }
                }, addlayer_first_time: function () {
                    var t, n = 0;
                    e("#pdp_side_items li").each(function () {
                        var i = JSON.parse(r[e(this).index()]);
                        var s = i.objects, o = 0, a = e(this).attr("tab");
                        e(".layer_" + a + " .layer_pricing tbody").html("");
                        for (var f = 0; f < s.length; f++) {
                            s[f].left = 0;
                            s[f].top = 0;
                            s[f].angle = 0;
                            if (s[f].name != undefined && s[f].name != "null") {
                                item_name = s[f].name
                            } else {
                                item_name = "item_" + a + f
                            }
                            e("#pdp2_canvas_layer_cv").attr({width: s[f].width * s[f].scaleX, height: s[f].height * s[f].scaleY});
                            var l = new fabric.Canvas("pdp2_canvas_layer_cv", {opacity: 1});
                            l.clear();
                            var c = fabric.util.getKlass(s[f].type);
                            if (c.async) {
                                c.fromObject(s[f], function (e) {
                                    l.add(e)
                                })
                            } else {
                                l.add(c.fromObject(s[f]))
                            }
                            if (e("#pdc_product_config").length > 0) {
                                var h = JSON.parse(e("#pdc_product_config").val());
                                if (s[f].text) {
                                    if (h.text_price == "") {
                                        h.text_price = 0
                                    }
                                    if (s[f].price == undefined) {
                                        s[f].price = h.text_price
                                    }
                                } else {
                                    if (h.clipart_price == "") {
                                        h.clipart_price = 0
                                    }
                                    if (s[f].price == undefined) {
                                        s[f].price = h.clipart_price
                                    }
                                }
                            } else {
                                if (s[f].price == undefined) {
                                    s[f].price = 0
                                }
                            }
                            n += parseFloat(s[f].price);
                            o += parseFloat(s[f].price);
                            if (s[f].type == "path" || s[f].type == "path-group" || s[f].type == "image") {
                                t = '<tr class="pdp2_layer_item" rel="' + item_name + '">' + '<td class="item_type">' + parseInt(f + 1) + "</td>" + '<td class="item_info"><img src="' + l.toDataURL("png") + '"/></td>' + '<td class="item_price">' + u + parseFloat(s[f].price).toFixed(2) + "</td>" + '<td><a class="item_delete" title="Remove"><i class="pi pi-trash-o"></i></a></td></tr>'
                            }
                            if (s[f].type == "text") {
                                t = '<tr class="pdp2_layer_item" rel="' + item_name + '">' + '<td class="item_type">' + parseInt(f + 1) + "</td>" + '<td class="item_info">' + s[f].text.substring(0, 15) + "...</td>" + '<td class="item_price">' + u + parseFloat(s[f].price).toFixed(2) + "</td>" + '<td><a class="item_delete" title="Remove"><i class="pi pi-trash-o"></i></a></td></tr>'
                            }
                            e(".layer_" + a + " tbody").append(t).parents(".layer_pricing").attr("pr", o)
                        }
                    });
                    e("#pdp_total_layer_price tfoot tr th:eq(2)").html(u + n.toFixed(2));
                    e(".item_delete").parent().remove();
                    var i = e("#pdp_side_items li.active").attr("tab")
                }, update_total_price_layer: function () {
                    var t = 0;
                    e(".prices_layer").each(function () {
                        var n = e(this).find(".layer_pricing").attr("pr");
                        if (n == undefined) {
                            n = 0
                        }
                        t += parseFloat(n)
                    });
                    e(".item_delete").parent().remove();
                    e("#pdp_total_layer_price .layer_pricing").attr("pr", t.toFixed(2));
                    e("#pdp_total_layer_price .layer_pricing th:eq(2)").html(u + t.toFixed(2))
                }, addlayer: function () {
                    var t, n = 0;
                    var i = JSON.parse(r[e("#pdp_side_items li.active").index()]);
                    var s = i.objects, o = e("#pdp_side_items li.active").attr("tab");
                    e(".layer_" + o + " .layer_pricing tbody").html("");
                    e(".layer_" + o + " tbody").append(t).parents(".layer_pricing").attr("pr", n);
                    for (var a = 0; a < s.length; a++) {
                        s[a].left = 0;
                        s[a].top = 0;
                        s[a].angle = 0;
                        if (s[a].name != undefined) {
                            item_name = s[a].name
                        } else {
                            item_name = "item_" + a
                        }
                        e("#pdp2_canvas_layer_cv").attr({width: s[a].width * s[a].scaleX, height: s[a].height * s[a].scaleY});
                        var f = new fabric.Canvas("pdp2_canvas_layer_cv", {opacity: 1});
                        f.clear();
                        var l = fabric.util.getKlass(s[a].type);
                        if (l.async) {
                            l.fromObject(s[a], function (e) {
                                f.add(e)
                            })
                        } else {
                            f.add(l.fromObject(s[a]))
                        }
                        if (e("#pdc_product_config").length > 0) {
                            var c = JSON.parse(e("#pdc_product_config").val());
                            if (s[a].text) {
                                if (c.text_price == "") {
                                    c.text_price = 0
                                }
                                if (s[a].price == undefined) {
                                    s[a].price = c.text_price
                                }
                            } else {
                                if (c.clipart_price == "") {
                                    c.clipart_price = 0
                                }
                                if (s[a].price == undefined) {
                                    s[a].price = c.clipart_price
                                }
                            }
                        } else {
                            if (s[a].price == undefined) {
                                s[a].price = 0
                            }
                        }
                        n += parseFloat(s[a].price);
                        if (s[a].type == "path" || s[a].type == "path-group") {
                            t = '<tr class="pdp2_layer_item" rel="' + item_name + '">' + '<td class="item_type">' + parseInt(a + 1) + "</td>" + '<td class="item_info"><img src="' + f.toDataURL("png") + '"/></td>' + '<td class="item_price">' + u + parseFloat(s[a].price).toFixed(2) + "</td>" + '<td><a class="item_delete" title="Remove"><i class="pi pi-trash-o"></i></a></td></tr>'
                        }
                        if (s[a].type == "image") {
                            t = '<tr class="pdp2_layer_item" rel="' + item_name + '">' + '<td class="item_type">' + parseInt(a + 1) + "</td>" + '<td class="item_info"><img src="' + s[a].isrc + '"/></td>' + '<td class="item_price">' + u + parseFloat(s[a].price).toFixed(2) + "</td>" + '<td><a class="item_delete" title="Remove"><i class="pi pi-trash-o"></i></a></td></tr>'
                        }
                        if (s[a].type == "text") {
                            t = '<tr class="pdp2_layer_item" rel="' + item_name + '">' + '<td class="item_type">' + parseInt(a + 1) + "</td>" + '<td class="item_info">' + s[a].text.substring(0, 15) + "...</td>" + '<td class="item_price">' + u + parseFloat(s[a].price).toFixed(2) + "</td>" + '<td><a class="item_delete" title="Remove"><i class="pi pi-trash-o"></i></a></td></tr>'
                        }
                        e(".layer_" + o + " tbody").append(t).parents(".layer_pricing").attr("pr", n)
                    }
                    canvasEvents.update_total_price_layer()
                }, activeobj: function (e) {
                    var t = n.getObjects();
                    if (e != "" && e != undefined) {
                        for (var r = 0; r < t.length; r++) {
                            if (t[r].name == e) {
                                n.setActiveObject(t[r])
                            }
                        }
                    }
                }, resetShadowForm: function () {
                    e("#use_shadow").removeClass("active");
                    e("#h-shadow").val(0);
                    e("#v-shadow").val(0);
                    e("#t-blur").val(0);
                    e("#font_outline_color_value").css({"background-color": "#FFF", color: "#000"}).val("#FFFFFF");
                    e(".font_outline_color > div:not(.use_shadow)").hide()
                }, addShadowItem: function () {
                    var t = n.getActiveObject();
                    if (!t)
                        return;
                    setting_shadow = {h_shadow: e("#h-shadow").val(), v_shadow: e("#v-shadow").val(), blur: e("#t-blur").val(), color: e("#font_outline_color_value").val()};
                    t.setShadow({color: setting_shadow.color, blur: setting_shadow.blur, offsetX: setting_shadow.v_shadow, offsetY: setting_shadow.h_shadow});
                    canvasEvents.renderall()
                }, renderall: function () {
                    n.selection = false;
                    canvasEvents.save_history();
                    canvasEvents.save_design2();
                    n.calcOffset().renderAll();
                    canvasEvents.addlayer()
                }, reset_canvas: function (i) {
                    var s = e("#pdp_side_items li[tab=" + i + "]"), o, u = e("#pdp_side_items li[tab=" + i + "]").index(), a;
                    if (s.length > 0) {
                        o = t + "media/pdp/images/" + s.attr("side_img");
                        e("#main_image").attr("src", o);
                        a = s.attr("inlay").split(",");
                        e("#wrap_inlay").html('<canvas id="canvas_area"></canvas>');
                        e("#wrap_inlay").css({width: a[0] + "px", height: a[1] + "px", top: a[2] + "px", left: a[3] + "px"});
                        e("#canvas_area").attr({width: a[0], height: a[1]});
                        n = new fabric.Canvas("canvas_area", {});
                        n.clear();
                        n.observe("object:selected", canvasEvents.objectSelected);
                        n.observe("object:modified", canvasEvents.renderall);
                        n.observe("object:modified", canvasEvents.showinfo);
                        n.observe("object:added", canvasEvents.renderall);
                        n.observe("before:selection:cleared", canvasEvents.objectUnselected);
                        canvasEvents.load_json(r[u]);
                        canvasEvents.centerCanvas();
                        canvasEvents.renderall()
                    }
                }, save_history: function () {
                    var t = e("#pdp_side_items li.active").index();
                    r[t] = JSON.stringify(n.toJSON(["name", "price", "tcolor", "isrc", "icolor", "id"]))
                }, editShadowItem: function () {
                    var t = n.getActiveObject();
                    if (!t)
                        return;
                    var r = t.get("shadow");
                    if (r != null && r.color != "none") {
                        setting_shadow = {h_shadow: e("#h-shadow").val(), v_shadow: e("#v-shadow").val(), blur: e("#t-blur").val(), color: e("#font_outline_color_value").val()};
                        t.setShadow({color: setting_shadow.color, blur: setting_shadow.blur, offsetX: setting_shadow.v_shadow, offsetY: setting_shadow.h_shadow})
                    } else {
                        canvasEvents.resetShadowForm()
                    }
                    n.calcOffset().renderAll()
                }, changeToEditItem: function () {
                    var t = n.getActiveObject();
                    if (!t)
                        return;
                    var r = t.get("opacity");
                    e("#pdp_opacity_input").val(r * 10);
                    var i = t.get("shadow");
                    if (t.tcolor == 1) {
                        e(".pdp_color_list ul.mCustomScrollbar").show();
                        e(".pdp_color_list ul").show();
                        e(".pdp_color_list ul.pdp_color_png").hide();
                        e(".nomore_color").hide()
                    } else {
                        var s = t.isrc.split("/");
                        e(".pdp_color_list ul.mCustomScrollbar").hide();
                        e(".pdp_color_list ul").hide();
                        e(".pdp_color_list ul.pdp_color_png").show();
                        e(".pdp_color_png a.active").removeClass("active");
                        e('.pdp_color_png a[rel="' + s[s.length - 1] + '"]').addClass("active");
                        e(".pdp_color_png li").hide();
                        if (t.icolor != "" && t.icolor != undefined && e('.pdp_color_png li[alt="' + t.id + '"]').length == 0) {
                            canvasEvents.makelistcolor(t.icolor, t.id)
                        }
                        e('.pdp_color_png li[alt="' + t.id + '"]').show();
                        if (e("ul.pdp_color_png li:visible").length == 0) {
                            e(".nomore_color").show()
                        } else {
                            e(".nomore_color").hide()
                        }
                    }
                    if (i == null || i.color == "none") {
                        canvasEvents.resetShadowForm()
                    } else {
                        e(".font_outline_color > div:not(.use_shadow)").show();
                        e("#h-shadow").val(i.offsetY);
                        e("#v-shadow").val(i.offsetX);
                        e("#t-blur").val(i.blur);
                        e("#font_outline_color_value").val(i.color).css("background-color", i.color);
                        e("#use_shadow").addClass("active")
                    }
                }, change_main_image: function () {
                    var t = e("#pdp_side_items li.active").attr("tab"), n = e(".pdp_design_color li.active").attr(t), r = e("#pdp_media_url").val();
                    e("#main_image").attr("src", r + n)
                }, editText: function () {
                    var t = n.getActiveObject();
                    if (!t)
                        return;
                    if (!t.text)
                        return;
                    if (t.type != "curvedText") {
                        t.setText(e("#pdp_edit_text_input").val());
                        if (e("#pdp_edit_text_input").val() != "") {
                            t.setText(e("#pdp_edit_text_input").val())
                        } else {
                            e("#edit_text").css("opacity", "0.5");
                            canvasEvents.removeObject()
                        }
                    }
                    e("#edit_item_wrap").show();
                    e("#edit_text").css("opacity", "1");
                    e("#font_outline_colorpicker").hide();
                    var r = e("#font_color").css("color"), i = e("#select_font li.active").attr("rel"), s = e("#pdp_edit_text_line_height_input").val() / 10, o, u, a, f = t.get("left"), l = t.get("top"), c = e("#pdp_font_size_input").val(), h = "";
                    if (e(".pdp_edit_font_style .bold").hasClass("active")) {
                        o = "bold"
                    } else {
                        o = ""
                    }
                    console.log(r);
                    if (e(".pdp_edit_font_style .italic").hasClass("active")) {
                        u = "italic"
                    } else {
                        u = ""
                    }
                    if (e(".pdp_edit_font_style .underline").hasClass("active")) {
                        h += " underline "
                    }
                    if (e(".pdp_edit_font_style .overline").hasClass("active")) {
                        h += " overline "
                    }
                    if (e(".pdp_edit_font_style .line-through").hasClass("active")) {
                        h += " line-through "
                    }
                    if (e("#pdp_edit_text_style .align.align_left").hasClass("active")) {
                        a = "left"
                    }
                    if (e("#pdp_edit_text_style .align.align_right").hasClass("active")) {
                        a = "right"
                    }
                    if (e("#pdp_edit_text_style .align.align_center").hasClass("active")) {
                        a = "center"
                    }
                    t.set({fill: r, fontSize: c, fontStyle: u, fontWeight: o, textDecoration: h, fontFamily: i, lineHeight: s, textAlign: a});
                    if (e("#use_shadow").hasClass("active")) {
                        setting_shadow = {h_shadow: e("#h-shadow").val(), v_shadow: e("#v-shadow").val(), blur: e("#t-blur").val(), color: e("#font_outline_color_value").val()};
                        t.setShadow({color: setting_shadow.color, blur: setting_shadow.blur, offsetX: setting_shadow.v_shadow, offsetY: setting_shadow.h_shadow})
                    } else {
                        canvasEvents.resetShadowForm();
                        t.setShadow("none")
                    }
                    canvasEvents.renderall()
                }, addText: function (t) {
                    e("#add_text").slideUp(300);
                    e("#add_text_input").val("");
                    e("#edit_text").css("opacity", "1");
                    e("#color_item").css("opacity", .5);
                    var r = e("#font_color").css("color"), i = "Arial", s, o, u = "", a = parseInt(e("#pdp_info_item").attr("critem"));
                    r = "#111";
                    e("#pdp_info_item").attr("critem", a + 1);
                    var f = {};
                    f.text_price = 0;
                    if (e("#pdc_product_config").length) {
                        f = JSON.parse(e("#pdc_product_config").val())
                    }
                    var l = n.getCenter(), c = new fabric.Text(t, {fontFamily: i, left: l.left, top: l.top, fontSize: 20, textAlign: "left", fill: r, price: f.text_price, name: "item_" + a, lineHeight: "1.3", fontStyle: "", fontWeight: "normal", textDecoration: "", shadow: "", padding: setting.padding});
                    c.lockUniScaling = false;
                    c.hasRotatingPoint = true;
                    c.transparentCorners = true;
                    c.cornerColor = setting.border;
                    n.add(c).setActiveObject(c);
                    canvasEvents.center();
                    canvasEvents.addlayer();
                    e("#use_shadow").click();
                    canvasEvents.renderall()
                }, addTextCurved: function (t) {
                    e("#add_text").slideUp(300);
                    e("#add_text_input").val("");
                    e("#edit_text").css("opacity", "1");
                    e("#color_item").css("opacity", .5);
                    var r = "#111", i = "Arial", s, o, u = "";
                    var a = n.getCenter(), f = new fabric.CurvedText(t, {left: a.left, top: a.top, fontFamily: i, textAlign: "left", fill: r, radius: 100, perPixelTargetFind: true, fontSize: 20, spacing: 15, lockUniScaling: true});
                    f.lockUniScaling = true;
                    f.hasRotatingPoint = true;
                    f.transparentCorners = true;
                    f.cornerColor = setting.border;
                    n.add(f).setActiveObject(f);
                    canvasEvents.center();
                    canvasEvents.renderall()
                }, editCurvedText: function (e) {
                    canvasEvents.renderall()
                }, changeToEditText: function (t) {
                    e("#tab_text").prop("checked", true);
                    e('a[tab="pdp_edit_text_curved"]').hide();
                    if (!t)
                        return false;
                    e("#pdp_edit_text_input").val(t.getText());
                    var n = t.get("fontFamily"), r = t.get("fontSize"), i = t.get("textDecoration"), s = t.get("fontStyle"), o = t.get("textAlign"), u = t.get("fontWeight"), a = t.get("fill"), f = t.get("opacity"), l = t.get("lineHeight"), c = t.get("shadow");
                    e("#font_color").css("color", a);
                    if (c && c != "" && c.color != "none") {
                        e(".font_outline_color > div").show();
                        e("#use_shadow").addClass("active");
                        e("#h-shadow").val(c.offsetY);
                        e("#v-shadow").val(c.offsetX);
                        e("#t-blur").val(c.blur);
                        e("#font_outline_color_value").val(c.color).css("background-color", c.color)
                    } else {
                        canvasEvents.resetShadowForm()
                    }
                    e("#pdp_opacity_input").val(f * 10);
                    e(".pdp_edit_text_tab_content").hide();
                    if (t.get("type") == "curvedText") {
                        e("#pdp2_curved_text").val(t.getText());
                        e("#pdp_edit_text_tab a.active").removeClass("active");
                        e("#pdp_edit_text_tab_content, a[tab=pdp_edit_text_tab_content]").hide();
                        e(".pdp_curved_text_control").show();
                        e('a[tab="pdp_edit_text_curved"], #pdp_edit_text_curved').addClass("active").show()
                    } else {
                        e('a[tab="pdp_edit_text_tab_content"]').addClass("active").show();
                        e('#pdp_edit_text_tab a[tab!="pdp_edit_text_curved"], #pdp_edit_text_tab_content').show()
                    }
                    e(".pdp_edit_font_style a, #pdp_edit_text_style a").removeClass("active");
                    e("#pdp_font_size_value").html(r + "px");
                    e("#pdp_font_line_height_value").html(l);
                    if (o == "right") {
                        e("#pdp_edit_text_style .align_right").addClass("active")
                    } else {
                        if (o == "center") {
                            e("#pdp_edit_text_style .align_center").addClass("active")
                        } else {
                            e("#pdp_edit_text_style .align_left").addClass("active")
                        }
                    }
                    if (u == "bold") {
                        e(".pdp_edit_font_style .bold").addClass("active")
                    }
                    if (s == "italic") {
                        e(".pdp_edit_font_style .italic").addClass("active")
                    }
                    if (i.indexOf("underline") > 0) {
                        e(".pdp_edit_font_style .underline").addClass("active")
                    }
                    if (i.indexOf("overline") > 0) {
                        e(".pdp_edit_font_style .overline").addClass("active")
                    }
                    if (i.indexOf("line-through") > 0) {
                        e(".pdp_edit_font_style .line-through").addClass("active")
                    }
                    e("#pdp_color").css("color", "#111");
                    if (a == "#111") {
                        e("#pdp_color_text li:eq(0) a").addClass("active")
                    } else {
                        e("#pdp_color_text li a").each(function () {
                        })
                    }
                    e("#pdp_color_text_input").css("background-color", a);
                    e("#select_font li").removeClass("active");
                    e('#select_font li[rel="' + n + '"]').addClass("active");
                    e("#pdp_edit_text_line_height_input").val(l * 10);
                    e("#pdp_font_line_height_value").html(parseInt(l * 10) + "px");
                    e("#pdp_font_size_input").val(r);
                    if (t.type == "curvedText") {
                        e("#use_curved").addClass("active");
                        e(".pdp_curved_text_control").show()
                    } else {
                        e("#use_curved").removeClass("active");
                        e(".pdp_curved_text_control").hide()
                    }
                }, addSvg: function (t, r, i, s, o, u) {
                    fabric.loadSVGFromURL(t, function (a, f) {
                        var l = fabric.util.groupSVGElements(a, f), c = n.getCenter(), h = parseInt(e("#pdp_info_item").attr("critem"));
                        e("#pdp_info_item").attr("critem", h + 1);
                        if (r == "" || r == undefined) {
                            r = 0
                        }
                        if (i == "" || i == undefined) {
                            i = "not_add"
                        }
                        l.set({perPixelTargetFind: true, isrc: t, price: r, tcolor: s, icolor: o, name: i, id: u, fill: setting.color, transparentCorners: true, padding: setting.padding});
                        if (l.width > n.width) {
                            l.scaleToWidth(n.width - 20)
                        }
                        l.setCoords();
                        n.centerObject(l);
                        l.hasRotatingPoint = true;
                        l.lockUniScaling = true;
                        n.add(l).setActiveObject(l);
                        canvasEvents.addlayer()
                    })
                }, resetTextForm: function () {
                    e("#pdp_font_size_input").val(20);
                    e("#pdp_font_size_value").html("20px");
                    e("#pdp_edit_text_line_height_input").val(13);
                    e("#pdp_font_line_height_value").html("13px");
                    e("#use_shadow").attr("checked", false);
                    e("#add_text_action").show();
                    e("#edit_text_action, .pdp_edit_text_tab_content").hide();
                    e("#edit_text").css("opacity", .5);
                    e("#add_text_input").val("");
                    e("#select_font_span").html("Arial").css("font-family", "Arial");
                    e("#pdp_edit_text_tab_content").show();
                    e("#pdp_color_text input").val("#111111");
                    e("#font_outline_colorpicker").setColor("#FFFFFF");
                    e("#pdp_edit_text .active, #pdp_edit_text_style .active").removeClass("active");
                    e("#pdp_edit_text_tab a:eq(0),#pdp_edit_text_style .align_left").addClass("active");
                    e("#select_font li").removeClass("active");
                    e("#select_font li:eq(0)").addClass("active");
                    e("#use_curved").removeClass("active");
                    e(".pdp_curved_text_control").hide()
                }, objectUnselected: function () {
                    e("#pdp_info_item li.active").removeClass("active");
                    e(".pdp_extra_item, .tab_content:not(#pdp_rotate_item), #font_outline_colorpicker").slideUp(400);
                    e("#edit_item_wrap .active").removeClass("active");
                    e("#edit_item_wrap").removeClass("active");
                    e("#edit_item_wrap div.item").css("opacity", .5)
                }, clearSelected: function () {
                    this.objectUnselected();
                    n.deactivateAll().renderAll()
                }, centerX: function () {
                    var e = n.getActiveObject();
                    if (!e)
                        return;
                    n.centerObjectH(e);
                    e.setCoords();
                    canvasEvents.renderall()
                }, center: function () {
                    var e = n.getActiveObject();
                    if (!e)
                        return;
                    n.centerObjectH(e);
                    n.centerObjectV(e);
                    e.setCoords();
                    canvasEvents.renderall()
                }, centerY: function () {
                    var e = n.getActiveObject();
                    if (!e)
                        return;
                    n.centerObjectV(e);
                    e.setCoords();
                    canvasEvents.renderall()
                }, rotateRight: function (e) {
                    var t = e.getActiveObject();
                    if (!t)
                        return;
                    var n = t.get("angle");
                    t.rotate(n + 45);
                    t.setCoords();
                    canvasEvents.renderall()
                }, rotateLeft: function (e) {
                    var t = e.getActiveObject();
                    if (!t)
                        return;
                    var n = t.get("angle");
                    t.rotate(n - 45);
                    t.setCoords();
                    canvasEvents.renderall()
                }, flipX: function () {
                    var e = n.getActiveObject();
                    if (!e)
                        return;
                    e.flipX = e.flipX ? false : true;
                    e.setCoords();
                    canvasEvents.renderall()
                }, flipY: function () {
                    var e = n.getActiveObject();
                    if (!e)
                        return;
                    e.flipY = e.flipY ? false : true;
                    e.setCoords();
                    canvasEvents.renderall()
                }, load_json: function (t) {
                    var r = JSON.parse(t);
                    var i = r.objects;
                    n.clear();
                    e("#pdp_info_item").attr("critem", i.length);
                    var s = false;
                    i.forEach(function (e) {
                        if (e.type == "text") {
                            s = true;
                            return
                        }
                    });
                    if (!e(".pdp_side_item_content.active.first-loaded").length && s) {
                        var u = new fabric.Text("Loading...", {left: 0, top: 0, fontSize: 25, shadow: "rgba(0,0,0,0.3) 5px 5px 5px", fontFamily: "Impact", stroke: "#fff", strokeWidth: 1});
                        setTimeout(function () {
                            n.remove(u);
                            canvasEvents.renderall();
                            e(".pdp_side_item_content.active").addClass("first-loaded")
                        }, o)
                    }
                    fabric.util.enlivenObjects(i, function (e) {
                        var t = n.renderOnAddRemove;
                        n.renderOnAddRemove = false;
                        e.forEach(function (e) {
                            n.add(e)
                        });
                        n.renderOnAddRemove = t;
                        n.renderAll()
                    })
                }, copyObject: function () {
                    var e = n.getActiveObject();
                    if (!e)
                        return;
                    if (fabric.util.getKlass(e.type).async) {
                        e.clone(function (e) {
                            e.set({transparentCorners: true, cornerColor: setting.border});
                            n.add(e)
                        })
                    } else {
                        n.add(e.clone().set({transparentCorners: true, cornerColor: setting.border}))
                    }
                    canvasEvents.addlayer();
                    canvasEvents.renderall()
                }, removeObject: function () {
                    var t = n.getActiveObject();
                    if (t) {
                        e('#pdp_info_item li[rel="' + t.name + '"]').remove();
                        n.remove(t);
                        canvasEvents.renderall()
                    }
                }, moveObject: function (e) {
                    var t = n.getActiveObject();
                    if (t) {
                        if (e == "up") {
                            t.setTop(t.getTop() - 1).setCoords();
                            canvasEvents.renderall()
                        } else if (e == "down") {
                            t.setTop(t.getTop() + 1).setCoords();
                            canvasEvents.renderall()
                        } else if (e == "left") {
                            t.setLeft(t.getLeft() - 1).setCoords();
                            canvasEvents.renderall()
                        } else if (e == "right") {
                            t.setLeft(t.getLeft() + 1).setCoords();
                            canvasEvents.renderall()
                        }
                    }
                }, applyFilter: function (e, t) {
                    var r = n.getActiveObject();
                    r.filters[e] = t;
                    r.applyFilters(n.renderAll.bind(n))
                }, changeColor: function (e) {
                    var t = n.getActiveObject();
                    if (!t)
                        return;
                    if (t.text || t.type == "path") {
                        if (e == "transparent") {
                            t.set("fill", "#FFF")
                        } else {
                            t.set("fill", e)
                        }
                    } else {
                        if (e == "transparent") {
                            t.set("fill", "#111")
                        } else {
                            t.set("fill", e)
                        }
                    }
                    canvasEvents.renderall()
                }, save_png: function (t, n, i) {
                    if (!fabric.Canvas.supports("toDataURL")) {
                        alert("This browser doesn't provide means to serialize canvas to an image")
                    } else {
                        canvasEvents.clearSelected();
                        var s = n.split(",");
                        e("#pdp_result_2").html('<canvas id="canvas_export_2"></canvas>');
                        e("#canvas_export_2").attr({width: s[0], height: s[1]});
                        var o = new fabric.Canvas("canvas_export_2", {opacity: 1});
                        var u = JSON.parse(r[i]);
                        var a = u.objects;
                        for (var f = 0; f < a.length; f++) {
                            var l = fabric.util.getKlass(a[f].type);
                            if (l.async) {
                                l.fromObject(a[f], function (e) {
                                    o.add(e)
                                })
                            } else {
                                o.add(l.fromObject(a[f]))
                            }
                        }
                        o.renderAll();
                        e("#pdp_canvas_result").html('<canvas id="canvas_export"></canvas>');
                        e("#canvas_export").attr({width: s[4], height: s[5]});
                        var c = new fabric.Canvas("canvas_export", {opacity: 1});
                        c.setBackgroundImage(t, c.renderAll.bind(c));
                        fabric.Image.fromURL(o.toDataURL("png"), function (e) {
                            e.set({left: parseFloat(s[3]), top: parseFloat(s[2]), width: s[0], height: s[1], angle: 0, selectable: false});
                            e.transparentCorners = true;
                            e.cornerSize = 10;
                            e.scale(1).setCoords();
                            c.add(e)
                        });
                        c.renderAll();
                        e("#pdp_canvas_result").animate({opacity: 1}, 600, function () {
                            e("#pdp_side_items li:eq(" + i + ")").children("img").attr("src", c.toDataURL("png"))
                        })
                    }
                }, isRenderFinished: function () {
                    if (e("#pdp_side_items li.rendered").length == e("#pdp_side_items li").length) {
                        clearTimeout(f);
                        canvasEvents.actionAfterRendered();
                        return
                    }
                    f = setTimeout(canvasEvents.isRenderFinished, o)
                }, resetBeforeRender: function () {
                    e("#pdp_side_items li").removeClass("rendered")
                }, actionAfterRendered: function () {
                    var t = e("#temp_action").val();
                    switch (t) {
                        case"SAVE_ADMIN_TEMPLATE":
                            canvasEvents.saveJsonFileAndImage();
                            break;
                        case"PREVIEW":
                            e("#pdp2_zoom_content").remove();
                            e("#pdp_design_popup").append('<div id="pdp2_zoom_content"><span class="inlay"></span><div id="pdp2_zoom_img"><img src="' + e("#pdp_side_items li.active img").attr("src") + '" /><span class="close"></span></div></div>');
                            e("body").on("click", "#pdp2_zoom_content .close", function () {
                                e("#pdp2_zoom_content").hide()
                            });
                            e("#pdp2_zoom_img img").attr("src", e("#pdp_side_items li.active img").attr("src"));
                            e("#pdp2_zoom_content").show();
                            e(".pdploading").hide();
                            break;
                        case"SHARE":
                            canvasEvents.saveJsonBeforeShare();
                            break;
                        case"DOWNLOAD":
                            e("#pdp2_zoom_content").remove();
                            e("#pdp_design_popup").append('<div id="pdp2_zoom_content"><span class="inlay"></span><div id="pdp2_zoom_img"><img src="' + e("#pdp_side_items li.active img").attr("src") + '" /><a id="export_image" href="">Press this button to download and close</a></div></div>');
                            e("#pdp2_zoom_img img").attr("src", e("#pdp_side_items li.active img").attr("src"));
                            e("#pdp2_zoom_content").show();
                            e("#export_image").attr("href", e("#pdp_side_items .active img").attr("src"));
                            var n = "Customize-product-" + e("#current_product_id").val() + "-" + e("#pdp_side_items .active").attr("id") + ".png";
                            e("#export_image").attr("download", n);
                            if (e("#is_backend").length) {
                                e("#pdp2_zoom_content_backend").remove();
                                e("body").append("<div id='pdp2_zoom_content_backend'></div>");
                                e("#pdp2_zoom_content_backend").html(e("#pdp2_zoom_content").parent().html())
                            }
                            e("body").on("click", "#export_image", function () {
                                e("#pdp2_zoom_content").hide();
                                e("#pdp2_zoom_content_backend").html("")
                            });
                            e(".pdploading").hide();
                            break;
                        default:
                            console.log("Current Action" + t, "Do nothing");
                            break
                        }
                }, save_design2: function (n) {
                    if (n !== true) {
                        return false
                    }
                    var i = "";
                    if (!fabric.Canvas.supports("toDataURL")) {
                        alert("This browser doesn't provide means to serialize canvas to an image")
                    } else {
                        canvasEvents.resetBeforeRender();
                        a = {};
                        var s;
                        e("#pdp_side_items li").each(function (n, i) {
                            s = JSON.parse(r[n]);
                            var u = document.getElementById("thumbnail_" + this.id.replace("side_", ""));
                            a[this.id] = {temp_canvas: null, final_canvas: null, json: s, background: t + "media/pdp/images/" + e(this).attr("side_img"), inlay_info: e(this).attr("inlay").split(","), final_canvas_width: u.naturalWidth, final_canvas_height: u.naturalHeight};
                            canvasEvents.renderSide(e(this), this.id, o)
                        });
                        f = setTimeout(canvasEvents.isRenderFinished, o)
                    }
                }, renderSide: function (t, n, r) {
                    e(".pdploading").show();
                    e("#temp_canvas_" + n).remove();
                    e("#final_canvas_" + n).remove();
                    e("#pdp_canvas_result").append('<canvas id="temp_canvas_' + n + '"></canvas><canvas id="final_canvas_' + n + '"></canvas>');
                    e("#final_canvas_" + n).attr({width: a[n]["final_canvas_width"], height: a[n]["final_canvas_height"]});
                    e("#temp_canvas_" + n).attr({width: a[n]["inlay_info"][0], height: a[n]["inlay_info"][1]});
                    a[n]["final_canvas"] = new fabric.Canvas("final_canvas_" + n, {opacity: 1});
                    a[n]["temp_canvas"] = new fabric.Canvas("temp_canvas_" + n, {opacity: 1});
                    a[n]["final_canvas"].setBackgroundImage(a[n]["background"], a[n]["final_canvas"].renderAll.bind(a[n]["final_canvas"]));
                    var i = a[n]["json"].objects;
                    fabric.util.enlivenObjects(i, function (e) {
                        var t = a[n]["temp_canvas"].renderOnAddRemove;
                        a[n]["temp_canvas"].renderOnAddRemove = false;
                        a[n]["temp_canvas"].stateful = false;
                        e.forEach(function (e) {
                            a[n]["temp_canvas"].add(e)
                        });
                        a[n]["temp_canvas"].renderOnAddRemove = t
                    });
                    a[n]["temp_canvas"].renderAll();
                    setTimeout(function () {
                        fabric.Image.fromURL(a[n]["temp_canvas"].toDataURL("png"), function (e) {
                            e.set({left: parseFloat(a[n]["inlay_info"][3]), top: parseFloat(a[n]["inlay_info"][2]), width: a[n]["inlay_info"][0], height: a[n]["inlay_info"][1], angle: 0, selectable: false});
                            e.transparentCorners = true;
                            e.cornerSize = 10;
                            e.scale(1).setCoords();
                            a[n]["final_canvas"].renderOnAddRemove = false;
                            a[n]["final_canvas"].stateful = false;
                            a[n]["final_canvas"].add(e);
                            a[n]["final_canvas"].renderAll();
                            t.children("img").attr("src", a[n]["final_canvas"].toDataURL("png"));
                            t.addClass("rendered")
                        })
                    }, o)
                }, saveJsonFileAndImage: function () {
                    canvasEvents.clearSelected();
                    var n = e("#skin_url").val(), i = e("#base_dir").val(), s = 0;
                    mitem = parseInt(e("#pdp_side_items li").length), dt = {items: []};
                    var o = new Array;
                    e("#pdp_side_items li").each(function () {
                        var n = e(this).index(), r = e(this).children("img").attr("src"), s = r.split(":");
                        if (s[0] == "data") {
                            var u = {base_dir: i, data: r, index: n}, a = t + "js/pdp/saveanimage.php", f = PDPAction.deferredRequest(a, u, function (t) {
                                var n = JSON.parse(t);
                                e("#pdp_side_items li:eq(" + n.index + ")").children("img").attr("src", n.path)
                            });
                            o.push(f)
                        }
                    });
                    e.when.apply(null, o).done(function () {
                        e("#pdp_side_items li").each(function () {
                            item = {side_name: e(this).attr("label"), side_img: e(this).attr("side_img"), json: r[e(this).index()], image_result: e(this).find("img").attr("src"), final_price: e("#pdp_total_layer_price .layer_pricing").attr("pr")};
                            dt.items.push(item)
                        });
                        var n = t + "index.php/pdp/index/saveJsonfile";
                        var i = JSON.stringify(dt);
                        if (i != "") {
                            var s = true;
                            try {
                                var o = JSON.parse(i)
                            } catch (u) {
                                s = false
                            }
                            if (s) {
                                var a = false;
                                if (e("#is_backend").length) {
                                    a = true
                                }
                                var f = PDPAction.deferredRequest(n, {json_file: i}, function (t) {
                                    var n = e.parseJSON(t);
                                    e("input[name='extra_options']").val(n.filename)
                                });
                                e.when(f).done(function (t) {
                                    e(".pdploading").hide();
                                    if (!a) {
                                        e("#pdp_design_popup").hide(500);
                                        e(".product-view .product-img-box .product-image img").attr("src", e("#pdp_side_items li:eq(0)").children("img").attr("src"));
                                        e(".product-view .product-img-box .product-image").append('<span class="loadinggif"></span>');
                                        e(".product-view .product-img-box .product-image img").load(function () {
                                            e(".product-view .product-img-box .product-image .loadinggif").remove()
                                        });
                                        if (mitem > 1) {
                                            e(".more-views").remove();
                                            if (e(".product-view .product-img-box .pdp_more_view").length == 0) {
                                                e(".product-view .product-img-box").append('<div class="more-views"><h2>More View</h2><ul class="pdp_more_view"></ul></div>')
                                            } else {
                                                e(".pdp_more_view").html("")
                                            }
                                        }
                                        e("#pdp_side_items li").each(function () {
                                            e(".pdp_more_view").append('<li><img class="pdp-thumb" width="56" height="56" src="' + e(this).find("img").attr("src") + '" /></li>')
                                        });
                                        e(".pdp_more_view li img").click(function () {
                                            e(".product-view .product-img-box .product-image img").attr("src", e(this).attr("src"))
                                        });
                                        if (e("#product_price_config").length) {
                                            var n = JSON.parse(e("#product_price_config").val());
                                            var r = parseFloat(e("#pdp_total_layer_price .layer_pricing").attr("pr"));
                                            n.productPrice = n.productPrice + r;
                                            n.productOldPrice = n.productOldPrice + r;
                                            optionsPrice = new Product.OptionsPrice(n);
                                            try {
                                                optionsPrice.reload()
                                            } catch (i) {
                                                console.log(i)
                                            }
                                        }
                                    } else {
                                        var s = e("#url_site").val() + "pdp/index/saveAdminTemplate", o = e("#current_product_id").val(), u = {product_id: o, pdp_design: e("input[name='extra_options']").val()};
                                        PDPAction.doRequest(s, u, function (t) {
                                            if (window.top.Windows !== undefined) {
                                                window.top.Windows.closeAll()
                                            } else {
                                                e(".pdploading").hide()
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    })
                }, saveJsonBeforeShare: function () {
                    canvasEvents.clearSelected();
                    var n = e("#skin_url").val(), i = e("#base_dir").val(), s = 0;
                    mitem = parseInt(e("#pdp_side_items li").length), price = e("#pdp_total_layer_price .layer_pricing").attr("pr"), dt = {items: []};
                    var o = new Array;
                    e("#pdp_side_items li").each(function () {
                        var n = e(this).index(), r = e(this).children("img").attr("src"), s = r.split(":");
                        if (s[0] == "data") {
                            var u = {base_dir: i, data: r, index: n}, a = t + "js/pdp/saveanimage.php", f = PDPAction.deferredRequest(a, u, function (t) {
                                var n = JSON.parse(t);
                                e("#pdp_side_items li:eq(" + n.index + ")").children("img").attr("src", n.path)
                            });
                            o.push(f)
                        }
                    });
                    e.when.apply(null, o).done(function () {
                        e("#pdp_side_items li").each(function () {
                            item = {side_name: e(this).attr("label"), side_img: e(this).attr("side_img"), json: r[e(this).index()], image_result: e(this).find("img").attr("src")};
                            dt.items.push(item)
                        });
                        var n = t + "index.php/pdp/index/saveJsonfile";
                        var i = JSON.stringify(dt);
                        if (i != "") {
                            var s = true;
                            try {
                                var o = JSON.parse(i)
                            } catch (u) {
                                s = false
                            }
                            if (s) {
                                var a = PDPAction.deferredRequest(n, {json_file: i}, function (t) {
                                    var n = e.parseJSON(t);
                                    e("input[name='share_json']").val(n.filename)
                                });
                                e.when(a).done(function (t) {
                                    e(".pdploading").hide();
                                    var n = e("#save_design_url").val(), r = e("#current_product_id").val(), i = {product_id: r, pdpdesign: e("input[name='share_json']").val(), url: e("#product_url").val()};
                                    PDPAction.doRequest(n, i, function (t) {
                                        var n = e.parseJSON(t);
                                        var r = e.parseJSON(n.final_images);
                                        e(".pinterest-share-thumbnail").html("");
                                        if (r.length) {
                                            e.each(r, function (t, n) {
                                                console.log(n);
                                                var r = '<img src="' + n.image + '"/>';
                                                e(".pinterest-share-thumbnail").append(r)
                                            })
                                        }
                                        for (var i = 0; i < addthis.links.length; i++) {
                                            addthis.links[i].share.url = n.url
                                        }
                                        var s = {image_container: ".pinterest-share-thumbnail"};
                                        e(".pdploading").hide();
                                        e(".pdp_share_buttons").animate({height: "55px"}, "fast");
                                        setTimeout(function () {
                                            e(".pdp_share_buttons").css({opacity: "1"})
                                        }, 700);
                                        e(".pdp_share_buttons").slideToggle("fast")
                                    })
                                })
                            }
                        }
                    })
                }, save_design: function (r, i, s) {
                    e("#save_design").addClass("loading");
                    var o = "";
                    if (!fabric.Canvas.supports("toDataURL")) {
                        alert("This browser doesn't provide means to serialize canvas to an image")
                    } else {
                        var u = t + "media/pdp/images/" + e("#pdp_side_items li:eq(" + r + ")").attr("side_img"), a = e("#pdp_side_items li:eq(" + r + ")").attr("inlay");
                        canvasEvents.clearSelected();
                        var f = a.split(",");
                        e("#pdp_canvas_result").html('<canvas id="canvas_export"></canvas>');
                        e("#canvas_export").attr({width: i, height: s});
                        var l = new fabric.Canvas("canvas_export", {opacity: 1});
                        l.setBackgroundImage(u, l.renderAll.bind(l));
                        fabric.Image.fromURL(n.toDataURL("png"), function (e) {
                            e.set({left: parseFloat(f[3]), top: parseFloat(f[2]), width: f[0], height: f[1], angle: 0, selectable: false});
                            e.transparentCorners = true;
                            e.cornerSize = 10;
                            e.scale(1).setCoords();
                            l.add(e)
                        });
                        l.renderAll();
                        e("#pdp_result").animate({opacity: 1}, 600, function () {
                            e("#save_design").removeClass("loading");
                            e("#pdp_side_items li:eq(" + r + ")").children("img").attr("src", l.toDataURL("png"));
                            e("#pdp_result").html("")
                        })
                    }
                }, save_design_json: function () {
                    var t = {title: e(".product-title").html(), sides: []};
                    e("#pdp_side_items li").each(function () {
                        var n = {label: e(this).attr("label"), inlay: e(this).attr("inlay"), img: e(this).attr("side_img"), thumnail: e(this).children("img").attr("src"), canvas: r[e(this).index()]};
                        t.sides.push(n)
                    });
                    return JSON.stringify(t)
                }, saveSampleDesign: function () {
                    e("#save_sample_design").click(function () {
                        var t = canvasEvents.save_design_json();
                        e.ajax({type: "POST", url: e("#url_site").val() + "index.php/pdp/view/saveSampleDesign", data: {json_string: t}, beforeSend: function () {
                            }, error: function () {
                                console.log("Something went wrong...!")
                            }, success: function (t) {
                                var n = e.parseJSON(t);
                                if (n.success) {
                                    alert(n.message)
                                }
                                if (n.error) {
                                    alert(n.message)
                                }
                            }})
                    })
                }, centerCanvas: function () {
                    var t = e(".wrapper_pdp").width(), n = e(".wrap_inlay_center").width();
                    e(".wrap_inlay_center").css("margin-left", (t - n) / 2 + "px")
                }, downloadSideImage: function () {
                    e("#download_image").click(function () {
                        var n = e("#temp_action").val("DOWNLOAD");
                        var i = e("#pdp_side_items li.active");
                        var s = JSON.parse(r[i.index()]);
                        var u = document.getElementById("thumbnail_" + i.attr("id").replace("side_", ""));
                        a[i.attr("id")] = {temp_canvas: null, final_canvas: null, json: s, background: t + "media/pdp/images/" + i.attr("side_img"), inlay_info: e(i).attr("inlay").split(","), final_canvas_width: u.naturalWidth, final_canvas_height: u.naturalHeight};
                        canvasEvents.resetBeforeRender();
                        e("#pdp_side_items li").not(".active").addClass("rendered");
                        canvasEvents.renderSide(i, i.attr("id"), o);
                        f = setTimeout(canvasEvents.isRenderFinished, o)
                    })
                }()};
            e("#pdp2_zoom").click(function () {
                var n = e("#temp_action").val("PREVIEW");
                var i = e("#pdp_side_items li.active");
                var s = JSON.parse(r[i.index()]);
                var u = document.getElementById("thumbnail_" + i.attr("id").replace("side_", ""));
                a[i.attr("id")] = {temp_canvas: null, final_canvas: null, json: s, background: t + "media/pdp/images/" + i.attr("side_img"), inlay_info: e(i).attr("inlay").split(","), final_canvas_width: u.naturalWidth, final_canvas_height: u.naturalHeight};
                canvasEvents.resetBeforeRender();
                e("#pdp_side_items li").not(".active").addClass("rendered");
                canvasEvents.renderSide(i, i.attr("id"), o);
                f = setTimeout(canvasEvents.isRenderFinished, o)
            });
            e('#font_color_list li a[rel="000000"]').addClass("active");
            e(".pdp_design_color").prepend('<li id="pdp_color_ori" name="pdp_color_ori" class="active"></li>');
            e(".pdp_design_color li").click(function () {
                e(".pdp_design_color li.active").removeClass("active");
                e(this).addClass("active");
                e("#pdp_side_items li").each(function () {
                    var n = e(this).attr("tab"), r = e(".pdp_design_color li.active").attr(n);
                    e(this).attr("side_img", r).children("img").attr("src", t + "media/pdp/images/" + r)
                });
                PDPsetting.change_image()
            });
            e("#prices_layer tbody").on("click", "tr", function () {
                if (!e(this).hasClass("active")) {
                    e(".prices_layer tbody tr.active").removeClass("active");
                    e(this).addClass("active")
                }
                canvasEvents.activeobj(e(this).attr("rel"))
            });
            var s = e("#pdp_side_items li").length;
            if (s == 1) {
                e("#pdp_rotate_item, #rotate-180").hide()
            }
            e("#save_design").click(function (t) {
                e("#temp_action").val("SAVE_ADMIN_TEMPLATE");
                canvasEvents.save_design2(true)
            });
            e("body").on("click", "#pdp_share", function (t) {
                e("#temp_action").val("SHARE");
                canvasEvents.save_design2(true)
            });
            setting = {color: "#000", border: "#88AFFB", padding: 5, cornerSize: 8, center_canvas: function () {
                    var t = e(".wrap_pdp_design").width();
                    e(".product-image").each(function () {
                        e(".product-image").hide();
                        e(this).show();
                        var n = e(this).find(".wrap_inlay_center img").width();
                        e(this).find(".wrap_inlay_center").css({"margin-left": (t - n) / 2 + "px", "float": "left"})
                    });
                    e(".product-image:not(.act)").hide();
                    e(".product-image.act").show();
                    canvasEvents.renderall()
                }, first_category: function () {
                    var t = e("#image_category_list li:eq(0) span").text();
                    e(".pdp_selected_category").html(t)
                }, active_slider: function () {
                    e("#h-shadow").noUiSlider({range: [-50, 50], start: [0], handles: 1, slide: function () {
                            canvasEvents.editShadowItem()
                        }});
                    e("#v-shadow").noUiSlider({range: [-50, 50], start: [0], handles: 1, slide: function () {
                            canvasEvents.editShadowItem()
                        }});
                    e("#t-blur").noUiSlider({range: [0, 50], start: [0], handles: 1, slide: function () {
                            canvasEvents.editShadowItem()
                        }});
                    e("#pdp_opacity_input").noUiSlider({range: [0, 10], start: [10], handles: 1, slide: function () {
                            var t = e(this).val() / 10;
                            var r = n.getActiveObject();
                            if (!r)
                                return;
                            r.set("opacity", t);
                            if (r.type == "curvedText") {
                                r.setOpacity(r.text, t)
                            }
                            n.calcOffset().renderAll()
                        }, serialization: {}});
                    e("#pdp_opacity_input,#v-shadow,#t-blur,#h-shadow").change(function () {
                        canvasEvents.renderall()
                    });
                    e("#pdp_font_size_input").noUiSlider({range: [1, 200], start: [20], handles: 1, slide: function () {
                            e("#pdp_font_size_value").html(parseInt(e(this).val()) + "px")
                        }});
                    e("#pdp_font_size_input").change(function () {
                        canvasEvents.editText()
                    });
                    e("#font_color").click(function () {
                        e("#font_color_colorpicker").toggle()
                    });
                    e("#pdp_edit_text_line_height_input").noUiSlider({range: [1, 100], start: [13], handles: 1, slide: function () {
                            canvasEvents.editText();
                            e("#pdp_font_line_height_value").html(parseInt(e(this).val()) + "px")
                        }});
                    e("#font_outline_colorpicker").farbtastic(function (t) {
                        e("#font_outline_color_value").css("background-color", t);
                        canvasEvents.editShadowItem();
                        e("#font_outline_color_value").val(t)
                    });
                    e("#font_color_colorpicker").farbtastic(function (t) {
                        e("#font_color").css("color", t);
                        canvasEvents.changeColor(t)
                    })
                }};
            setting.first_category();
            setting.active_slider();
            e(".size_qty, #select_font_size, #h-shadow, #v-shadow, #t-blur").ForceNumericOnly();
            var l;
            if (e("#pdp_side_items li.active").length > 0) {
                l = e("#pdp_side_items li.active")
            } else {
                l = e("#pdp_side_items li:eq(0)")
            }
            e("#select_font li").each(function () {
                e(this).css("font-family", e(this).attr("rel"))
            });
            e("#select_font li").click(function () {
                e("#select_font li.active").removeClass("active");
                e(this).addClass("active");
                canvasEvents.editText()
            });
            PDPsetting.center_design_area();
            l.addClass("active");
            var c = l.attr("inlay").split(",");
            e("#wrap_inlay").css({width: c[0] + "px", height: c[1] + "px", top: c[2] + "px", left: c[3] + "px"});
            e("#canvas_area").attr({width: c[0], height: c[1]});
            n = new fabric.Canvas("canvas_area", {});
            e("#pdp_side_items li").each(function () {
                e(".wrapper_pdp").append(e(this).children("img").clone().addClass("pdp_img_session_" + e(this).index()).removeAttr("width").hide());
                e("#pdp_color_ori").attr(e(this).attr("tab"), e(this).attr("side_img"));
                r[e(this).index()] = JSON.stringify(n.toJSON(["name", "price", "tcolor", "isrc", "icolor", "id"]))
            });
            var h = "";
            if (e("input[name=pdp_design_string]").length) {
                if (e("input[name=pdp_design_string]").val() != "") {
                    h = JSON.parse(e("input[name=pdp_design_string]").val())
                }
            }
            if (e("#cart_item_id").length) {
                if (e("#cart_item_id").val() != "" || e("#wishlist_item_id").val() != "") {
                    if (e("#extra_options_value").val()) {
                        h = JSON.parse(e("#extra_options_value").val())
                    }
                }
            }
            if (h != "" && h != undefined) {
                e(".pdp_design_color li.active").removeClass("active");
                e(".pdp_design_color li[" + e("#pdp_side_items li:eq(0)").attr("tab") + '="' + h.items[0].side_img + '"]').addClass("active");
                for (i = 0; i < h.items.length; i++) {
                    r[i] = h.items[i].json
                }
            }
            e("#main_image").addClass("loaded");
            e("#main_image").load(function () {
                if (e("#main_image").hasClass("loaded")) {
                    canvasEvents.load_json(r[0]);
                    e("#wrap_inlay").attr("tab", e("#pdp_side_items li:eq(0)").attr("tab"));
                    e("#main_image").removeClass("loaded");
                    e(".pdp_design_color li.active").click();
                    canvasEvents.addlayer_first_time()
                }
            });
            e("#edit_item_wrap .item").click(function () {
                e("#edit_item_wrap .item.active").removeClass("active");
                if (e(this).css("opacity") == 1) {
                    e(this).toggleClass("active");
                    var t = e(this).attr("tab");
                    e(".pdp_extra_item:not(#" + t + ")").slideUp(500);
                    e("#" + t).slideToggle(500)
                } else {
                    e(".pdp_extra_item").slideUp(500)
                }
            });
            e("#pdp2_curved_text_reverse").click(function () {
                var t = n.getActiveObject();
                if (t) {
                    t.set("reverse", e(this).is(":checked"));
                    canvasEvents.renderall()
                }
            });
            e("#pdp2_curved_text_radius").noUiSlider({range: [1, 200], start: [100], handles: 1, slide: function () {
                    e("#pdp2_curved_text_radius_value").val(e(this).val())
                }});
            e("#pdp2_curved_text_done").click(function () {
                var t = e("#pdp2_curved_text").val();
                var r = n.getActiveObject();
                if (!r)
                    return;
                r.setText(t);
                canvasEvents.editText();
                canvasEvents.renderall()
            });
            e("#pdp2_curved_text_radius_value").ForceNumericOnly();
            e("#pdp2_curved_text_radius_value").change(function () {
                e("#pdp2_curved_text_radius").val(e(this).val());
                canvasEvents.editText()
            });
            e("#pdp2_curved_text_spacing").noUiSlider({range: [1, 50], start: [15], handles: 1, slide: function () {
                    e("#pdp2_curved_text_spacing_value").val(e(this).val())
                }});
            e("#pdp2_curved_text_spacing_value").ForceNumericOnly();
            e("#pdp2_curved_text_spacing_value").change(function () {
                e("#pdp2_curved_text_spacing").val(e(this).val());
                canvasEvents.editText()
            });
            e("#pdp2_curved_text_radius, #pdp2_curved_text_spacing").change(function () {
                var t = n.getActiveObject();
                if (t) {
                    if (e(this).attr("id") == "pdp2_curved_text_radius") {
                        t.set("radius", e(this).val())
                    }
                    if (e(this).attr("id") == "pdp2_curved_text_spacing") {
                        t.set("spacing", e(this).val())
                    }
                    canvasEvents.renderall()
                }
            });
            e("#icon_list, #lists_img_upload, #photos_album").on("click", "img", function () {
                var t = e(this).attr("src"), r = t.split("."), i = e(this).width(), s = t.split("/"), o = e(this).attr("image_name"), u = e(this).attr("id"), a = e(this).attr("color_type"), f = e(this).attr("color");
                himg = e(this).height();
                if (!e(this).hasClass("added_color")) {
                    e(this).addClass("added_color");
                    if (a == 2) {
                        canvasEvents.makelistcolor(f, u)
                    }
                }
                var l = e(this).attr("price");
                if (l == undefined) {
                    var c = {};
                    c.clipart_price = 0;
                    if (e("#pdc_product_config").length) {
                        c = JSON.parse(e("#pdc_product_config").val())
                    }
                    l = c.clipart_price
                }
                e("#design_control .tab_content:not(#pdp_rotate_item)").slideUp(200);
                if (r[r.length - 1] != "svg") {
                    fabric.Image.fromURL(t, function (e) {
                        var r = p(n.width, n.height, e.width, e.height);
                        e.set({angle: 0, price: l, id: u, isrc: t, tcolor: a, icolor: s[s.length - 1], width: r.width, height: r.height, padding: setting.padding});
                        e.transparentCorners = true;
                        e.cornerSize = 10;
                        e.scale(1).setCoords();
                        n.centerObject(e);
                        n.add(e).setActiveObject(e);
                        canvasEvents.addlayer()
                    })
                } else {
                    canvasEvents.addSvg(t, e(this).attr("price"), o, a, f, u)
                }
            });
            e("#edit_item_wrap").owlCarousel({items: 10, itemsDesktop: [1e3, 7], itemsDesktopSmall: [900, 4], itemsTablet: [600, 2], itemsMobile: [340, 1], lazyLoad: true, navigation: true, navigationText: ["&#xf053;", "&#xf054;"]});
            e(".add_artwork > a").on("click", function () {
                e(".tab_content:not(#select_image, #pdp_rotate_item)").slideUp(0);
                e("#select_image").slideToggle(0)
            });
            e(".add_text > a").on("click", function () {
                e("#add_text").slideToggle(0);
                e("#font_outline_colorpicker").hide();
                e(".tab_content:not(#add_text, #pdp_rotate_item), .pdp_extra_item").slideUp(0);
                e(".pdp_text_list li.active").removeClass("active")
            });
            e(".pdp_close").click(function () {
                e(this).parents(".tab_content").slideUp(0)
            });
            e(".pdp_text_list ul li").click(function () {
                e(".pdp_text_list ul li.active").removeClass("active");
                e("#add_text_input").val(e(this).text());
                e(this).addClass("active")
            });
            e(".pdp_text_list ul li.active").click(function () {
                e("#add_text_action").click()
            });
            e(".pdp2_close").click(function () {
                e("#pdp_design_popup").hide()
            });
            e("#pdp_side_items li").click(function () {
                canvasEvents.clearSelected();
                if (e(this).hasClass("active")) {
                    return
                }
                e("#pdp_side_items li.active").removeClass("active");
                e(this).addClass("active");
                var t = e(this).attr("tab"), i = e("#wrap_inlay").attr("tab"), s = e("#pdp_side_items li[tab=" + i + "]").index();
                if (e(".product-image.act .wrap_inlay_center").attr("tab") != t) {
                    e("#wrap_inlay").attr("tab", t);
                    r[s] = JSON.stringify(n.toJSON(["name", "price", "tcolor", "isrc", "icolor", "id"]));
                    canvasEvents.reset_canvas(t)
                }
            });
            e("#rotate-180").click(function () {
                e("#pdp_rotate_item").slideToggle(400);
                e(".tab_content:not(#pdp_rotate_item)").slideUp(300)
            });
            e("#pdp_edit_text_tab a").click(function () {
                e("#pdp_edit_text_tab a.active").removeClass("active");
                e(this).addClass("active");
                e(".pdp_edit_text_tab_content").slideUp(300);
                e("#" + e(this).attr("tab")).slideDown(400)
            });
            e(".pdp_edit_font_style li a.text").click(function () {
                e(this).toggleClass("active");
                canvasEvents.editText()
            });
            e("#pdp_search_text").keyup(function () {
                var t = e(this).val().toUpperCase();
                e(".pdp_text_list li").each(function () {
                    if (e(this).text().toUpperCase().indexOf(t) >= 0) {
                        e(this).show()
                    } else {
                        e(this).hide()
                    }
                })
            });
            e("#pdp_edit_text_style li a.align").click(function () {
                e("#pdp_edit_text_style li a.align.active").removeClass("active");
                e(this).addClass("active");
                canvasEvents.editText()
            });
            e("#pdp_font_size_value").ForceNumericOnly();
            e("#pdp_font_size_value").change(function () {
                e("#pdp_font_size_input").val(e(this).val());
                var t = n.getActiveObject();
                if (!t)
                    return;
                canvasEvents.editText()
            });
            e(".wrapper_pdp .product-image").click(function () {
                e(".wrapper_pdp .product-image.act").removeClass("act");
                e(this).addClass("act")
            });
            e(".tshirt-size input").change(function () {
                if (e(this).val() == "" || e(this).val() < 0) {
                    e(this).val(0)
                }
                e(this).val(parseInt(e(this).val()))
            });
            e("#design_control .control_tab .tab_main").click(function () {
                var t = e(this).attr("tab");
                e("#design_control .control_tab .tab_main.active").removeClass("active");
                e(this).addClass("active");
                e("." + t).show()
            });
            e(".tab_design_image a").click(function () {
                e(".tab_design_image .active").removeClass("active");
                e(this).addClass("active");
                var t = e(this).attr("tab-content");
                e(".content_tab > div").hide();
                e(".content_tab ." + t).show()
            });
            e("#add_text_action").click(function () {
                var t = e("#add_text_input").val(), n = e(".pdp_text_list li.active").text();
                if (n != "") {
                    canvasEvents.addText(n)
                } else {
                    if (t != "") {
                        canvasEvents.addText(t)
                    }
                }
            });
            e("#add_text_curved_action").click(function () {
                var t = e("#add_text_input").val(), n = e(".pdp_text_list li.active").text();
                if (n != "") {
                    canvasEvents.addTextCurved(n)
                } else {
                    if (t != "") {
                        canvasEvents.addTextCurved(t)
                    }
                }
            });
            e("#use_shadow").click(function () {
                if (!e(this).hasClass("active")) {
                    e(".font_outline_color > div").show();
                    canvasEvents.addShadowItem();
                    e(this).addClass("active")
                } else {
                    e(".font_outline_color > div:not(.use_shadow)").hide();
                    canvasEvents.removeShadow();
                    e(this).removeClass("active")
                }
                e("#font_outline_colorpicker").hide()
            });
            e(".change_font .next_t").click(function () {
                var t = e(this).prev().val();
                e(this).prev().val(parseInt(t) + 1);
                canvasEvents.editText()
            });
            e(".change_font .prev_t").click(function () {
                var t = e(this).next().val();
                if (e(this).next().attr("id") == "t-blur" && t == 0) {
                } else {
                    if (e(this).next().attr("id") == "select_font_size" && t < 3) {
                    } else {
                        e(this).next().val(parseInt(t) - 1)
                    }
                }
                canvasEvents.editText()
            });
            e("#pdp_edit_text_input").keyup(function () {
                canvasEvents.editText()
            });
            e("#image_category_list, #select_image").show();
            var d = e("#image_category_list").height();
            e("#image_category_list, #select_image").hide();
            e(".design_label").click(function () {
                e("#image_category_list").slideToggle(0)
            });
            e("#font_outline_color").click(function () {
                e("#font_outline_colorpicker").slideToggle(300)
            });
            e(".inlay_div.color, .color_content_wrap .bt_done").click(function () {
                e(".color_content").hide();
                e("#pdp_color_text").removeClass("pdp_cr_color");
                e(".color_display").removeClass("act")
            });
            e("#pdp_color_text li a").click(function () {
                e("#pdp_color_text li a.active").removeClass("active");
                e(this).addClass("active");
                var t = e(this).css("background-color");
                canvasEvents.changeColor(t)
            });
            e("#pdp_color_item li a").click(function () {
                e("#pdp_color_item li a.active").removeClass("active");
                e(this).addClass("active");
                var t = e(this).css("background-color");
                canvasEvents.changeColor(t)
            });
            e(".color_content li a:not(.selected_color, .bt_done)").click(function () {
                e(".color_content li a.act").removeClass("act");
                e(this).addClass("act");
                var t;
                if (e(this).hasClass("pdp_color_ori")) {
                    t = "ori";
                    e("#selected_color").val("");
                    e(".color_display.act").css("background-color", "#FFF")
                } else {
                    t = e(this).css("background-color");
                    e("#selected_color").val(rgb2hex(t));
                    e(".color_display.act").css("background-color", t)
                }
                e("a.selected_color").css("background-color", t);
                var r = n.getActiveObject();
                if (!r)
                    return;
                if (e("#pdp_color_text").hasClass("pdp_cr_color")) {
                    e("#pdp_color_text input").val("#" + rgb2hex(t))
                }
                if (r.text) {
                    canvasEvents.editText()
                }
                if (e("#use_shadow").hasClass("active")) {
                    canvasEvents.editShadowItem();
                    canvasEvents.renderall()
                }
                if (e("#color_item").hasClass("active")) {
                    canvasEvents.changeColor(t)
                }
            });
            e("#selected_color").change(function () {
                e("a.selected_color").css("background-color", "#" + e(this).val())
            });
            var v = e("#send-backwards");
            v.on("click", function (e) {
                var t = e.getActiveObject();
                if (t) {
                    e.sendBackwards(t)
                }
            });
            var g = e("#send-to-back");
            g.on("click", function (e) {
                var t = e.getActiveObject();
                if (t) {
                    e.sendToBack(t)
                }
            });
            var y = e("#bring-forward");
            y.on("click", function (e) {
                var t = e.getActiveObject();
                if (t) {
                    e.bringForward(t)
                }
            });
            var b = e("#bring-to-front");
            b.on("click", function (e) {
                var t = e.getActiveObject();
                if (t) {
                    e.bringToFront(t)
                }
            });
            var g = e("#move_to_back");
            g.on("click", function () {
                var e = n.getActiveObject();
                if (e) {
                    n.sendToBack(e)
                }
            });
            var y = e("#move_to_front");
            y.on("click", function () {
                var e = n.getActiveObject();
                if (e) {
                    n.bringForward(e)
                }
            });
            e("#pdp_flip_x").on("click", canvasEvents.flipX);
            e("#pdp_flip_y").on("click", canvasEvents.flipY);
            e("#delete_item").on("click", canvasEvents.removeObject);
            e("#pdp_toolbox").on("click", ".item_delete", canvasEvents.removeObject);
            e("#duplicate_item").on("click", canvasEvents.copyObject);
            e("html").on("click", function (t) {
                var n = e("#pdp_info_item, #canvas-container, #select_image, #add_text, #canvas_area, .pdp_extra_item, #pdp_opacity_item, .color_content, .control_tab, .canvas-container,#pdp_toolbox, .edit_area , #add_text, .p_rotate_wrap > div, .control_area, #edit_item_wrap").has(t.target).length;
                if (n === 0) {
                    canvasEvents.clearSelected()
                }
                var r = e("#font_outline_colorpicker, #font_outline_color").has(t.target).length;
                if (r === 0) {
                    e("#font_outline_colorpicker").slideUp(200)
                }
                var r = e("#font_color_colorpicker, #font_color, .pdp_color_list").has(t.target).length;
                if (r === 0) {
                    e("#font_color_colorpicker").slideUp(200)
                }
            });
            n.observe("object:selected", canvasEvents.objectSelected);
            n.observe("object:modified", canvasEvents.renderall);
            n.observe("object:modified", canvasEvents.showinfo);
            n.observe("object:added", canvasEvents.renderall);
            n.observe("before:selection:cleared", canvasEvents.objectUnselected);
            e(window).on("keydown", function (t) {
                var n = t.keyCode || t.which;
                if (n == 37) {
                    canvasEvents.moveObject("left");
                    return false
                } else if (n == 38) {
                    canvasEvents.moveObject("up");
                    return false
                } else if (n == 39) {
                    canvasEvents.moveObject("right");
                    return false
                } else if (n == 40) {
                    canvasEvents.moveObject("down");
                    return false
                } else if (n == 46) {
                    var r = e("#pdp_edit_text_input").is(":focus");
                    if (!r) {
                        canvasEvents.removeObject()
                    }
                    return false
                }
            });
            var w = e("#extra_options_value").val();
            if (e("#cart_item_id").val() == "" && e("#wishlist_item_id").val() == "") {
                if (e("input[name='pdp_design_string']").length) {
                    if (e("input[name='pdp_design_string']").val() != "") {
                        w = e("input[name='pdp_design_string']").val()
                    }
                }
            }
            l.addClass("active");
            if (w != "" && w !== undefined) {
                var E = JSON.parse(w);
                if (E.length > 0) {
                    for (i = 0; i < E.length; i++) {
                        e("#pdp_info_" + E[i].name).val(E[i].json);
                        e(".design-color-image li#" + E[i].color).click()
                    }
                }
            } else {
                PDPsetting.save_first_design()
            }
            PDPsetting.change_side()
        }, init_cr_item: function () {
            if (e(".wrap_inlay .item").length > 0) {
                if (e(".design-color-image li.active").length > 0) {
                    e(".design-color-image li.active").click()
                } else {
                    e("#list_color li.active").click()
                }
                e(".wrap_inlay .item").each(function () {
                    PDPsetting.init_design(e(this))
                })
            }
        }, init_design: function (e) {
        }, hideShareButtons: function () {
            var t;
            e("body").on("click", ".wrap_pdp_design", function (n) {
                t = e(n.target).attr("class");
                if (t) {
                    if (t.match("pdp_share_buttons") || t.match("at300bs")) {
                        return false
                    } else {
                    }
                }
                e(".pdp_share_buttons").hide()
            })
        }()}
})