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
app.post('/api/appointments', async (req, res) => {
  const { date, time, user } = req.body;
  const newAppointment = new Appointment({ date, time, user });
  await newAppointment.save();
  res.status(201).send(newAppointment);
});

// Randevuları listeleme
app.get('/api/appointments', async (req, res) => {
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
