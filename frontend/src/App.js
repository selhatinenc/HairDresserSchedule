// src/App.js
import React, { useState } from 'react';
import AppointmentForm from './components/AppointmentForm';
import AppointmentCalendar from './components/AppointmentCalendar';
import axios from 'axios';

const App = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleFormSubmit = async (appointment) => {
    try {
      await axios.post('/api/appointments', appointment);
      alert('Randevu başarıyla alındı');
      setSelectedDate(appointment.date);
    } catch (error) {
      alert('Randevu alınırken hata oluştu');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Randevu Sistemi</h1>
      <AppointmentForm onSubmit={handleFormSubmit} />
      {selectedDate && <AppointmentCalendar selectedDate={selectedDate} />}
    </div>
  );
};

export default App;
