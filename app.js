//Dependencies
const express = require('express');
const app = express();
const path = require('path');
const expHbs = require('express-handlebars');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
require('dotenv').config();

//Handlebars
const hbs = expHbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
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

//Passport Config
require(path.join(__dirname, 'passport', 'passport-config'))(passport);;

//App config
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new mongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    maxAge: 365 * 24 * 60 * 60 * 1000 //1 year
  }
}));
app.use(passport.initialize());
app.use(passport.session());

//Routes (external)
const routes = require(path.join(__dirname, 'routes', 'routes'));
app.use('/', routes);

//Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, 
    (err) => {
      if (err) {
          console.log('Unable to connect to the database:', err.message);
      }
      else {
          console.log('Connected to the database successfully!');
      }
    }
);

//Server start
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server is starting at port: ' + port)
});
