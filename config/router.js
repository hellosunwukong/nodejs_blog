var config=require('./config'),
blog=require('../app/controllers/blog'),
register=require('../app/controllers/register')
login=require('../app/controllers/login'),
user=require('../app/controllers/user'),
index=require('../app/controllers/index'),
error=require('../app/controllers/error'),
markdown=require('../app/controllers/markdown');


module.exports=function(app)
{
	app.get('/', blog.getblogs);
	app.get('/home', blog.getblogs);

	app.get('/register',register.index);
	app.post('/register/invite',register.invite);
	app.get('/login',login.index);
	app.get('/register/activate/:active',register.activate);
	app.post('/login',login.userlogin);
	app.get('/logout',login.logout);

	app.get('/editblog',blog.editblog);
	app.post('/postblog',blog.createblog);

	app.get('/newblogs',blog.getblogs);

	app.get('/newblogs/:page',blog.pageturn);
	app.get('/markdown',markdown.markdown);
	
	app.get('/myblogs',blog.getblogsbyauthor);
	
	app.get('*',error.notFound);
};