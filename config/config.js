
var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , templatePath = path.normalize(__dirname + '/../app/mailer/templates');

module.exports = {
  development: {
    db: 'mongodb://127.0.0.1:27017/mongodb',
    dbname:'node_blog',
    host:'127.0.0.1:3000',
    root: rootPath,
    app: {
      name: 'Nodejs Blog MVC DEV',
      modelPath:'app/models',
      viewPath:'app/views',
      controllerPath:'app/controllers'
    },
    usernavs:[
    {text:'最新',href:'/newblogs'},
    {text:'我的主页',href:'/myblogs'},
    {text:'发布',href:'/editblog'},
    {text:'Markdown',href:'/markdown'}
    ],
    guestnavs:[
    {text:'最新',href:'/home'},
    {text:'Markdown',href:'/markdown'}],
    userfuncs:[
    {text:'注销',href:'/logout'}
    ],
    guestfuncs:[
    {text:'登陆',href:'/login'},
    {text:'注册',href:'/register'}
    ],
    articlesperpage:5,
  },
  test: {
    db: 'mongodb://localhost/noobjs_test',
    root: rootPath,
    app: {
      name: 'Nodejs Blog MVC TEST'
    }
  },
  production: {},
}
