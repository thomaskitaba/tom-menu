import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HolidaysEthiopian from './HolidaysEthiopian';
import HolidaysInternational from './HolidaysInternational';

const HolidaysOfTheDay = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const holidayKey = import.meta.env.VITE_HOLIDAYKEY;

  return (
    <>
     <div className="holiday-container">
      <HolidaysEthiopian />
      <HolidaysInternational />
      </div>
    </>
  );
};

export default HolidaysOfTheDay;
