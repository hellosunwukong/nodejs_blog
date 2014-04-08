var config=require('../../config/config')['development'];
var aboutme=function(req,res)
{
	req.session.title = "关于我";
    req.session.template = "aboutme";
	res.render('common/aboutme',{
		config:config,
		session:req.session
	});
};
exports.aboutme=aboutme;
