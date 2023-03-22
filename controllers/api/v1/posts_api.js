const Post = require('../../../models/post')
const Comment = require('../../../models/comment')

module.exports.index = async function(req,res){

    let posts = await Post.find({})
   .sort('-createdAt')
   .populate('user')
   .populate({
      path:'comments',
      populate:{
         path:'user'        
      }
   })
   

    return res.status(200).json({
        message:"List of Posts",
        posts:posts

    })
}

module.exports.destroy = async function(req,res){
    const post = await Post.findOne({_id: req.params.id}) 
    try{
        // if(post){
            console.log(post.user)
            // .id means converting the object id into string 
            // console.log("inside if")
            // console.log(req.params.id)

            post.deleteOne();
        
           const comment =  Comment.deleteMany({post:req.params.id})

          
           
            
           return res.json(200,{
            message:"Post and associated comments deleted succesfully"

           })
        // } 
        // else{
        //     req.flash('error','You cannot delete this post!')
        //     res.redirect('back')
        // }

    }catch(err){
        console.log('******',err)
        return res.json(500,{
            message:"Internal Server Error"
        })
    }
    
    
}