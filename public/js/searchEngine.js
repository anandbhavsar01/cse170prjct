var request = require("request");
var data = require("../../data.json");

var subscriptionKey = '5a05c3ac606849c795229135a67eb951';
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
    var searchTerm = "";
    console.log(req.query.entry);
    if( Array.isArray(req.query.entry)){
        for(var i = 0; i < req.query.entry.length; i++){
            searchTerm = searchTerm + "\"" +  req.query.entry[i] + "\" ";
        }
    }
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
        console.log(response);
        console.log(searchResponse);
        if( searchResponse.webPages){
            for(var i = 0; i < searchResponse.webPages.value.length; ++i){
                var webPage = searchResponse.webPages.value[i];
                data.pages.push(webPage);
            }
            outResponse.render('results', data);
        }
    });
}

