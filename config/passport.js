const passport = require('passport')
const LocalStrategy =  require('passport-local').Strategy
const mongoose = require('mongoose')
const db = require('../models/userSchema')

// Defining new local Strategy for authentication
passport.use('local', new LocalStrategy({
    usernameField: 'userEmail',
    passwordField: 'userPass'
},
    function(username, password, done) {
        db.findOne({
            email: username            
        }, function(err, user) {
            if(err) {
                return done(err)
            }
            if(!user) {
                return done(null, false)
            }
            if(user.password != password) {
                return done(null, false)
            }
            return done(null, user)
        })
    }
))
passport.serializeUser(function(user, cb) {
    cb(null, user.id)
})
passport.deserializeUser(function(id, cb) {
    user.findById(id, function(err, user) {
            cb(err, user)
    })
})