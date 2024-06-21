import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const holidaykey = import.meta.env.VITE_HOLIDAYKEY2; // Replace with your actual Calendarific API key

  const year = new Date().getFullYear(); // Get the current year

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get(`https://calendarific.com/api/v2/holidays?api_key=${holidaykey}&country=world&year=${year}`);
        setHolidays(response.data.response.holidays);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHolidays();
  }, [holidaykey, year]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Major Holidays of the World</h1>
      {holidays && holidays.length > 0 ? ( // Add a check for holidays here
        <ul>
          {holidays.map((holiday, index) => (
            <li key={index}>{holiday.name} - {holiday.date.iso}</li>
          ))}
        </ul>
      ) : (
        <p>No holidays found for this year.</p>
      )}
    </div>
  );
};

export default Holidays;
