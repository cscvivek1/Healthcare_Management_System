const express = require('express');
const Appointment = require('../models/appointment');
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');

const router = express.Router();

// POST route for creating an appointment
router.post('/', (req, res) => {
  const { patientName, doctorName, specialty, date, time } = req.body;

  const newAppointment = new Appointment({
    patientName,
    doctorName,
    specialty,
    date,
    time,
    status: 'pending',
  });

  newAppointment.save()
    .then((appointment) => {
      Patient.findOneAndUpdate(
        { name: patientName },
        { $push: { appointments: appointment._id } },
        { new: true }
      );

      Doctor.findOneAndUpdate(
        { name: doctorName },
        { $push: { appointments: appointment._id } },
        { new: true }
      );

      res.status(200).json({ message: 'Appointment booked successfully!', appointment });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to book appointment', details: err });
    });
});

// GET route for fetching appointments for a specific doctor
router.get('/', (req, res) => {
  const { doctorName } = req.query;

  Appointment.find({ doctorName })
    .then((appointments) => {
      res.status(200).json({ appointments });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to fetch appointments', details: err });
    });
});

// GET route for fetching appointments for a specific patient
router.get('/patient-appointments', (req, res) => {
  const { patientName } = req.query;

  Appointment.find({ patientName })
    .then((appointments) => {
      res.status(200).json({ appointments });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to fetch appointments', details: err });
    });
});

module.exports = router;
