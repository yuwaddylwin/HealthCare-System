const express = require('express');
const router = express.Router();
const { data, saveData } = require('../data');
const { patients, appointments, medicalRecords, financialReports } = require('../data');


// Middleware to ensure employee is logged in
router.use((req, res, next) => {
    if (!req.session.user || req.session.user.role === 'patient') {
        return res.redirect('/auth/login');
    }
    next();
});

// Dashboard
router.get('/dashboard', (req, res) => {
    res.render('employee/dashboard', {
        patientCount: patients.length,
        appointmentCount: appointments.length,
        recentAppointments: appointments.slice(0, 5),
        patients: patients 
    });
});

// Home
router.get('/home', (req, res) => {
    res.render('employee/home', { 
        user: req.session.user,
        patients: patients 
    });
});

// Manage Patients
router.get('/manage-patients', (req, res) => {
    res.render('employee/manage-patients', { patients });
});

// Add Patient
router.post('/manage-patients', (req, res) => {
    const { firstName, lastName, email, phone, address, dob, gender, bloodType } = req.body;
    
    const newPatient = {
        id: patients.length + 1,
        firstName,
        lastName,
        email,
        password: 'default123', 
        phone,
        address,
        dob,
        gender,
        bloodType
    };
    
    patients.push(newPatient);
    req.flash('success_msg', 'Patient added successfully');
    res.redirect('/employee/manage-patients');
});

// Update Patient
router.post('/manage-patients/:id', (req, res) => {
    const patient = patients.find(p => p.id === parseInt(req.params.id));
    if (patient) {
        const { firstName, lastName, email, phone, address, dob, gender, bloodType } = req.body;
        patient.firstName = firstName;
        patient.lastName = lastName;
        patient.email = email;
        patient.phone = phone;
        patient.address = address;
        patient.dob = dob;
        patient.gender = gender;
        patient.bloodType = bloodType;
        
        req.flash('success_msg', 'Patient updated successfully');
    }
    res.redirect('/employee/manage-patients');
});

// Delete Patient
router.post('/manage-patients/:id/delete', (req, res) => {
    const index = patients.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        patients.splice(index, 1);
        req.flash('success_msg', 'Patient deleted successfully');
    }
    res.redirect('/employee/manage-patients');
});

// Manage Appointments
router.get('/manage-appointments', (req, res) => {
    const appointmentsWithPatientNames = appointments.map(appointment => {
        const patient = patients.find(p => p.id === appointment.patientId);
        return {
            ...appointment,
            patientName: patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown'
        };
    });
    
    res.render('employee/manage-appointments', { appointments: appointmentsWithPatientNames });
});

// Update Appointment Status
router.post('/manage-appointments/:id/status', (req, res) => {
    const appointment = appointments.find(a => a.id === parseInt(req.params.id));
    if (appointment) {
        appointment.status = req.body.status;
        req.flash('success_msg', 'Appointment status updated');
    }
    res.redirect('/employee/manage-appointments');
});
module.exports = router;