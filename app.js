var express = require('express'),
config = require('./config'),
app = express.createServer(),
path = require('path'),
http = require('http'),
routes = require('./routes'),
crypto = require('crypto'),
MongoStore = require('connect-mongo')(express);
flash = require('connect-flash');
// Configuration
function Configuration(app, rootdir) {
	app.set('views', path.join(config.dir.viewdir, 'views'));
	app.set('view engine', 'jade');
	app.use(flash());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.logger('dev'));
	app.use(express.session({
	  secret: config.cookieSecret,
	  key: config.dbname,
	  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
	  store: new MongoStore({
	    db: config.dbname
	  })
	}));
	app.use(express.bodyParser());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(app.router);

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