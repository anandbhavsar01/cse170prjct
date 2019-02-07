exports.postQuery = function(request, response){
    var newQuery = {
        "entry" : request.query.entry,
        "category" : request.query.category,
    };
    console.log(newQuery);
}