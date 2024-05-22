const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Appointment = require('./models/Appointment');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/appointments', {
 
});
console.log('Connected to MongoDB');
app.use(cors());

// Randevu oluşturma
app.post('/api/appointments2', async (req, res) => {
  const { date, time, user } = req.body;
  const newAppointment = new Appointment({ date, time, user });
  await newAppointment.save();
  res.status(201).send(newAppointment);
});

// Randevuları listeleme
app.get('/api/appointments2', async (req, res) => {
  const appointments = await Appointment.find({});
  res.status(200).send(appointments);
});

// Belirli bir saat ve gün için randevu kontrolü
app.get('/api/appointments/check', async (req, res) => {
  const { date, time } = req.query;
  const appointments = await Appointment.find({ date, time });
  if (appointments.length >= 2) {
    return res.status(400).send({ message: 'Bu saatte zaten iki randevu var.' });
  }
  res.status(200).send({ message: 'Randevu alınabilir.' });
});
// Get available times for a specific date
app.get('/api/available-times', async (req, res) => {
  const { date } = req.query;

  // Define 30-minute intervals
  const intervals = [
    '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30',
  ];

  // Fetch existing appointments for the date
  const appointments = await Appointment.find({ date: new Date(date) });

  // Filter out times that are already taken
  const availableTimes = intervals.filter(time => 
    !appointments.some(appointment => appointment.time === time)
  );

  res.json(availableTimes);
});

// Get appointments for a specific date
app.get('/api/appointments', async (req, res) => {
  const { date } = req.query;
  const appointments = await Appointment.find({ date: new Date(date) }).sort({ time: 1 });
  res.json(appointments);
});

// Create a new appointment
app.post('/api/appointments', async (req, res) => {
  const { date, time, user } = req.body;
  
  // Check if the time slot is already taken
  const existingAppointment = await Appointment.findOne({ date: new Date(date), time });
  if (existingAppointment) {
    return res.status(400).json({ message: 'This time slot is already taken' });
  }

  const appointment = new Appointment({ date: new Date(date), time, user });
  await appointment.save();
  res.status(201).json(appointment);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
