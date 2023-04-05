const mongoose = require('mongoose');
const User = require('../models/user')

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    //include the arrray of ids of all comments in this post schmena itself
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }
]
},{
    timestamps:true
})

const Post = mongoose.model('Post',postSchema)

module.exports = Post;

