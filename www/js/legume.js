$(document).on("ready", function() {
	$(".banner").click(function(event) {
		document.location.href = "/";
		return false;
	});
	$("h4.petit-rond").click(function(event) {
		document.location.href = $(this).find("a").attr("href");
		return false;
	});
});