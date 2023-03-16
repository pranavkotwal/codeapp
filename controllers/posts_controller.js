const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.create = function(req,res){
    Post.create({
        content : req.body.content,
        user: req.user._id

    })
    .then((post)=>{
        return res.redirect('/')
    })
    .catch((err)=>{
       console.log( "error in creating a post" , err)
    })
}

module.exports.destroy = function(req,res){
    Post.findOne({_id: req.params.id, user: req.user.id})
    .then((post)=>{
        console.log(post)
        if(post){
            console.log(post.user)
            // .id means converting the object id into string 
            console.log("inside if")
            console.log(req.params.id)

            post.deleteOne();

            Comment.deleteMany({post:req.params.id})
            .then((message)=>{
                res.redirect('back')
            }).catch((err)=>{
                console.log("couldn't delete",err)
            });
        }
        else{
            console.log('inside else')
            res.redirect('back')
        }
    }).catch((err)=>{
        console.log("couldn't delete the post",err)
    });
}