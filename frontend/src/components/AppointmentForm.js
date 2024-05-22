import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentForm = ({ onSubmit }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [user, setUser] = useState('');
  const [error, setError] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    if (date) {
      const fetchAvailableTimes = async () => {
        try {
          const response = await axios.get(`/api/available-times?date=${date}`);
          setAvailableTimes(response.data);
        } catch (error) {
          console.error('Failed to fetch available times:', error);
        }
      };

      fetchAvailableTimes();
    }
  }, [date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await onSubmit({ date, time, user });
    } catch (err) {
      setError('Randevu alma işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Randevu Al</h2>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Tarih</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Saat</label>
        <select value={time} onChange={(e) => setTime(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
          <option value="" disabled>Bir saat seçin</option>
          {availableTimes.map((availableTime) => (
            <option key={availableTime} value={availableTime}>{availableTime}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">İsim</label>
        <input type="text" value={user} onChange={(e) => setUser(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Randevu Al</button>
    </form>
  );
};

export default AppointmentForm;
