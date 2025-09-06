const express = require('express');
const path = require('path');
const mongoose = require('mongoose');


// Models
const Appointment = require('./models/appointment');
const Patient = require('./models/patient');
const Doctor = require('./models/doctor');

// Routes
const patientRoutes = require('./routes/patientRoutes'); // ✅ Patient API route
const doctorRoutes = require('./routes/doctorRoutes');   // (Optional) If needed later
const appointmentRoutes = require('./routes/appointmentRoutes'); // (Optional) If needed later

const app = express();

// ✅ MongoDB Connection
// MongoDB Connection (use env var in production, fallback to local)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));


// ✅ View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ Static Files
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Body Parser Middleware
app.use(express.json());

// ✅ EJS Page Routes
app.get('/', (req, res) => {
  res.render('page1');
});

app.get('/doctor-dashboard', (req, res) => {
  res.render('doctor-dashboard');
});

app.get('/patient-dashboard', (req, res) => {
  res.render('patient-dashboard', { patientName: "Amit" }); 
});


// ✅ API Routes
app.use('/api/patients', patientRoutes);         // 🩺 Get appointments for patient
app.use('/api/doctors', doctorRoutes);           // 🧑‍⚕️ (if using doctor dashboard API)
app.use('/api/appointments', appointmentRoutes); // 📅 (if using general appointment APIs)

// ✅ Book Appointment (POST)
app.post('/api/appointments', (req, res) => {
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
      // Link appointment to patient
      Patient.findOne({ name: patientName })
        .then((patient) => {
          if (!patient) {
            const newPatient = new Patient({
              name: patientName,
              appointments: [appointment._id],
            });
            newPatient.save();
          } else {
            patient.appointments.push(appointment._id);
            patient.save();
          }
        });

      // Link appointment to doctor
      Doctor.findOne({ name: doctorName })
        .then((doctor) => {
          if (!doctor) {
            const newDoctor = new Doctor({
              name: doctorName,
              specialty: specialty,
              appointments: [appointment._id],
            });
            newDoctor.save();
          } else {
            doctor.appointments.push(appointment._id);
            doctor.save();
          }
        });

      res.status(200).json({
        message: 'Appointment booked successfully!',
        appointment,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to book appointment', details: err });
    });
});

// ✅ Server Start
// Server Start (use process.env.PORT for Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

