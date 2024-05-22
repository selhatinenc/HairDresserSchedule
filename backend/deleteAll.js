const mongoose = require('mongoose');
const Appointment = require('./models/Appointment');

mongoose.connect('mongodb://127.0.0.1:27017/appointments', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', async () => {
  try {
    await Appointment.deleteMany({});
    console.log('All appointments deleted.');
  } catch (err) {
    console.error('Error deleting appointments:', err);
  } finally {
    mongoose.connection.close();
  }
});
