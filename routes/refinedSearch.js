
exports.view = function(req, res){
    var filter = {'filter' : req.query.entry};
    console.log(filter);
    res.render('refinedSearch', filter);
}