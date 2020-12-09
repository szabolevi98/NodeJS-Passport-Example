module.exports = {
    checkAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
          return next();
        }
        else {
          res.redirect('/login');
        }
    },
    checkNotAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
          return res.redirect('/');
        }
        else {
          next();
        }
    }
};
