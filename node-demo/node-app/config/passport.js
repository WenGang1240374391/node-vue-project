const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require("mongoose");
const user = mongoose.model("user");
const keys = require("../config/keys.js");
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        user.findById(jwt_payload.id).then(user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false)
        }).catch(err => {
            console.log(err)
        })
    }));
};