const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.use(
    new GoogleStrategy({
        // options for the Strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: 'http://localhost:3000/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
    // check if user already exists in database
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if(currentUser) {
                // already have the user
                console.log(`current user is ${currentUser}`);
            } else {
                // create new user
                new User({ 
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) => {
                    console.log(`new user created: ${newUser}`);
                })
            }
        })    
    })
)