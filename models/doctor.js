const mongoose = require('mongoose');

// Doctor Schema
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }]
});

// Create the Doctor model
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
