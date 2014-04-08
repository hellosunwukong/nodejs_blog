var mongoose = require('mongoose'),
Schema = mongoose.Schema, 
ObjectId = mongoose.ObjectId,
config=require('../../config/config')['development'];

var BlogPostSchema  = new Schema({
    title         : { type: String, required: true }
  , body          : { type: String, required: true }
  , is_active     : { type: Boolean, default: true }
  , authorid      : { type: String, required: true }
  , authorname    : { type: String, required: true }
  , date_created  : { type: Date, default: Date.now }
  , date_updated  : { type: Date } 
})

BlogPostSchema.statics.getLatestPosts = function(page,callback){
  return this
  .find()
  .sort('field -date_created')
  .skip((page-1)*config.articlesperpage)
  .limit(config.articlesperpage)
  .find({}, callback)
}
BlogPostSchema.statics.getPostsPages=function(callback){
  return this
  .find()
  .count({},callback);
}
BlogPostSchema.statics.getPostsPagesByAuthor=function(authorid,callback){
  return this
  .find({'authorid':authorid})
  .count({},callback);
}
BlogPostSchema.statics.getLatestPostsByAuthor=function(authorid,page,callback){
  return this
  .find({'authorid':authorid})
  .sort('field -date_created')
  .skip((page-1)*config.articlesperpage)
  .limit(config.articlesperpage)
  .find({}, callback);
}
BlogPostSchema.methods={
  saveBlogPost:function(callback){
    var me =this;
    me.save(callback);
  }
};
//this happens before it saves, they are called middleware

BlogPostSchema.pre('save', function(next){
  console.log('Saving...');
  next();
});

//this happens before it removes, they are called middleware

BlogPostSchema.pre('remove', function(next){
  console.log('removing...');
  next();
});

//this happens when it inititializes, they are called middleware

BlogPostSchema.pre('init', function(next){
  console.log('initializing...');
  next();
});

mongoose.model('BlogPost',BlogPostSchema);