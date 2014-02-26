var furyBase = require('../model/base');
config = require('../config'),
crypto = require('crypto'),
util = require('../lib/util'),
mail = require('../lib/mail'),
base64 = require('../lib/base64'),
EventProxy = require('eventproxy').EventProxy;



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


var invite = function(req, res) {
	
	if (req.session.is_login) {
		res.redirect('');
	} else {
		var email=req.body.email.trim(),
		userNick=req.body.nickname.trim(),
		proxy = new EventProxy(),
		render = function(findEmail, sendMail) {
			var message = '发信失败了，联系下管理员...';
			if (findEmail === 1 && sendMail) {
				message = '我们已经给您的' + email + '邮箱寄了一封激活信，它的有效期为3小时，如果收件箱中没有收到，麻烦您检查您的垃圾邮件夹~，也许会有惊喜...';
			}
			if (findEmail === 2) message = '此email已经注册过';
			// util.setNoCache(res);
			req.session.title = '激活页面';
			req.session.template = 'login/invite';
			res.render('login/invite', {
				config: config,
				session: req.session,
				message: message
			});
		};
		proxy.assign('findEmail', 'sendMail', render);

		try {
			var activateURL = config.web.host+':'+config.web.port+'/register/activate/' + encodeURIComponent(base64.encode('accounts=' + encodeURIComponent(email) + '&timestamp=' + new Date().getTime() + '&nick=' + encodeURIComponent(userNick)));
		} catch(e) {
			console.log(e);
			proxy.trigger('findEmail', 0);
			proxy.trigger('sendMail', 0);
			return;
		}

		mail.sendmail({ 
				        to:email,
				        subject:'你好,'+userNick+"欢迎注册blog!",
						html: '<p><b>Hi,' + userNick + '! </b>欢迎注册blog。</p><p>可以点击或者复制下面的连接来激活你的帐号。</p><p><a href="' + activateURL + '" target="_blank">' + activateURL + '</a></p>'
				    },
					function(err, status) {
						proxy.trigger('findEmail', 1);
						proxy.trigger('sendMail', 1);
					});
				
	}
};

var activate=function(req,res,next){
	if(req.session.is_login===true){
		res.redirect('/');
	}else{
		var password = "123456",
		proxy = new EventProxy(),
		activeData = util.paramUrl(base64.decode(decodeURIComponent(req.params.active)));
		for (var i in activeData) {
			activeData[i] = decodeURIComponent(activeData[i]);
		}
		var render = function(args) {
			var message, checkUrl = args[0],
			findAccounts = args[1],
			saveAccounts = args[2];
			if (checkUrl && findAccounts && saveAccounts) {
				message = activeData['accounts'] + ' 帐号已经被激活，您的密码是' + password + ', 您可以登录以后修改成自己喜欢的其他密码！';
			} else if (!checkUrl) {
				message = '激活的URL不合法或已经过期超时';
			} else if (!findAccounts) {
				message = '此帐号已经被激活了';
			} else if (!saveAccounts) {
				message = '激活失败请重试';
			}
			req.session.title = '激活页面';
			req.session.template = 'invite';
			res.render('login/invite', {
				config: config,
				session: req.session,
				message: message
			});
		};
		if (!activeData['accounts'] || ! activeData['timestamp'] || ! activeData['nick']) {
			proxy.immediate('render', render, [false]);
		} else if ((new Date()).getTime() - parseInt(activeData['timestamp'], 10) > 1000 * 60 * 60 * 3) {
			proxy.immediate('render', render, [false]);
		} else {
			furyBase.findOne({
				accounts: activeData['accounts']
			},
			'users', function(err, user) {
				if (err || user) proxy.immediate('render', render, [true, false]);
				else {
					var md5 = crypto.createHash("md5");
					md5.update(password);
					pwd = md5.digest("hex");

					furyBase.getIds('users', function(err, obj) {
						if (err) proxy.immediate('render', render, [true, false]);
						else {
							furyBase.save({
								accounts: activeData['accounts'],
								pwd: pwd,
								nick: activeData['nick'],
								avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACO0lEQVR42u2ZaXOCMBCG/f9/TRFw6jHO9LDlEKQqrdyF7S697UwhkEDo+OH9mOR9shuSXUZhGMKQNboA/DcAcx/ByklAtTJQzBfQ7AL0bQGqncPaTeQCOAUh3HgxTK380+jMgT+1dNJybPA+vleAxTYtjVeZ/i4NIXX7LTokHSPVBqQxwM6PmIxXQZmHuFuAlZuCjovz0sLNugOg3SpTgSMAzdcZwLXHd/c7B1hiuAcNsHBeBABAdwBXwwfIuQOQLgB1Nd9iCmHIeUqzoeNDPFQA5xjhS7MQAFDADucWDjClJ/IWhEgxc/EAqg3CAEj+88ABXD8aNsBOPEAhFODpJDiFNMEAwg9xgOUfvRx5G6fbvbOLzD9FsN7x+5wu3bxxXdyqqOcFEAQ9dSXKfg8aaKWGTwhuja37fdrYvO4UZTr23plz/Zg9Gi13nntrkSBYAIxDIhfAEd8wUzRWRwreJawXlnAAMsQCEASSAZChKeZ1Hc2wopOuvV6mUE2AuWwAtPszO6sNMMGKznuK5AAg8xOspOqa/w7B4yC3ArAPEWhWxmz+U0YGD48dXWSuH8LGi0A3UxgbOe560dz4mRSMBs2p4tx3uIbDUNxXAmy8GGbWl2lajJfx3yBQrkFr6RbBxM0BaIIxGaaJe9QYN0wxM3aAcmDP5j9EB54JgAprCqdMuvWSegD0WZzTX0TJABQ8F8fnGgAq/f6Uzfy7xkZRDTAxQVoAUlAFILN5knfW+PoBYB1i6QGu7J+f1FebMjmuZa3kQAAAAABJRU5ErkJggg==',
								profile: 'nothing yet',
								firends: [],
                                id:obj.id,
								blogcount: 0,
								pageurl: ''
							},
							'users', function(err, data) {
								proxy.immediate('render', render, [true, true, true]);
								mail.sendmail({
									to: activeData['accounts'],
									subject: '您的blog帐号已经被激活！',
									html: '您的帐号<b>' + activeData['accounts'] + '</b>blog的密码为<b>' + password + '</b>,热泪欢迎你啊……'
								},
								function(err, status) {});
                                furyBase.addFeed({
                                    type:'register',
                                    id:data[0]._id.toString(),
                                    uid:data[0]._id.toString()
                                },function(err){
                                    if(err) throw err;
                                });
							});
						}
					});

				}
			});
		}

	}

};

exports.index = index;
exports.invite=invite;
exports.activate=activate;