'use strict';
/*
 * GET home page.
 */
var data = require('../categories.json');

exports.view = function(req, res){
  res.render('index', data);
};