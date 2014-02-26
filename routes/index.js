var config=require('../config');

exports.index = function(req, res){
    req.session.title = "首页 - 记录人生的点点滴滴";
    req.session.template = "index";
    res.render('index',{
                config:config,
                session:req.session,
    });
};
