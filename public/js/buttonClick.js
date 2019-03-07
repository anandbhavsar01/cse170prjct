'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	initEdits();
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

function initEdits(){
	$('include_form').submit(function(e){
		e.preventDefault();

		console.log('include');
		var new_term = $('#include_terms').val();
		//include.push({"term" : new_term});

		console.log(new_term);
	});
	$('exclude_form').submit(function(e){
		e.preventDefault();

		console.log('exclude');
		var new_term = $('#exclude_terms').val();
		//exclude.push({"term" : new_term});
		console.log(new_term);

	});
};

function test (req, res){
	console.log("req");
}
