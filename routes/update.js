exports.update = function(req, res){
    var que = req.query;
    console.log('does this even work?')
    console.log(que);
    res.render('editBucket', que);
};