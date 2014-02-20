
/**
 * Module dependencies.
 */
var express = require('express'),
config = require('./config'),
app = express();
var MongoStore = require('connect-mongo')(express);
var path = require('path');
var http = require('http');
var routes = require('./routes');
flash = require('connect-flash');
var crypto = require('crypto'), //密码加密模块
User = require('./model/user.js'); //引入用户登录函数
// Configuration
function Configuration(app, rootdir) {
	app.set('views', path.join(config.dir.viewdir, 'views'));
	app.set('view engine', 'jade');
	app.use(flash());
	app.use(express.methodOverride());
	//Cookie 解析的中间件
	app.use(express.cookieParser());
	//提供会话支持
	app.use(express.session({
	  secret: config.cookieSecret,
	  key: config.dbname,
	  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
	  store: new MongoStore({
	    db: config.dbname
	  })
	}));
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}
	http.createServer(app).listen(app.get('port'), function(){
  	console.log('服务器配置成功.\n开始监听端口' + config.web.port);
  	});
}

exports.start = function(conf) {
	if (conf) {
		for (var i in conf) {
			if (config.hasOwnProperty(i)) config[i] = conf[i];
		}
	}
	app.configure(function() {
			Configuration(app, config.rootdir);
		});
	require('./router')(app);
	server = app.listen(config.web.port);
	console.log("服务器启动成功.");
};

