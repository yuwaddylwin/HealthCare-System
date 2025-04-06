const express = require('express');
const router = express.Router();
const { patients, employees } = require('../data');

// Login Page
router.get('/login', (req, res) => {
    res.render('auth/login');
});

// Login Handle
router.post('/login', (req, res) => {
    const { id, password, userType } = req.body;
    
    if (userType === 'patient') {
        const patient = patients.find(p => p.id === id && p.password === password);
        if (patient) {
            req.session.user = { ...patient, role: 'patient' };
            return res.redirect('/patient/dashboard');
        }
    } else {
        const employee = employees.find(e => e.id === id && e.password === password);
        if (employee) {
            req.session.user = { ...employee, role: employee.role || 'employee' };
            return res.redirect('/employee/dashboard');
        }
    }
    
    req.flash('error_msg', 'Invalid credentials');
    res.redirect('/auth/login');
});


// Logout Handle
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;