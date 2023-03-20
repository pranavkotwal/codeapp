// conroller is a set of action
const Post = require('../models/post')
const User = require('../models/user')
const comment = require('../models/comment')

module.exports.home = async function(req,res){
   
try{
// populate the user for each post
   let posts = await Post.find({})
   .sort('-createdAt')
   .populate('user')
   .populate({
      path:'comments',
      populate:{
         path:'user'        
      }
   })

     let users= await User.find({})
      
      return res.render('home',
      {
         title:"CodeApp|| Home",
         posts:posts,
         all_users:users
      })
   

}catch(err){
   console.log("Couldn't run",err)
   return;
   }
}

