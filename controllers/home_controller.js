// conroller is a set of action
const Post = require('../models/post')
const user = require('../models/user')

module.exports.home = function(req,res){
   
   // Post.find({})
   // .then((posts)=>{
   //    return res.render('home',{
   //       title:"CodeApp|| Home",
   //       posts:posts
   //    })
      
   // }).catch((err)=>{
   //       console.log("Unable to get posts",err)
   //    })


// populate the user for each post
   Post.find({}).populate('user').exec()
   .then((posts)=>{
      return res.render('home',
      {
         title:"CodeApp|| Home",
         posts:posts
      })
   })
   .catch((err)=>{
      console.log("Couldn't populate",err)
   })
   
}



