var express = require('express');
var router = express.Router();
var util = require('../libs/util');
var content = require('../../server/controllers/content');

//权限判断
router.use(function(req, res, next) {
    console.log('内容页: ' + Date.now());
    res.locals.Path = 'content';
    if(!req.session.user) {
        var path = util.translateAdminDir('/user/login');
        return res.redirect(path);
    }
    if(!req.Roles || (req.Roles.indexOf('admin') < 0 && req.Actions && req.Actions.indexOf('content') < 0)) {
        var path = util.translateAdminDir('/index');
        return res.redirect(path);
    }
    next();
});

//内容列表
router.route('/').get(content.list);
//添加内容
router.route('/add').all(content.add);
//单条信息
router.route('/:id').get(content.one);
//更新信息
router.route('/:id/edit').all(content.edit);
//删除信息
router.route('/:id/del').all(content.del);


module.exports = function(app) {
    var path = util.translateAdminDir('/content');
    app.use(path, router);
};
