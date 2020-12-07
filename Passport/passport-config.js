const bcrypt = require('bcrypt');
const path = require('path');
const User = require(path.join(__dirname, '..', 'Models', 'User'));
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email })
      .then(user => {
          if (!user) {
            return done(null, false, { message: 'no_user' });
          } 
          else {
              bcrypt.compare(password, user.password, (err, isMatch) => {
                  if (err) throw err;
                  if (isMatch) {
                      return done(null, user);
                  } 
                  else {
                      return done(null, false, { message: 'wrong_pw' });
                  }
              });
          }
      })
     .catch(err => {
        return done(null, false, { message: err });
      });
}));

passport.serializeUser((user, done) => { 
  done(null, user.id); 
});
passport.deserializeUser((id, done) => { 
  User.findById(id, (err, user) => { 
    done(err, user); 
  });
});

module.exports = passport;
