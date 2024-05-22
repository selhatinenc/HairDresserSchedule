import React, { useState } from 'react';
import AppointmentForm from './components/AppointmentForm';
import AppointmentCalendar from './components/AppointmentCalendar';
import axios from 'axios';

const App = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormSubmit = async (appointment) => {
    try {
      await axios.post('/api/appointments', appointment);
      setSuccessMessage('Randevu başarıyla alındı!');
      setSelectedDate(appointment.date);
    } catch (error) {
      alert('Randevu alınırken hata oluştu');
    }
  };

  const handleShowAppointments = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Randevu Sistemi</h1>
      <AppointmentForm onSubmit={handleFormSubmit} onShowAppointments={handleShowAppointments} />
      {selectedDate && <AppointmentCalendar selectedDate={selectedDate} />}
    </div>
  );
};

export default App;
