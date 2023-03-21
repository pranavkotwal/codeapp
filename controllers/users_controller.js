const User = require('../models/user')
const fs = require('fs');
const path = require('path')


module.exports.profile = function(req,res){
  User.findById(req.params.id)
  .then((user)=>{
     return res.render('user_profile',{
        title:"User page",
        profile_user:user
    })
  }).catch((err)=>{
    console.log("Unable to render the page",err)
  })
   
}

module.exports.update = async function(req,res){
  // if(req.user.id == req.params.id){
  //   User.findByIdAndUpdate(req.params.id,{name:req.body.name,email:req.body.email})
  //   .then((user)=>{
  //     return res.redirect('back')

  //   })
  //   .catch((err)=>{
      
  //     console.log("Couldnt update the field",err)
  //     return res.status(401).send('Unauthorized')
  //   })
  // }

  if(req.user.id == req.params.id){
    try{
      let user = await User.findById(req.params.id)
      User.uploadedAvatar(req,res,function(err){
        if(err){
          console.log("******Multer Error $$$$$ ", err)
        }
          user.name = req.body.name;
          user.email = req.body.email;

          if(req.file){

            if(user.avatar){
              fs.unlinkSync(path.join(__dirname, ".." , user.avatar))

            }




            // this is savig he path of the uploaded file into the avatar field in the user model
            user.avatar = User.avatarPath + "/" + req.file.filename
          }
          user.save();
          return res.redirect('/')

      })
      
    }catch(err){
      req.flash('error',err)
      return res.redirect('back')

    }

  }else{
    req.flash('error','Unauthorized!')
    return res.state(401).send('Unauthorized')

  }



}

// render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_up',{
        title:"CodeApp | Sign up"
    })
    
}


//render the sign in page
module.exports.signIn = function(req,res){
     if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }




    return res.render('user_sign_in',{
        title:"CodeApp | Sign in"
    })
}

// get the sign up date

module.exports.create = function(req, res) {
  // if password and confirm password don't match
  if (req.body.password != req.body.confirm_password) {
    return res.redirect('back');
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        User.create(req.body)
          .then((user) => {
            return res.redirect('/users/sign-in');
          })
          .catch((err) => {
            console.log('error in creating user while signing up', err);
            return res.redirect('back');
          });
      } else {
        return res.redirect('back');
      }
    })
    .catch((err) => {
      console.log('error in finding user in signing up', err);
      return res.redirect('back');
    });
};


// sign in and create a session

module.exports.createSession = function(req,res){
  req.flash('success',"Logged In Successfully")
    
    return res.redirect('/');

}


// signout

module.exports.destroySession = function(req,res){
    req.logout((err)=>{
       
        if(err){
            return next(err)

        }
    })
     req.flash('success',"You have Logged out")

    return res.redirect('/')
}