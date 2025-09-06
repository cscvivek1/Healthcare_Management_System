const mongoose = require('mongoose');

// Patient Schema
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }]
});

// Create the Patient model
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
