var index=require('./routes/index'),
user=require('./routes/user'),
login=require('./routes/login'),
register=require('./routes/register');

module.exports=function(app)
{
	app.get('/', index.index);
	app.get('/register',register.register);
	app.post('/register/submit',user.submit);
	app.get('/login',login.login);
};