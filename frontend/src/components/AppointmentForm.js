import React, { useState } from 'react';

const AppointmentForm = ({ onSubmit }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [user, setUser] = useState('');
  const [error, setError] = useState(null); // Hata durumunu saklamak için bir state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null); // Her submit işleminden önce önceki hataları temizle
      await onSubmit({ date, time, user });
    } catch (err) {
      setError('Randevu alma işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.'); // Hata durumunu ayarla
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Randevu Al</h2>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>} {/* Hata mesajını görüntüle */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Tarih</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Saat</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
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
