const mongoose = require('mongoose');
const Appointment = require('./models/Appointment');

mongoose.connect('mongodb://127.0.0.1:27017/appointments', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', async () => {
  try {
    // Yeni randevu seti
    const appointments = [
      { date: '2024-05-25', time: '09:00', user: 'Ali' },
      { date: '2024-05-25', time: '09:30', user: 'Ayşe' },
      { date: '2024-05-25', time: '10:00', user: 'Mehmet' },
      { date: '2024-05-25', time: '10:30', user: 'Fatma' },
      { date: '2024-05-25', time: '11:00', user: 'Hasan' },
      { date: '2024-05-25', time: '11:30', user: 'Zeynep' },
    ];

    await Appointment.insertMany(appointments);
    console.log('New appointments added.');
  } catch (err) {
    console.error('Error adding appointments:', err);
  } finally {
    mongoose.connection.close();
  }
});
