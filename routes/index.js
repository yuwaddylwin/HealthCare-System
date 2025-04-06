const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('auth/login');
});

router.get('/home', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    if (req.session.user.role === 'patient') {
        res.redirect('/patient/dashboard');
    } else {
        res.redirect('/employee/dashboard');
    }
});

module.exports = router;