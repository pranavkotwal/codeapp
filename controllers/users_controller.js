const User = require('../models/user')


module.exports.profile = function(req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id)
      .then((user) => {
        if (user) {
          return res.render('user_profile', {
            title: 'User Profile',
            user: user
          });
        } else {
          console.log('User not found');
          return res.redirect('/users/sign-in');
        }
      })
      .catch((err) => {
        console.log('Error finding user by id', err);
        return res.redirect('/users/sign-in');
      });
  } else {
    return res.redirect('/users/sign-in');
  }
};


// render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:"CodeApp | Sign up"
    })
    
}


//render the sign in page
module.exports.signIn = function(req,res){
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

    // steps to authenticate

    // find the user
    User.findOne({email:req.body.email})
    .then((user)=>{
        // handle user found 
        if(user){
             // handle passwords which don't match
             if(user.password != req.body.password){
                return res.redirect('back')

             }
             //handle session creation
             res.cookie('user_id',user.id)
             return res.redirect('/users/profile')

    
        }else{
            // handle not found
            return res.redirect('back')

        }


    }).catch((err)=>{
        console.log('error in finding user',err)
    })

}