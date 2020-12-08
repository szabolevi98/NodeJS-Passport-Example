const bcrypt = require('bcrypt');
const path = require('path');
const userModel = require(path.join(__dirname, '..', 'models', 'user'));
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  userModel.findOne({ email: email })
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
  userModel.findById(id, (err, user) => { 
    done(err, user); 
  });
});

module.exports = passport;
