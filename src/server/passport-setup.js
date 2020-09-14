import passport from 'passport';

import {Strategy as GoogleStrategy}  from 'passport-google-oauth20';
import {Strategy as FacebookStrategy} from 'passport-facebook';

import config from '../config';

import {User} from './models/user';

 
module.exports = () => {

    // Allowing passport to serialize and deserialize users into sessions

    passport.serializeUser((user,done) => done(null,user));
    passport.deserializeUser((user,done) => {
        done(null,user);
    })

    // The function that is called when an OAuth provider sends back user 
    // information.  Normally, you would save the user to the database here
    // in a callback that was customized for each provider.
    const facebookCallback = (accessToken, refreshToken, profile, done) => {
        const name = profile.displayName;
        const email = profile.emails[0].value;
        const userimage = profile.photos[0].value;
        User.where({email}).fetch().then( foundUser => {
            return done(null,foundUser.attributes)
        } ).catch(err => {
            const status = 1;
            User.forge({username:name,email,userimage,status}, { hasTimestamp : true}).save()
                .then(createdUser => {
                return done(null,createdUser.attributes);        
            }) ; 
        })
    }

    const googleCallback = (accessToken,refreshToken,profile,done) => {
        const name = profile.displayName;
        const email = profile.emails[0].value;
        const userimage = profile.photos[0].value;
        User.where({email}).fetch().then(foundUser => {
            return done(null,foundUser.attributes);
        }).catch(err => {
            const status = 1;
            User.forge({username:name,email,userimage,status}, { hasTimestamp : true}).save()
                .then(createdUser => {
               return done(null,createdUser.attributes);        
            }) ; 
        })
    }

    passport.use(new GoogleStrategy(config.GOOGLE_CONFIG,googleCallback));
    passport.use(new FacebookStrategy(config.FACEBOOK_CONFIG,facebookCallback));

}
