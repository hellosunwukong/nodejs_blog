var furyBase = require('../model/base'),
config = require('../config');

var index = function(req, res) {
	if (req.session.is_login) {
		res.redirect('/home');
	} else {
		var next_url = req.query.next ? req.query.next : 'home';
		req.session.title = '登陆blog';
		req.session.template = 'login';
		req.session.error = req.flash('error');
		res.render('login/login', {
			config: config,
			next_url:next_url,
			session: req.session
		});
	}
};

var userlogin=function(req,res){
	if(req.session.is_login){
		res.redirect('/home');
	}else{
		var account=req.body.account,
		password=req.body.password,
		proxy = new EventProxy(),
		next_url = req.body.next_url || 'home';
		var render=function(args) {
			var success=args[0],
			currentuser=args[1],
			error=args[2];
			var errorMap = {
				'001': '帐号不存在，请检查帐号',
				'002': '帐号密码不正确，请重新输入'
			};
			if(errorMap.hasOwnProperty(error)){
				req.flash('error',errorMap[error]);
				res.redirect('login');
			}else{
				req.session.is_login=true;
				req.session.currentuser=currentuser;
				res.redirect(next_url);
				console.log('longin success');
			}
		};
		proxy.assign('getLoginUser', render);
		if(account&&password){
			var md5=crypto.createHash('md5');
			md5.update(password);
			pwd = md5.digest("hex");
			furyBase.findOne({
				accounts:account,
			},'users',function(err,user){
				if(err||!user) proxy.trigger('getLoginUser',[false,null,'001']);
				else {
					if(user['pwd']===pwd)
						proxy.trigger('getLoginUser',[true,user,null]);
					else
						proxy.trigger('getLoginUser',[false,null,'002']);
				}
			});
		}
	}
};

var logout=function(req,res){
	if(req.session.is_login){
		req.session.destroy(function(err) {
			res.clearCookie('accounts', {
                path:'/',
				domain:config.cookiepath 
			});
			res.clearCookie('pwd', {
                path:'/',
				domain: config.cookiepath
			});
			res.clearCookie('remember', {
                path:'/',
				domain: config.cookiepath
			});
			res.redirect('home');
		});
	} else {
		res.redirect('home');
	}
};

exports.index = index;
exports.userlogin=userlogin;
exports.logout=logout;

