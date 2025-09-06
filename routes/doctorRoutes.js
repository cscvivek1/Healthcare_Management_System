const express = require('express');
const Doctor = require('../models/doctor');
const Appointment = require('../models/appointment');

const router = express.Router();

// GET route to fetch all appointments for a doctor
router.get('/', (req, res) => {
  const { doctorName } = req.query; // Doctor's name from the query parameter

  Appointment.find({ doctorName })
    .then((appointments) => {
      res.status(200).json({ appointments });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to fetch appointments', details: err });
    });
});

// GET route to get all doctors
router.get('/all', (req, res) => {
  Doctor.find()
    .then((doctors) => {
      res.status(200).json({ doctors });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to fetch doctors', details: err });
    });
});

module.exports = router;
