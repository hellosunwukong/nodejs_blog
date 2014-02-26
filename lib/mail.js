/**
 * send mail class
 */
var nodemailer = require('nodemailer'),
util = require('./util.js');
nodemailer.SMTP = {
    host: "smtp.gmail.com", // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    auth: {
        user:'furyplayersblog@gmail.com',
        pass: '955479ham' 
    }
};

exports.sendmail = function(options,callback) {
	var _conf = {
	};
    util.mix(_conf,options);
	nodemailer.send_mail(_conf, function(error, success) {
        if(error)
            console.log("mail send failed"+error);
        else
        {
            callback(null,success);
		    console.log("mail send success"+success);
        }
	});
};

