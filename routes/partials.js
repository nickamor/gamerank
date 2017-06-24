
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:partial', function (req, res, next) {
    console.log(req.params.partial);
    res.render('partials/' + req.params.partial);
});

module.exports = router;
