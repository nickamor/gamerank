
var express = require('express');
var router = express.Router();
var giantbomb = require('../models/giantbomb.js');

router.get('/search', function (req, res, next) {
    giantbomb.search(req.query.q, 0, function (err, search) {
        if (search) {
            res.send(search);
        } else {
            next(err);
        }
    });
});

router.get('/:id', function (req, res, next) {
    giantbomb.game(req.params.id, function (err, game) {
        // if (game) {
        //     res.render('games/game', { title: game.name, 'game': game });
        // } else {
        //     next(err);
        // }
        if (game) {
            res.send(game);
        } else {
            next(err);
        }
    });
});

module.exports = router;
