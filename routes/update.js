exports.update = function(req, res){
    var que = req.query;

    console.log(que);
    res.render('editBucket', que);
};