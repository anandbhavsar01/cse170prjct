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
    searchTerm = req.query.entry;
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
            /*console.log('name: ' + webPage.name);
            console.log('url: ' + webPage.url);
            console.log('displayUrl: ' + webPage.displayUrl);
            console.log('snippet: ' + webPage.snippet);
            console.log('dateLastCrawled: ' + webPage.dateLastCrawled);
            console.log(); */
        }
        outResponse.render('resultPage', data);
    });
}

