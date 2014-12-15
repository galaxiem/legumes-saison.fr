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
	$(".banner").click(function(event) {
		document.location.href = "/";
		return false;
	});
	$("h4.petit-rond").click(function(event) {
		return clique(this);
	});
	$("ul.liste-legume > li").click(function(event) {
		return clique(this);
	});
});