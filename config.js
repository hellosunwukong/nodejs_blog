/*
用户配置文件 author flex
*/
var config={
	cookieSecret:'flex-blog',
	dbname: 'node-mongo-furydb',
	dbhost:'127.0.0.1',
	cookiepath:'127.0.0.1',
	dbport:27017,
	rootdir:'',
	csshost:'',
	is_login: false,
	web:{
	port:process.env.WEB_PORT || 3000,
	host:'http://222.195.149.108'
	},
	dir:{
	viewdir:'',
	bootstrapdir:'javascripts/bootstrap/css'
	},
	loginnavs:[
	{
		text:'最新',
		href:'/'
	},
	{
		text:'我的主页',
		href:'/home'
	},
	{
		text:'POST',
		href:'/editblog'
	}],
	navs:[
		{
			text:'最新',
			href:'/home'
		}],
	func:[{
		text:'登陆',
		href:'/login'
	},{
		text:'注册',
		href:'/register'
	}],
	loginfunc:[{
		text:'注销',
		href:'/logout'
	}]
	
};
module.exports=config;