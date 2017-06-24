
"use strict"

let unirest = require('unirest');

let config = require('../config/giantbomb');

let base_url = 'https://giantbomb.com/api/';

let giantbomb = {};

let apiRequest = function (method, options, next) {
    options.api_key = config.api_key;
    options.format = 'json';

    unirest.get(base_url + method)
        .headers({
            'User-Agent': 'gamerank.io testing client'
        })
        .query(options)
        .end(next);
}

giantbomb.game = function (id, callback) {
    apiRequest('game/3030-' + id, {
        'field_list': 'name,deck,platforms,genre,image,site_detail_url'
    }, function (res) {
        if (res.body.status_code == 1) {
            var game = res.body.results;
            callback(null, game);
        } else {
            callback(new Error(res.body.error));
        }
    });
}

giantbomb.search = function (query, page = 0, callback) {
    apiRequest('search', {
        "resources": "game",
        "field_list": "id,name,deck,platforms,genre,image,site_detail_url",
        "query": query,
        "limit": "10"
    }, function (res) {
        console.log(res);

        if (res.body.status_code == 1) {
            var search = {
                'offset': res.body.offset,
                'total': res.body.number_of_total_results,
                'results': res.body.results
            };

            for (var index = 0; index < search.results.length; index++) {
                var game = search.results[index];
                delete game.resource_type;
            }

            callback(null, search);
        } else {
            callback(new Error(res.body.error));
        }
    });
}

module.exports = giantbomb;
