exports.update = function(req, res){
    var que = req.query;
    res.render('editBucket', que);
};