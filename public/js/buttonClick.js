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
		}
		$(this).toggleClass("selected");
		
		
	});
	$('.submitButton').click(function(e) {
		var elements = document.querySelectorAll("input[type=button]");   

		var categories = " ";
		for(var i = 0, len = elements.length; i < len; i++) {   
  			console.log("Button: " +  elements[i].value);
  			console.log(elements[i].className);
  			if(elements[i].className == "selectCategory selected"){
  				categories += elements[i].value + " ";
  			}
		}
 
		$('.entry').val($('.entry').val() + categories);
		console.log("Current entry is: " + $('.entry').val());
	});
}

function test (req, res){
	console.log("req");
  }
