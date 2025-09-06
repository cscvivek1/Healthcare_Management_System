const express = require('express');
const Patient = require('../models/patient');
const Appointment = require('../models/appointment');

const router = express.Router();

// GET route to fetch all appointments for a patient
router.get('/', (req, res) => {
  const { patientName } = req.query; // Patient's name from the query parameter

  Appointment.find({ patientName })
    .then((appointments) => {
      res.status(200).json({ appointments });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to fetch appointments', details: err });
    });
});

module.exports = router;
