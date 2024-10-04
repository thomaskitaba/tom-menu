import React from 'react'; // Removed unused useEffect and useState imports
import InternationalHolidays from './HolidaysInternationalJson';

// change 'Fri Oct 04 2024 14:30:00 GMT+0000 (Coordinated Universal Time)' to(->) YYYY-MM-DDTHH:MM:SS.sssZ then to(->) Format today's date as YYYY-MM-DD
const today = new Date().toISOString().split('T')[0]; // Corrected to toISOString()

// Filter for holidays that match today's date
const todaysHolidays = InternationalHolidays.filter(holiday => holiday.date === today); // Changed to filter

const HolidaysInternational = () => { // Added the functional component declaration
  return (
    <div>
      {todaysHolidays.length > 0 ? ( // Check if there are any holidays today
        todaysHolidays.map((holiday, index) => ( // Map through each holiday
          <ul>
            <li key={index}>{holiday.name} | {holiday.etname}  </li> 
          </ul>
        ))
      ) : (
        // <p>No International holidays today</p>
        null
      )}
    </div>
  );
};

export default HolidaysInternational;
