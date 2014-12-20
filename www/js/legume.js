var scale = function(evt) {
	var img = $(evt.currentTarget),		
		w = img.width(),
		h = img.height();
	if (w > h) {
		var newHeight = w,
			newWidth = w * newHeight / h;
    	img.height(newHeight);
		img.width(newWidth);
		img.css("margin-left", (w - newWidth)/ 2);
	}
}, clique = function(elt) {
	document.location.href = $(elt).find("a").attr("href");
	return false;
}
	

$(document).on("ready", function() {
	$(".banner .text").click(function(event) {
		document.location.href = "/";
		return false;
	});
	$("h4.petit-rond").click(function(event) {
		return clique(this);
	});
	$("ul.liste-legume > li").click(function(event) {
		return clique(this);
	});
	$(".banner.slim .menu").click(function(event) {
		$(".overlay").show();
		$("body").css("overflow", "hidden");
		return false;
	});
	$(".overlay .popup .close").click(function(event) {
		$(".overlay").hide();
		$("body").css("overflow", "auto");
		return false;
	});
});