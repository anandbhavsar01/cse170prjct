var request = require("request");

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
    var compileResults = [];
    request(info, function(error, response, body){
        var searchResponse = JSON.parse(body);
        for(var i = 0; i < searchResponse.webPages.value.length; ++i){
            var webPage = searchResponse.webPages.value[i];
            console.log('name: ' + webPage.name);
            console.log('url: ' + webPage.url);
            console.log('displayUrl: ' + webPage.displayUrl);
            console.log('snippet: ' + webPage.snippet);
            console.log('dateLastCrawled: ' + webPage.dateLastCrawled);
            console.log();
            var thisPage = {
                page:
                {
                    'name' : webPage.name,
                    'url' : webPage.url,
                    'displayUrl' : webPage.displayUrl,
                    'snippet' : webPage.snippet,
                    'dateLastCrawled' : webPage.dateLastCrawled
                }
            }
            compileResults.push(thisPage);
        }
    });
    console.log(compileResults);
    response.render('resultPage', compileResults);
}

