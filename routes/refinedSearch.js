
exports.view = function(req, res){
    var filter = {'filter' : req.query.entry};
    res.render('refinedSearch', filter);
}