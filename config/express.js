var express = require('express')
  , mongoStore = require('connect-mongo')(express)
  , flash = require('connect-flash');

var env = 'development';

module.exports = function (app, config, passport) {

    app.configure(function () {
  	app.set('views', config.root+'/app/views');
    app.set('view engine', 'jade');
  	app.use(flash());
  	app.use(express.cookieParser());
  	app.use(express.logger('dev'));
  	app.use(express.session({
  	  secret: config.app.name,
  	  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  	  store: new mongoStore({
        db:config.dbname,
        collection : 'sessions'
  	  })
  	}));
  	app.use(express.bodyParser());
  	app.use(express.staticCache());
    app.use(express.methodOverride());
    app.use(express.static(config.root + '/public', {maxAge: 86400000}));
    app.use(app.router);

    app.use(function(err, req, res, next){
      // treat as 404
      if (err.message
        && (~err.message.indexOf('not found')
        || (~err.message.indexOf('Cast to ObjectId failed')))) {
        return next();
      }
      console.error(err.stack);
      res.status(500).render('common/500', { error: err.stack });
    });

  });

  // development env config
  app.configure('development', function () {
    app.locals.pretty = true
  });
}
