var info = require('../edit_example.json')
exports.view = function(req, res){
    res.render('editBucket', info);
};