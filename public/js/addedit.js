'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.editButton').click(function(e){
		e.preventDefault();
		ga('create','UA-134940364-2','auto')
    	ga('send','event','editButton','click');
	});

	$('.addButton').click(function(e){
		e.preventDefault();
		ga('create','UA-134940364-2','auto')
    	ga('send','event','addButton','click');
	});
}

