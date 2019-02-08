exports.postQuery = function(request, response){
    var newQuery = {
        "entry" : request.query.entry,
        "category" : localStorage.getItem("selectedCategory")
    };
    console.log(localStorage.getItem("selectedCategory"));
    response.render('results', newQuery);
}