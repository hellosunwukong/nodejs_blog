var tuerBase = require('../model/base'),
config = require('../config');
// base64 = require('../lib/base64'),
// crypto = require('crypto'),
// util = require('../lib/util'),
EventProxy = require('eventproxy').EventProxy;

var index = function(req, res) {
	if (req.session.is_login) {
		res.redirect('home');
	} else {
		req.session.title = '注册兔耳';
		req.session.template = 'register';
		res.render('login/register', {
			config: config,
			session: req.session
		});
	}
};

exports.index = index;

exports.register=function(req, res){
	res.render('login/register',{
		title:'',
		config:config
	});
};