var config=require('../../config/config')['development'],
mongoose=require('mongoose'),
BlogPost=mongoose.model('BlogPost'),
EventProxy = require('eventproxy').EventProxy
marked = require('marked');

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

		var newblog=new BlogPost();
		newblog.title=title;
		newblog.body=content;
		newblog.authorid=currentuser._id;
		newblog.authorname=currentuser.username;
		console.log(currentuser);
		newblog.saveBlogPost(function(err) {
			if(err) proxy.trigger('returnResult',[false,'']);
			else proxy.trigger('returnResult', [true, '']);
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

var getblogs=function(req,res){
	var proxy=new EventProxy();
	var render=function(args,pages){
		var success=args[0],
		message=args[1],
		articles=args[2];
		console.log(articles);
		if(!success){
			req.flash('error',message);
			res.redirect('/');
		}else{
		req.session.title='全部文章';
		articles.forEach(function(item){
			item.body=marked(item.body);
		});
		res.render('index',{
			session:req.session,
			config:config,
			articles:articles,
			pages:pages,
		});
		}
	};
	proxy.assign('args','pages',render);
	if(!req.session.blog_page)
		req.session.blog_page=1;
	var page=req.session.blog_page;
	BlogPost
	.getPostsPages(function(err,pages){
  		var pagesnums=Math.ceil(pages/config.articlesperpage);
		proxy.trigger('pages',pagesnums);
	});
	BlogPost
	.getLatestPosts(page,function(err,data){
		if(err) proxy.trigger('args',[false,'数据库错误',null]);
		else proxy.trigger('args',[true,'',data]);
	});
};

var pageturn=function(req,res){
	var proxy=new EventProxy();
	var render=function(args,pages){
			var success=args[0],
			message=args[1],
			articles=args[2];
			if(!success){
				req.flash('error',message);
				res.redirect('/');
			}else{
			req.session.title='全部文章';
			req.session.blog_page=page;
			articles.forEach(function(item){
				item.body=marked(item.body);
			});
			res.render('index',{
				session:req.session,
				config:config,
				articles:articles,
				pages:pages,
			});
			}
		};
	var page=req.params.page;
	proxy.assign('args','pages',render);
	BlogPost
	.getPostsPages(function(err,pages){
  		var pagesnums=Math.ceil(pages/config.articlesperpage);
		proxy.trigger('pages',pagesnums);
	});
	BlogPost
	.getLatestPosts(page,function(err,data){
		if(err) proxy.trigger('args',[false,'数据库错误',null]);
		else proxy.trigger('args',[true,'',data]);
	});
};

var getblogsbyauthor=function(req,res){
	var proxy=new EventProxy(),
	currentuser=req.session.currentuser;
	var render=function(args,pages){
			var success=args[0],
			message=args[1],
			articles=args[2];
			if(!success){
				req.flash('error',message);
				res.redirect('/');
			}else{
			req.session.title='全部文章';
			req.session.blog_page=page;
			articles.forEach(function(item){
				item.body=marked(item.body);
			});
			res.render('blog/myblogs',{
				session:req.session,
				config:config,
				articles:articles,
				pages:pages,
			});
			}
		};
	var page=req.params.page;
	proxy.assign('args','pages',render);
	BlogPost
	.getPostsPagesByAuthor(currentuser._id,function(err,pages){
  		var pagesnums=Math.ceil(pages/config.articlesperpage);
		proxy.trigger('pages',pagesnums);
	});
	BlogPost
	.getLatestPostsByAuthor(currentuser._id,page,function(err,data){
		if(err) proxy.trigger('args',[false,'数据库错误',null]);
		else proxy.trigger('args',[true,'',data]);
	});
};

exports.pageturn=pageturn;
exports.createblog=createblog;
exports.editblog=editblog;
exports.getblogs=getblogs;
exports.getblogsbyauthor=getblogsbyauthor;