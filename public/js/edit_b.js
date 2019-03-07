
$(document).ready(function() {
    initEdits();
});

function initEdits(){
    $('include_form').submit(function(e){
        e.preventDefault();

        console.log('include');
        var new_term = $('#include_terms').val();
        //include.push({"term" : new_term});
        console.log(new_term)

    });
    $('exclude_form').submit(function(e){
        e.preventDefault();

        console.log('exclude');
        var new_term = $('#exclude_terms').val();
        //exclude.push({"term" : new_term});
        console.log(new_term);


    });
};