var config=require('../config'),
furyBase=require('../model/base'),
EventProxy = require('eventproxy').EventProxy;

var createblog=function(req,res){
	var title=req.body.blog_title,
	content=req.body.blog_content,
	next_url = req.body.next_url || 'home',
	currentuser=req.session.currentuser;
	if(!(title&&content&&currentuser)){
		req.flash('error','请先登陆');
		res.redirect(next_url);
	}else{
		var render=function(args){
			var success=args[0],
			message=args[1];
			if(success){
				res.redirect('/');
			}else{
				req.flash('error',message);
				res.redirect('/editblog');
			}
		};
		var proxy=new EventProxy();
		proxy.assign('returnResult',render);
		furyBase.getIds('articles', function(err, obj) {
						if (err) proxy.trigger('returnResult', [false, 'error']);
						else {
							furyBase.save({
								authorid:currentuser.id,
								authornick:currentuser.nick,
								title:title,
								content:content,
								tags:['unknow']
							},
							'articles', function(err, data) {
								proxy.trigger('returnResult', [true, '']);
							});
						}
		});
	}
};

var editblog=function(req,res){
req.session.title='编辑POST',
res.render('blog/edit',{
	session:req.session,
	config:config
})
};

exports.createblog=createblog;
exports.editblog=editblog;