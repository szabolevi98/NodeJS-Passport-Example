//Dependencies
const router = require('express').Router();
const path = require('path');
const auth = require(path.join(__dirname, '..', 'passport', 'auth'));
const messageModel = require(path.join(__dirname, '..', 'models', 'message'));

//Route send
router.route('/')
.get(auth.checkAuthenticated, (req, res) => {
    res.render('send', {
        title: 'Üzenetküldés',
        senderId: req.user._id,
        loggedIn: true,
        atSend: true
    });
})
.post(auth.checkAuthenticated, async(req, res) => {
    const messageObject = {
        senderId: req.body.senderId,
        subject: req.body.subject,
        message: req.body.message
      };
      try {
        const postMessage = new messageModel(messageObject);
        await postMessage.save();
        res.render('send', {
            title: 'Üzenetküldés',
            subject: req.body.subject,
            message: req.body.message,
            loggedIn: true,
            atSend: true,
            success: true
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
