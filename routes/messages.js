//Dependencies
const router = require('express').Router();
const path = require('path');
const auth = require(path.join(__dirname, '..', 'passport', 'auth'));
const messageModel = require(path.join(__dirname, '..', 'models', 'message'));

//Route messages
router.route('/')
.get(auth.checkAuthenticated, async(req, res) => {
    res.render('messages', {
        title: 'Elküldött üzenetek',
        messagesList: await messageModel.find({ senderId: req.user._id }).lean(),
        loggedIn: true,
        atMessages: true
    });
})
.post(auth.checkAuthenticated, async(req, res) => {
      try {
        await messageModel.deleteOne({ _id: req.body._id });
        res.render('messages', {
            title: 'Elküldött üzenetek',
            messagesList: await messageModel.find({ senderId: req.user._id }).lean(),
            loggedIn: true,
            atMessages: true,
            messageRemoved: true
        });
      } 
      catch(err) {
        res.render('error', {
            title: 'Hiba',
            atError: true,
            errorMessage: err.message
        });
    }
  });

module.exports = router;
