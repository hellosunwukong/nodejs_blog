/*
用户配置文件 author flex
*/
var config={
	cookieSecret:'flex-fury',
	dbname: 'node-mongo-furydb',
	dbhost:'127.0.0.1',
	dbport:27017,
	rootdir:'',
	is_login: false,
	web:{
	port:process.env.WEB_PORT || 8080
	},
	dir:{
	viewdir:'',
	bootstrapdir:'javascripts/bootstrap/css'
	},
	menus:[{
		text:'首页',
		href:'/'
	}],
	navs:[{
			text: '登录',
			href: '/login'
		},
		{
			text: '注册',
			href: '/register'
		}],
	loginnavs: [{
	    text:'写日记',
	    href:'/diary/write'
	},
	{
		text: '帐号设置',
		href: '/set'
	},
	{
		text: '登出',
		href: '/logout'
	}],
	adminnav:[{
		text: '登出',
		href: '/logout'
	}]
};
module.exports=config;