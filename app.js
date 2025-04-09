const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const path = require('path');
const { patients, employees, appointments, medicalRecords, healthTips, financialReports } = require('./data');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'healthcare_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));
app.use(flash());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.user = req.session.user || null;
    next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/patient', require('./routes/patient'));
app.use('/employee', require('./routes/employee'));

// 404 Page
app.use((req, res) => {
    res.status(404).render('404');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});