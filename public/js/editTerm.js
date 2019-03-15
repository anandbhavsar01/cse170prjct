'use strict'

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function initializePage(){
    $('#addinclude').click(function(e){
        e.preventDefault();
        console.log("Add");
    });

    $('#removeinclude').click(function(e){
        e.preventDefault();
        console.log("Remove");
    });
    $('#addexclude').click(function(e){
        e.preventDefault();
        console.log("Add");
    });

    $('#removeexclude').click(function(e){
        e.preventDefault();
        console.log("Remove");
    });
}