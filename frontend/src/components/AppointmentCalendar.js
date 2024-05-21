import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentCalendar = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Appointment fetch failed:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4">Randevu Takvimi</h2>
      {appointments.map((appointment) => (
        <div key={appointment._id} className="p-4 mb-4 bg-white shadow-md rounded">
          <p>{new Date(appointment.date).toLocaleDateString()} {appointment.time}</p>
          <p>{appointment.user}</p>
        </div>
      ))}
    </div>
  );
};

export default AppointmentCalendar;
