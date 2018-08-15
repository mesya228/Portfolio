"use strict";
$(document).ready(function() {
	$("[data-img-target]").on("mouseenter", function() {
		$("img[data-img-target='" + $(this).attr("data-img-target") +"']").prev().slideDown();
	});
	$(".stuff-info").on("mouseleave", function(event) {
		$(".stuff-info").slideUp();
	});
});



