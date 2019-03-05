var categories = require('../categories.json');

exports.view = function(req, res){
    res.render('add');
}

exports.addCategory = function(req, res){
    var name = req.query.bucketName;
    var newinclude = req.query.include_terms;
    var include = [];
    for(var i = 0; i < newinclude.length; i++){
        include.push({"term" : newinclude[i]})
    }
    var newexclude = req.query.exclude_terms;
    var exclude = [];
    for(var i = 0; i < newexclude.length; i++){
        exclude.push({"term" : newexclude[i]})
    }

    var newCategory = {
        "name" : name,
        "include" : include,
        "exclude" : exclude,
    }
    categories["categories"].push(newCategory);
    res.render('index', categories); 
}