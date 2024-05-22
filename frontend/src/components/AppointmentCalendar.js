import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentCalendar = ({ selectedDate }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`/api/appointments?date=${selectedDate}`);
        setAppointments(response.data);
      } catch (error) {
        console.error('Appointment fetch failed:', error);
      }
    };

    if (selectedDate) {
      fetchAppointments();
    }
  }, [selectedDate]);

  return (
    <div className="max-w-lg mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4">Randevu Takvimi</h2>
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <div key={appointment._id} className="p-4 mb-4 bg-white shadow-md rounded">
            <p className="text-lg font-semibold">{new Date(appointment.date).toLocaleDateString()} {appointment.time}</p>
            <p className="text-gray-700">{appointment.user}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-700">Bu tarihte herhangi bir randevu yok.</p>
      )}
    </div>
  );
};

export default AppointmentCalendar;
