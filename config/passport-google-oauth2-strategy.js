const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../models/user')

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "760474143315-0phophgbhhebkp6fpi41qdfln4psmerh.apps.googleusercontent.com",
    clientSecret : "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",
    callbackURL : "http://localhost:8000/users/auth/google/callback"

},
    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec()
        .then((user)=>{
             console.log(profile)
             console.log(accessToken,refreshToken)
            //if found set this as req.user
            if(user){
                return done(null,user)
            }else{
                // if not found create user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email : profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                }).then((user)=>{
                return done(null,user)
                console.log('New User Created')})
                .catch((err)=>{
                console.log("Error",err)})
            }

        }).catch((err)=>{
            console.log('error in google strategy-passport',err) 
            return   
        })      
    }

))
 

module.exports = passport