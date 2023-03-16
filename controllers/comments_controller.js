const Comment = require("../models/comment")
const Post = require('../models/post')

module.exports.create = function(req,res){

    Post.findById(req.body.post)
    .then((post)=>{
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            }).then((comment)=>{
                post.comments.push(comment)
                post.save()
                res.redirect('/')
            }).catch((err)=>{
                console.log("Couldn't create a comment",err)
            })
        }
    })
    .catch((err)=>{
        console.log("Couldn't add post",err)
    })

}

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id)
    .then((comment)=>{
        if(comment.user==req.user.id){
            let postId = comment.post

            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}})
            .then((post)=>{
                return res.redirect('back')
            }).catch((err)=>{
                console.log("Couldn't update the post",err)
            })
        }else{
                return res.redirect('back')


        }
    })
}