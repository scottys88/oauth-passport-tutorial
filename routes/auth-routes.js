const router = require('express').Router();
const passport = require('passport');


// auth login
router.get('/login', (req, res) => {

    res.render('login');
})

// Auth logout
router.get('/logout', (req, res) => {
    // Handle with passport later on
    res.send('Logging out');
})

// auth with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for Google to redirect to
router.get('/google/callback', passport.authenticate('google'), (req, res) => {

    res.send('This is the callback URI')
});

module.exports = router;