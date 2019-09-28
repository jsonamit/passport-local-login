
'use strict';

/*!
 * Module dependencies
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/userModel/user.model');
// Used to serialize the user for the session
passport.serializeUser(function (user, done) {
    console.log('====serializeUser====',user[0].id);
    return done(null, user[0].id);
});

// Used to deserialize the user
passport.deserializeUser(function (id, done) {
    User
    .findById(id, function (err, user) {
        if (err) {
            return done(err);
        } else {
            return done(null, user);
        }
    });
});

// Set Local Strategy for authentication
passport.use('localSign',new LocalStrategy(
    function (username, password, done) {
        var email = 'jsonamit@gmail.com';
        
        User.find({email:username}, function (err, user) {
            var pass = user.password;
           if (err) {
            return done(err,false,{message:'Error'});
           }
           if (user=='') {
                return done(err,false,{message:'email incorrect'});
           } 
           
            return done(null,user);
           
        //    bcrypt.compare(password,user.password,(err,isMatch)=>{
        //     if(isMatch) {
        //         console.log('*************isMatch*********',isMatch)
        //         return done(null,user);
        //     }else {
        //         return done(null,false,{message:'password incorrect'})
        //     }
        //   })
       
        });
        
    }
));

