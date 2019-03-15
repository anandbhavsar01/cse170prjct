
var data = require('../categories.json');

exports.view = function(req, res){
    var check = req.query;
    var editData = { name: 'Error', include: [], exclude: ['']};
    for(var i = 0; i < data["categories"].length; i++){
        if(data["categories"][i].name == check.entry){
            editData = data["categories"][i];
        }
    }
    res.render('editBucket', editData);
};

exports.editView = function(req, res){
    res.render('edit', data);
}

exports.makeEdit = function(req, res){
    var removeTerms = req.query.submitClicked.split(" ");
    if(req.query.bucketName != undefined){
        var oldname = req.query.oldentry;
        var name = req.query.bucketName;
        for(var i = 0; i < data["categories"].length; i++){
            if(oldname.localeCompare(data["categories"][i].name) == 0){
                var include = data["categories"][i]["include"];
                for(var j = 0; j < removeTerms.length; j++){
                    for(var k = 0; k < include.length; k++) {
                        if(include[k]["term"].localeCompare(removeTerms[j]) == 0){
                            include.splice(k, 1);
                        }
                    }
                }

                var exclude = data["categories"][i]["exclude"];
                for(var j = 0; j < removeTerms.length; j++){
                    for(var k = 0; k < exclude.length; k++) {
                        if(exclude[k]["term"].localeCompare(removeTerms[j]) == 0){
                            exclude.splice(k, 1);
                        }
                    }
                }
                var newinclude = req.query.include_terms;
                delete data["categories"][i];
                var deleted = data["categories"].splice(i,1);
                if(newinclude != undefined){
                    if(Array.isArray(newinclude)){
                        for(var j = 0; j < newinclude.length; j++){
                            include.push({"term" : newinclude[j]});
                        }
                    } else {
                        if(newinclude.length > 0){
                            include.push({"term" : newinclude});
                        }
                    }
                }
                var newexclude = req.query.exclude_terms;
                if(newexclude != undefined){
                    if(Array.isArray(newexclude)){
                        for(var j = 0; j < newexclude.length; j++){
                            exclude.push({"term" : newexclude[j]});
                        }
                    } else {
                        if(newinclude.length > 0){
                            exclude.push({"term" : newexclude});
                        }
                    }
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
    for(var i = 0; i < data["categories"].length; i++){
        if(data["categories"][i].name == cat.entry){
            delete data["categories"][i];
            data["categories"].splice(i,1);
        }
    }
    res.render('index', data);
};