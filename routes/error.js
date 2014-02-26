var config = require('../config');

var notFound=function(req,res){
	req.session.title = '没有找到你想要的页面';
    req.session.template = '404';
    res.render('common/404',{
        config:config,
        session:req.session
    });
};
exports.notFound=notFound;