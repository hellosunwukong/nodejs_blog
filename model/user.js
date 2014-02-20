var config=require('../config');
var furyBase = require('./base');

function User(user){ 
  //注册用户需要的信息name,password,email等
  this.name = user.name; 
  this.password = user.password; 
  this.email = user.email; 
 //用户在后面能保存更新的一些信息
  this.address = user.address; 
  this.company=user.company; 
  this.school=user.school; 
  this.info=user.info; 
  this.imgUrl=user.imgUrl;
}; 

module.exports = User; 

User.prototype.save=function(callback){ 
 //callback 是执行玩保存后的回调函数
  var user = { 
      name: this.name, 
      password: this.password, 
      address:"暂无",
      company:"暂无",
      school:"暂无",
      info:"暂无",
      imgUrl:"./public/images/11.jpg"
  }; 
  furyBase.open(function(err,db){ 
    if(err){ 
      return callback(err); 
    } 
    db.collection('user',function(err,collection){ 
      if(err){ 
        mongodb.close(); 
        return callback(err); 
      } 
      collection.insert(user,{safe: true},function(err,result){ 
        mongodb.close(); 
        callback(err, user);
      }); 
    }); 
  }) 
};
User.get = function(name, callback){ 
  mongodb.open(function(err, db){ 
    if(err){ 
      return callback(err); 
    } 
    db.collection('user', function(err, collection){ 
      if(err){ 
        mongodb.close(); 
        return callback(err); 
      } 
      collection.findOne({name: name},function(err, doc){ 
        mongodb.close(); 
        if(doc){ 
          var user = new User(doc); 
          callback(err, user); 
        } else { 
          callback(err, null);
        } 
      }); 
    }); 
  }); 
};
