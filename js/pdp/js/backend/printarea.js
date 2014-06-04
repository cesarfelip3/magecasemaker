var printarea = jQuery.noConflict();
printarea(function($) {
	iDesign = {
		activeTab : function() {
			$('#myTab a').click(function (e) {
				e.preventDefault();
				$(this).tab('show');
			});
		}
	};
	iDesign.activeTab();
    //
});