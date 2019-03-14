
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
                var include = data["categories"][i]["include"];
                var exclude = data["categories"][i]["exclude"];
                delete data["categories"][i];
                var deleted = data["categories"].splice(i,1);
                var newinclude = req.query.include_terms;
                if(newinclude != undefined){
                    if(Array.isArray(newinclude)){
                        for(var j = 0; j < newinclude.length; j++){
                            if(newinclude[i].length > 0){
                                include.push({"term" : newinclude[j]});
                            }
                        }
                    } else {
                        if(newinclude.length > 0){
                            include.push({"term": newinclude});
                        }
                    }
                }
                var newexclude = req.query.exclude_terms;
                if(newexclude != undefined){
                    if(Array.isArray(newexclude)){
                        for(var j = 0; j < newexclude.length; j++){
                            if(newexclude[i].length > 0){
                                exclude.push({"term" : newexclude[j]});
                            }
                        }
                    } else {
                        if(newexclude.length > 0){
                            exclude.push({"term": newexclude});
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

/*
exports.removeTerm = function(req, res){
    var oldname = window.document.getElementById("oldentry");
    console.log(oldname);   
    for(var i = 0; i < data["categories"].length; i++){
        if(oldname.localeCompare(data["categories"][i].name) == 0){
            console.log(data["categories"][i].name);
            break;
        }
    }
    res.render('editBucket', data);
}

exports.addTerm = function(req, res){
    var oldname = window.document.getElementById("oldentry");
    console.log(oldname);
    for(var i = 0; i < data["categories"].length; i++){
        if(oldname.localeCompare(data["categories"][i].name) == 0){
            console.log(data["categories"][i].name);
            break;
        }
    }
    res.render('editBucket', data);
}*/