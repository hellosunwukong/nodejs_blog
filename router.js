var index=require('./routes/index'),
user=require('./routes/user'),
login=require('./routes/login'),
register=require('./routes/register'),
aboutme=require('./routes/aboutme'),
blog=require('./routes/blog'),
error=require('./routes/error');

module.exports=function(app)
{
	app.get('/', blog.getblogs);
	app.get('/home', blog.getblogs);

	app.get('/register',register.index);
	app.post('/register/invite',register.invite);
	app.get('/login',login.index);
	app.get('/aboutme',aboutme.aboutme);
	app.get('/register/activate/:active',register.activate);
	app.post('/login',login.userlogin);
	app.get('/logout',login.logout);

	app.get('/editblog',blog.editblog);
	app.post('/postblog',blog.createblog);
};