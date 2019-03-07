
var data = require('../categories.json');

exports.view = function(req, res){
    var check = req.query;
    var editData = { name: 'Error', include: [], exclude: ['']};
    for(var i = 0; i < data["categories"].length; i++){
        console.log(data["categories"][i]);
        if(data["categories"][i].name == check.entry){
            editData = data["categories"][i];
        }
    }
    console.log(editData);
    res.render('editBucket', editData);
};

exports.editView = function(req, res){
    res.render('edit', data);
}

exports.makeEdit = function(req, res){
    if(req.query.bucketName != undefined){
        var oldname = req.query.oldentry;
        var name = req.query.bucketName;
        for(var i = 0; i < data["categories"].length; i++){
            if(oldname.localeCompare(data["categories"][i].name) == 0){
                delete data["categories"][i];
                var deleted = data["categories"].splice(i,1);
                var newinclude = req.query.include_terms;
                var include = [];
                for(var j = 0; i < newinclude.length; j++){
                    include.push({"term" : newinclude[j]})
                }
                var newexclude = req.query.exclude_terms;
                var exclude = [];
                for(var j = 0; i < newexclude.length; j++){
                    exclude.push({"term" : newexclude[j]})
                }

                var newCategory = {
                    "name" : name,
                    "include" : include,
                    "exclude" : exclude,
                }
                data["categories"].splice(i,0, newCategory);
                break;
            }
        }
        res.render('index', data); 
    }
}

exports.delete = function(req, res){
    var cat = req.query;
    console.log(cat.entry);
    for(var i = 0; i < data["categories"].length; i++){
        console.log(data["categories"][i]);
        if(data["categories"][i].name == cat.entry){
            delete data["categories"][i];
            data["categories"].splice(i,1);
        }
    }
    res.render('index', data);
};
