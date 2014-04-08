var mongoose = require('mongoose'),
Schema = mongoose.Schema, 
ObjectId = mongoose.ObjectId;

var UserSchema  = new Schema({
    username         : { type: String, required: true }
  , email          : { type: String, required: true }
  , password     : { type: String, required: true  }
  , date_created  : { type: Date, default: Date.now }
  , date_updated  : { type: Date } 
})

UserSchema.statics.getLatestPosts = function(callback){
  return this.find().sort('_id','descending').limit(15).find({}, callback)
}

UserSchema.methods={
  saveUser:function(callback){
    var me =this;
    me.save(callback);
  },
  findUserbyName:function(email,callback){
    var me=this;
    me.findOne({email:email},callback);
  }

};
//this happens before it saves, they are called middleware

UserSchema.pre('save', function(next){
  console.log('Saving...');
  next();
});

//this happens before it removes, they are called middleware

UserSchema.pre('remove', function(next){
  console.log('removing...');
  next();
});

//this happens when it inititializes, they are called middleware

UserSchema.pre('init', function(next){
  console.log('initializing...');
  next();
});

mongoose.model('User',UserSchema);