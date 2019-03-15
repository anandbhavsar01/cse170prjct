var categories = require('../categories.json');

exports.view = function(req, res){
    res.render('add');
}

exports.addCategory = function(req, res){
    if(req.query.bucketName != undefined && req.query.bucketName != ""){
        var name = req.query.bucketName;
        var exists = false;
        for(var i = 0; i < categories["categories"].length; i++){
            if(name.localeCompare(categories["categories"][i].name) == 0){
                exists = true;
            }
        }
        if(exists == false){
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
        }
    }
    res.render('index', categories); 

}