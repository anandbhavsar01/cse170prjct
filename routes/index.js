'use strict';
/*
 * GET home page.
 */
var data = require('../catagories.json');

exports.view = function(req, res){
  res.render('index', data);
};