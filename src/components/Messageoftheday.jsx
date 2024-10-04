import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HolidaysEthiopian from './HolidaysEthiopian';

const HolidaysOfTheDay = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const holidayKey = import.meta.env.VITE_HOLIDAYKEY;

  useEffect(() => {
    const fetchHolidays = async (retryCount = 0) => {
      try {

        const today = new Date().toISOString().split('T')[0];
        const response = await axios.get(`https://holidays.abstractapi.com/v1/?api_key=${holidayKey}&country=US&year=${today.split('-')[0]}&month=${today.split('-')[1]}&day=${today.split('-')[2]}`);
        setHolidays(response.data);
        // response = await axios.get(`https://holidays.abstractapi.com/v1/?api_key=${holidayKey}&country=US&year=${today.split('-')[0]}&month=${today.split('-')[1]}&day=${today.split('-')[2]}`);
        // setHolidays((prevHolidays) => [...prevHolidays, ...response.data]);
      } catch (err) {
        if (err.response && err.response.status === 429 && retryCount < 3) {
          // Retry after a delay if status code is 429 and retry count is less than 3
          setTimeout(() => fetchHolidays(retryCount + 1), 1000 * (retryCount + 1));
        } else {
          setError(err.message);
          setLoading(false);
        }
      } finally {
        if (retryCount === 0) setLoading(false);
      }
    };

    fetchHolidays();
  }, [holidayKey]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
    <div className="holiday-container">
    <a href="#packages"><div className="package-button">Check out our Packages</div></a>
      {holidays.length > 0 ? (
        <>
        <h3>Ethiopian Holiday</h3>
        <div> <HolidaysEthiopian /> </div>
        <h3>Other Holidays</h3>
        <ul>
          {holidays.map((holiday, index) => (
            <li key={index}>{holiday.name} - {holiday.country}</li>
          ))}
        </ul>
        </>
      ) : (
        // <p>No holidays today.</p>
        null
      )}
    </div>

    </>
  );
};

export default HolidaysOfTheDay;
