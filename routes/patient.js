const express = require('express');
const router = express.Router();
const { appointments, medicalRecords, healthTips } = require('../data');

// Middleware to ensure patient is logged in
router.use((req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'patient') {
        return res.redirect('/auth/login');
    }
    next();
});

// Dashboard
router.get('/dashboard', (req, res) => {
    const patientId = req.session.user.id;
    const patientAppointments = appointments.filter(a => a.patientId === patientId);
    const patientRecords = medicalRecords.filter(m => m.patientId === patientId);
    
    res.render('patient/dashboard', {
        appointments: patientAppointments,
        records: patientRecords,
        tips: healthTips
    });
});

// Home
router.get('/home', (req, res) => {
    res.render('patient/home', { user: req.session.user });
});

// Medical History
router.get('/medical-history', (req, res) => {
    const patientId = req.session.user.id;
    const patientRecords = medicalRecords.filter(m => m.patientId === patientId);
    
    res.render('patient/medical-history', { records: patientRecords });
});

// Appointments
router.get('/appointments', (req, res) => {
    const patientId = req.session.user.id;
    const patientAppointments = appointments.filter(a => a.patientId === patientId);
    
    res.render('patient/appointments', { appointments: patientAppointments });
});

// Create Appointment
router.post('/appointments', (req, res) => {
    const { date, time, reason } = req.body;
    const newAppointment = {
        id: appointments.length + 1,
        patientId: req.session.user.id,
        employeeId: 1, // Default to first employee for simplicity
        date,
        time,
        reason,
        status: 'Pending'
    };
    
    appointments.push(newAppointment);
    req.flash('success_msg', 'Appointment scheduled successfully');
    res.redirect('/patient/appointments');
});

// Cancel Appointment
router.post('/appointments/:id/cancel', (req, res) => {
    const appointment = appointments.find(a => a.id === parseInt(req.params.id));
    if (appointment) {
        appointment.status = 'Cancelled';
        req.flash('success_msg', 'Appointment cancelled successfully');
    }
    res.redirect('/patient/appointments');
});

// Health Tips
router.get('/health-tips', (req, res) => {
    res.render('patient/health-tips', { tips: healthTips });
});

module.exports = router;