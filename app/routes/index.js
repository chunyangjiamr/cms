var express = require('express');
var router = express.Router();
var index = require('../../app/controllers/index');

//首页
router.get('/', index.index);
//router.route('/up').all(index.up);

module.exports = function(app) {
    app.use('/', router);
};
