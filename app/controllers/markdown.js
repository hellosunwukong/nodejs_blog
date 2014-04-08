var config=require('../../config/config')['development'];
var markdown=function(req,res)
{
	req.session.title = "Markdown";
    req.session.template = "markdown";
	res.render('common/markdown',{
		config:config,
		session:req.session
	});
};
exports.markdown=markdown;