
import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import HolidaysEthiopian from './HolidaysEthiopian';

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [todayHolidays, setTodayHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const holidayCalendars = [
    'en.usa#holiday@group.v.calendar.google.com',
    'en.et#holiday@group.v.calendar.google.com',
    'en.uk#holiday@group.v.calendar.google.com',
    'en.canadian#holiday@group.v.calendar.google.com',
    'en.indian#holiday@group.v.calendar.google.com',
    // Add more calendar IDs as needed
  ];

  const apiKey = import.meta.env.VITE_GOOGLEAPI;

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: apiKey,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
      }).then(() => {
        fetchAllHolidays();
      }).catch((error) => {
        console.error("Error loading GAPI client for API", error);
        setError("Error loading the Google API client");
        setLoading(false);
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  const fetchAllHolidays = async () => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];

    try {
      const promises = holidayCalendars.map(calendarId =>
        gapi.client.calendar.events.list({
          calendarId: calendarId,
          timeMin: today.toISOString(),
          timeMax: new Date(today.setDate(today.getDate() + 1)).toISOString(),
          singleEvents: true,
          orderBy: 'startTime',
        })
      );
      const results = await Promise.all(promises);
      const allHolidays = results.flatMap(result => result.result.items);
      setHolidays(allHolidays);
      filterTodayHolidays(allHolidays, todayString);
    } catch (error) {
      console.error("Error fetching holiday events", error);
      setError("Error fetching holiday events");
    } finally {
      setLoading(false);
    }
  };

  const filterTodayHolidays = (events, todayString) => {
    const todayEvents = events.filter(event =>
      event.start.date === todayString ||
      event.start.dateTime?.startsWith(todayString)
    );
    setTodayHolidays(todayEvents);
  };

  return (
    <div className="holiday-container">
      <div className="holiday-header">
        <h3>Other Holidays</h3>
      </div>
      
      <div className="holiday-body">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : todayHolidays.length > 0 ? (
          <ul>
            {todayHolidays.map((holiday, index) => (
              <li key={index}>{holiday.summary}</li>
            ))}
          </ul>
        ) : (
          <p>No holidays today.</p>
        )}
      </div>
    </div>
  );
};

export default Holidays;

// // src/components/HolidayList.js
// import React, { useEffect, useState } from 'react';
// import { gapi } from 'gapi-script';

// const Holidays = () => {
//   const [holidays, setHolidays] = useState([]);
//   const [todayHolidays, setTodayHolidays] = useState([]);
//   const holidayCalendars = [
//     'en.usa#holiday@group.v.calendar.google.com',
//     'en.et#holiday@group.v.calendar.google.com',
//     'en.uk#holiday@group.v.calendar.google.com',
//     'en.canadian#holiday@group.v.calendar.google.com',
//     'en.indian#holiday@group.v.calendar.google.com',
//     // Add more calendar IDs as needed
//   ];
//   const apiKey = import.meta.env.VITE_GOOGLEAPI;

//   useEffect(() => {
//     function start() {
//       gapi.client.init({
//         apiKey: apiKey,
//         discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
//       }).then(() => {
//         fetchAllHolidays();
//       }).catch((error) => {
//         console.error("Error loading GAPI client for API", error);
//       });
//     }
//     gapi.load('client:auth2', start);
//   }, []);

//   const fetchAllHolidays = async () => {
//     const today = new Date();
//     const todayString = today.toISOString().split('T')[0];

//     let allHolidays = [];
//     for (let calendarId of holidayCalendars) {
//       try {
//         const response = await gapi.client.calendar.events.list({
//           calendarId: calendarId,
//           timeMin: today.toISOString(),
//           timeMax: new Date(today.setDate(today.getDate() + 1)).toISOString(),
//           singleEvents: true,
//           orderBy: 'startTime',
//         });
//         allHolidays = allHolidays.concat(response.result.items);
//       } catch (error) {
//         console.error(`Error fetching events for calendar ${calendarId}`, error);
//       }
//     }
//     setHolidays(allHolidays);
//     filterTodayHolidays(allHolidays, todayString);
//   };

//   const filterTodayHolidays = (events, todayString) => {
//     const todayEvents = events.filter(event =>
//       event.start.date === todayString ||
//       event.start.dateTime?.startsWith(todayString)
//     );
//     setTodayHolidays(todayEvents);
//   };

//   return (
//     <div className="holiday-container">
//       <div className="holiday-header">
//         {/* <h3>Today's Holidays</h3> */}
//       </div>
//       <div className="holiday-body">
//       {todayHolidays.length > 0 ? (
//         <ul>
//           {todayHolidays.map((holiday, index) => (
//             <li key={index}>{holiday.summary}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No holidays today.</p>
//       )}
//       </div>
//     </div>
//   );
// };

// export default Holidays;
