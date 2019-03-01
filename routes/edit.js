
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