const passport = require('passport')
const JWTstrategy = require('passport-jwt').Strategy;

const ExtractJWT = require('passport-jwt').ExtractJwt

const User = require('../models/user')

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeapp'

}
passport.use(new JWTstrategy(opts,function(jwt_payload,done){
    User.findOne({id: jwt_payload._id})
    .then((user)=>{

        if(user){
            return done(null,user)
        }else{
            return done(null,false)
        }
       
    }).catch((err)=>{
        return done(err,false)
    })
}))

module.exports = passport;