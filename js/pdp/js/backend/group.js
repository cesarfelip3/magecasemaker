var designForm = jQuery.noConflict();
designForm(function($) {
	var baseUrl = $("#base_url").val();
	var mediaUrl = $("#media_url").val();

	var DesignAction = function(selector) {
		this.selector = selector;
		this.position = null;
		this.checkAll = function() {
			$(selector).each(function(){
				$(this).prop('checked', true);
			});
		};
		this.unCheckAll = function() {
			$(selector).each(function(){
				$(this).prop('checked', false);
			});
		};
		this.getSelectedItem = function() {
			var selected = new Array();
			$(selector).each(function() {
				if ($(this).is(':checked')) {
					selected.push($(this).attr('id'));
				}
			});
			return selected;
		};
		this.updatePosition = function(items) {
			
			var data = new Array();
			var posId = posVal = "";
			for (var i =0; i < items.length; i ++) {
				posId = items[i].split('_')[1];
				posVal = $('#' + items[i]).val();
				if ($.inArray(posId, data) == -1) {
					data.push(posId + '_' + posVal);
				}
			}
			this.applyAction('position', data);
		};
		this.deleteItem = function(items) {
			var ids = new Array();
			for (var i = 0; i < items.length; i++) {
				ids.push(items[i].split('_')[1])
			}
			this.applyAction('delete', ids);
		};
		this.disableItem = function(items) {
			var ids = new Array();
			for (var i = 0; i < items.length; i++) {
				ids.push(items[i].split('_')[1])
			}
			this.applyAction('disable', ids);
		};
		this.enableItem = function(items) {
			var ids = new Array();
			for (var i = 0; i < items.length; i++) {
				ids.push(items[i].split('_')[1])
			}
			this.applyAction('enable', ids);
		};
		this.applyAction = function (action, data) {
			$.ajax({
				type : "POST",
				url : baseUrl + 'pdp/index/updateGroup',
				data : {action: action, data: data},
				beforeSend : function () {
					$("#loading-mask").attr("style","left: -2px; top: 0px; width: 1034px; height: 833px;");
					$("#loading-mask").show();
				},
				error : function () {
					console.log('Transfer error!');
				},
				success : function (response) {
					if (response == "") {
						console.log('Done');
						location.reload();
						$('#loading-mask').hide();
					} else {
						alert('There are some errors!');
						location.reload();
					}
				}
			});
		};
	};
	
	var Action = new DesignAction('.pdp-group-item');
	$('#delete_item').click(function() {
		var selected = Action.getSelectedItem();
		if (selected.length > 0) {
			if (!confirm('Are you sure?')) {
				return false;
			}
			Action.deleteItem(selected);
		} else {
			alert('Please select item(s)!');
		}
	});
	
	$('#disable_item').click(function() {
		var selected = Action.getSelectedItem();
		if (selected.length > 0) {
			Action.disableItem(selected);
		} else {
			alert('Please select item(s)!');
		}
	});
	
	$('#enable_item').click(function() {
		var selected = Action.getSelectedItem();
		if (selected.length > 0) {
			Action.enableItem(selected);
		} else {
			alert('Please select item(s)!');
		}
	});
	//Create tab function for tabs design
	$('#add_group_tab a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});
	PDPGroup = {
		init : function() {
			this.resetFilter();
			this.defaultFilter();
			this.pdpGroupFilter();
		},
		saveDesign : function() {
			if ($('#add_group_form').valid()) {
				$('#add_group_form').submit();
			}
		},
		saveAndContinueEdit : function(id) {
			var saveAndEdit = "<input type='hidden' value='Yes' name='save_and_continue_edit' />";
			$('#add_group_form').append(saveAndEdit);
			if ($('#add_group_form').valid()) {
				$('#add_group_form').submit();
			}
		}, 
		resetFilter : function() {
			$("#pdp_reset_filter").click(function() {
				PDPGroup.showAndHidePdpGroup('all_item');
			});
		},
		pdpGroupFilter : function() {
			var filter_by;
			$("#pdp_group_filter").change(function() {
				filter_by = $(this).val();
				PDPGroup.showAndHidePdpGroup(filter_by);
			});
		},
		showAndHidePdpGroup : function (filter_by) {
			$("#pdp_group_filter").val(filter_by);
			switch (filter_by) {
				case 'all_item' :
					$("#pdp_group_item tr").show();
					break;
				case 'checked_item' : 
					$("#pdp_group_item .unchecked-item").hide();
					$("#pdp_group_item .checked-item").show();
					break;
				case 'unchecked_item' : 
					$("#pdp_group_item .checked-item").hide();
					$("#pdp_group_item .unchecked-item").show();
					break;	
			}
		}, 
		defaultFilter : function() {
			var checkedItem = $("#pdp_group_item tr.checked-item").length;
			if (checkedItem > 0) {
				PDPGroup.showAndHidePdpGroup('checked_item');
			} else {
				PDPGroup.showAndHidePdpGroup('all_item');
			}
		}
	}
	PDPGroup.init();
	
});