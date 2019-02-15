var pages = require("../results.json")

exports.postQuery = function(request, response){
    var newQuery = {
        "entry" : request.query.entry,
        "category" : ""/*sessionStorage.getItem("selectedCategory")*/
    };

    /*console.log(sessionStorage.getItem("selectedCategory"));*/
    response.render('results', pages);
}