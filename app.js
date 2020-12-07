//Dependencies
const express = require('express');
const app = express();
const expHbs = require('express-handlebars')
const passport = require('passport');
const path = require('path');
const flash = require('express-flash');
const session = require('express-session');
require('dotenv').config();

//Handlebars
const hbs = expHbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  extname: '.hbs',
  helpers: {
    ifEquals: function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
    ifNotEquals: function(arg1, arg2, options) {
        return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
    }
  }
});

//App config
app.engine("hbs", hbs.engine);
app.set('view engine', "hbs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Routes (external)
const routes = require('./routes');
app.use('/', routes)

//Server start
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server is starting at port: ' + port)
});
