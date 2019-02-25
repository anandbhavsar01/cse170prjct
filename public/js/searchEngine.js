var request = require("request");
var data = require("../../data.json");

var subscriptionKey = '819db57334bf4af78e03a0e7f718bcbf';
var customConfigId = '49dec242-0a3f-4155-9871-6a918809672a';
var searchTerm = 'microsoft';

var info = {
    url: 'https://api.cognitive.microsoft.com/bingcustomsearch/v7.0/search?' + 
        'q=' + searchTerm + "&" +
        'customconfig=' + customConfigId,
    headers: {
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
}

exports.makeQuery = function(req, response){
    console.log(req.query.entry);
    var space = req.query.entry.indexOf(" ");
    var mod = req.query.entry.substring(0, space);
    var rest = req.query.entry.substring(space);
    var improve = "\"" + mod + "\"";
    searchTerm = improve + rest;
    console.log(searchTerm);
    info = {
        url: 'https://api.cognitive.microsoft.com/bingcustomsearch/v7.0/search?' + 
            'q=' + searchTerm + "&" +
            'customconfig=' + customConfigId,
        headers: {
            'Ocp-Apim-Subscription-Key' : subscriptionKey
        }
    }
    var outResponse = response;
    request(info, function(error, response, body){
        var searchResponse = JSON.parse(body);
        data.pages = [];
        for(var i = 0; i < searchResponse.webPages.value.length; ++i){
            var webPage = searchResponse.webPages.value[i];
            data.pages.push(webPage);
        }
        outResponse.render('resultPage', data);
    });
}

