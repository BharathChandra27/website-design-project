// Importing modules and setting Router
var express = require('express')
var router = express.Router()

// Setting routing paths

router.get('/', (req, res) => {
    res.render('default', {title: 'About Page'})
    console.log('Starting Page...')
})
router.get('/home', (req, res) => {
    res.render('home',{ title: 'Home Page', style: 'home.css'})
    console.log('Home page...')
})
router.get('/profile', (req, res) => {
    res.render('profile', {
        title: 'Profile Page', 
        style: 'profile.css', 
        success: req.session.success, 
        errors: req.session.errors
    })
    console.log('Profile page...')
})
router.post('/profile/feedback', (req, res) => {
    req.checkBody('userName', 'Name should not be empty').notEmpty()
    req.checkBody('userEmail', 'Please enter a valid email').notEmpty().isEmail()
    req.checkBody('userFeedback', 'Feedback Should not be empty').notEmpty()
    console.log(req.body.firstName, req.body.userEmail)
    var errors = req.validationErrors()
    if (errors) {
        req.session.errors = errors
        req.session.success = false
    } else {
        req.session.success = true
    }
    res.redirect('/profile')
})
router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Registration Page', 
        style: 'register.css',
        success: req.session.success,
        errors: req.session.errors
    })
    console.log('Register page...')
})
router.post('/register/success', (req, res) => {
    // Checking all the fields
    req.checkBody('userFirstName', 'Name field should not be empty').notEmpty().isAlpha()
    req.checkBody('userLastName', 'Name field should not be empty').notEmpty().isAlpha()
    req.checkBody('userEmail', 'Please enter a valid Email').isEmail().notEmpty()
    req.checkBody('userFirstPass', 'Please enter a valid alphanumeric password').isAlpha().notEmpty()
    req.checkBody('userSecondPass', 'Password does not match').equals(req.body.userFirstPass)
    req.checkBody('userPic', 'Please choose a valid picture').notEmpty()
    req.checkBody('userTempAdd', 'Please enter your address').notEmpty()
    req.checkBody('userPerAdd', 'Please enter your address').notEmpty()
    req.checkBody('userCity', 'Please provide your city').notEmpty()
    req.checkBody('userState', 'Please provide your state').notEmpty()
    req.checkBody('userZip', 'Please provide your zip').notEmpty()

    // Catching and throwing errors
    var errors = req.validationErrors()
    if(errors) {
        req.session.errors = errors
        req.session.success = false
    } else {
        req.session.success = true
    }
    res.redirect('/register')
})
router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login Page', 
        style: 'login.css',
        success: req.session.success,
        errors: req.session.errors,
    })
    console.log('LogIn Page...')
})
router.post('/login/success', (req, res) => {
    req.checkBody('userName', 'Invalid Username entered').notEmpty()
    req.checkBody('userEmail', 'Invalid email entered').isEmail().notEmpty()
    req.checkBody('userPass', 'Invalid Password entered').equals('admin').notEmpty()
    var errors = req.validationErrors()
    if(errors) {
        req.session.errors = errors
        req.session.success = false
        res.redirect('/login')
    } else {
        req.session.success = true
        console.log(req.body.userEmail, req.body.userPass)
        res.redirect('/success')
    }
})
router.get('/success', (req, res) => {
    res.render('success', { layout: false })
})
router.get('/login/needhelp', (req, res) => {
    res.render('needhelp', { layout: false })
})
router.get('/dashboard', (req, res) => {
    res.render('dashboard', { layout: false })
})
router.get('/logout', (req, res) => {
    res.render('logout', { layout: false })
    console.log('Logout...')
})
router.get('*', (req, res) => {
    res.send('Sorry!! for the inconvenience the entered url is not a valid one...Please check the url that you have entered..')
    console.log('Unknown...')
})
 
// Exporting router
module.exports = router