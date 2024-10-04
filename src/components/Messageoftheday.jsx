import React, { useEffect, useState, useContext } from 'react';
import MyContextProvider from './MyContextProvider';
import axios from 'axios';
import HolidaysEthiopian from './HolidaysEthiopian';
import HolidaysInternational from './HolidaysInternational';
import MyContext from './MyContext';

const HolidaysOfTheDay = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {HolidayPresent, setHolidayPresent} = useContext(MyContext);
  
  return (
    <>
 
    <div className="holiday-container">
      {/* {loading ? <div> Loading...</div> : null} */}
      {error ? <div>Error:</div> : null}
      <a href="#packages"><div className="package-button">Check out our Packages</div></a>
      
            { HolidayPresent ? <>     
              <h3>Todays Holiday/s</h3>
              <div> <HolidaysEthiopian /> </div>
              <div><HolidaysInternational /></div>
              </> : null 
          }
      </div>
    </>
   
  );
};

export default HolidaysOfTheDay;
