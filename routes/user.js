var config=require('../config');
var furyBase = require('../model/base');

var submit=function(req,res){
   //在post请求后的反应
   //post信息中发送过来的name,password和repassword,用req.body获取
    var name = req.body.name, 
          password = req.body.password, 
          password_re = req.body['repassword']; 
        //后端判断两次注册的密码是否相等
        if(password_re != password){
            //如果密码不相等，将信息记录到页面通知flash,然后跳转到http://localhost:3000/
            req.flash('error','两次输入的密码不一致!');  
            return res.redirect('/'); 
        }
        //对密码进行加密操作 
        var md5 = crypto.createHash('md5'), 
          password = md5.update(req.body.password).digest('hex'); 
        var newUser = new User({ 
          name: req.body.name, 
          password: password 
        }); 
       //使用user.js中的user.get() 函数来读取用户信息
        User.get(newUser.name, function(err, user){ 
            //如果有返回值，表示存在用户
            if(user){ 
              err = '用户已存在!'; 
            } 
            if(err){
              //如果报错，记录错误信息和页面跳转
              req.flash('error', err); 
              return res.redirect('/'); 
            } 
            //使用user.js的user.save() 保存信息函数
            newUser.save(function(err,user){ 
              if(err){ 
                req.flash('error',err); 
                return res.redirect('/'); 
              } 
              //成功后，将用户信息记录在页面间的会话req.session中，并且跳转到一个新页面，就是内容集中展示页面
              req.session.user = user; 
              req.flash('success','注册成功!'); 
              res.redirect('/show'); 
            }); 
        });  
	};
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

exports.submit=submit;


exports.list = function(req, res){
  res.send("respond with a resource");
};