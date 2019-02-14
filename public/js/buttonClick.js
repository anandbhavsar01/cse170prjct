'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.selectCategory').click(function(e) {
		if($(this).attr("class") == "selectCategory"){
			console.log("Button is selected " + $(this).attr("value"));
			$('.entry').append;
			console.log("Current entry is: " + $('.entry').val());
		}
		$(this).toggleClass("selected");
	});
}
