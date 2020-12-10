# NodeJS-Passport-Example
#### An Express app with Passport, Mongoose and Handlebars.

Live demo: Click to the image or [here](https://nodejs-passport-example.herokuapp.com).  
[![Screenshot](screenshot.png?raw=true "Passport-Example")](https://nodejs-passport-example.herokuapp.com)

To get the Node server running: 
- Clone this repo to your machine
- Register a MongoDB Atlas or use local MongoDB
- Create a file named ".env" (content below)
- `npm install` to install dependencies
- `npm run dev` to start the app with nodemon

Content of .env:
```
DB_CONNECTION = putHereYourMongoDBConnectionString
SESSION_SECRET = putHereSomeSecretString
```
Or set the same `Config Vars` at Heroku's settings if you deploy there.
