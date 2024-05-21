// src/App.js
import React from 'react';
import AppointmentForm from './components/AppointmentForm';
import AppointmentCalendar from './components/AppointmentCalendar';
import axios from 'axios';

const App = () => {
  const handleFormSubmit = async (appointment) => {
    try {
      await axios.post('/api/appointments', appointment);
      alert('Randevu başarıyla alındı');
    } catch (error) {
      alert('Randevu alınırken hata oluştu');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Randevu Sistemi</h1>
      <AppointmentForm onSubmit={handleFormSubmit} />
      <AppointmentCalendar />
    </div>
  );
};

export default App;
