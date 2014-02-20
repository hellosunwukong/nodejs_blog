var tuerBase = require('../model/base'),
config = require('../config');
EventProxy = require('eventproxy').EventProxy;


var login=function(req, res){
	res.render('login/login',{
		title:'',
		config:config
	});
};

exports.login = login;

