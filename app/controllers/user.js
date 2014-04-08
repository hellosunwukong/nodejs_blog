var config=require('../../config/config')['development'];;
var crypto = require('crypto');
var index = function(req, res) {
	if (req.session.is_login) {
		res.redirect('home');
	} else {
		req.session.title = '注册blog';
		req.session.template = 'register';
		res.render('login/register', {
			config: config,
			session: req.session
		});
	}
};
exports.index = index;

exports.list = function(req, res){
  res.send("respond with a resource");
};