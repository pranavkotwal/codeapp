const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.create = async function(req,res){

    try{
        const post = await Post.create({
            content : req.body.content,
            user: req.user._id
    })
    return res.redirect('/')

    }catch(err){
        console.log("Couldn't create the post")
    }
   
}

module.exports.destroy = async function(req,res){
    const post = await Post.findOne({_id: req.params.id, user: req.user.id}) 
    try{
        if(post){
            console.log(post.user)
            // .id means converting the object id into string 
            console.log("inside if")
            console.log(req.params.id)

            post.deleteOne();
        
           const comment =  Comment.deleteMany({post:req.params.id})
            
           res.redirect('back')
        } 
        else{
            console.log('inside else')
            res.redirect('back')
        }

    }catch(err){
        console.log("Unable to delete",err)
    }
    
    
}
