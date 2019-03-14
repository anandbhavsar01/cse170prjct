var request = require("request");
var data = require("../../data.json");
var categories = require("../../categories.json"); 

var subscriptionKey = '9850ad22b10443f78076d3ba778bad53';
var customConfigId = 'dc02bf21-37b9-4779-8810-2d43cb4d0c05';
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
    var searchTerm = " +" + req.query.entry;
    var categoryName = req.query.filter;
    for(var i = 0; i< categories["categories"].length; i++){
        if(categoryName != undefined){
            if(categoryName.localeCompare(categories["categories"][i].name) == 0){
                for(var j = 0; j < categories["categories"][i].include.length; j++){
                    searchTerm = searchTerm + "+" + categories["categories"][i].include[j].term + " ";
                }
                for(var j = 0; j < categories["categories"][i].exclude.length; j++){
                    searchTerm = searchTerm + "-" + categories["categories"][i].exclude[j].term + " ";
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
                    if( searchResponse.webPages){
                        for(var i = 0; i < searchResponse.webPages.value.length; ++i){
                            var webPage = searchResponse.webPages.value[i];
                            data.pages.push(webPage);
                        }
                        data["filter"] = req.query.filter;
                        data["previous"] = req.query.entry;
                        console.log(data);
                        outResponse.render('refinedSearch', data);
                    }
                });
            }
        } else {
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
                if( searchResponse.webPages){
                    for(var i = 0; i < searchResponse.webPages.value.length; ++i){
                        var webPage = searchResponse.webPages.value[i];
                        data.pages.push(webPage);
                    }
                    data["filter"] = req.query.filter;
                    data["previous"] = req.query.entry;
                        console.log(data);
                    outResponse.render('refinedSearch', data);
                }
            });
        }
    }
    
}

