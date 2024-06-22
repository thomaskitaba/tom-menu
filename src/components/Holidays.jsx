// src/components/HolidayList.js
import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [testHolidays, setTestHolidays] = useState([]);
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
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  const fetchAllHolidays = async () => {
    // Change this date to a known holiday date for testing
    const testDate = new Date('2023-01-01');
    const testDateString = testDate.toISOString().split('T')[0];

    let allHolidays = [];
    for (let calendarId of holidayCalendars) {
      try {
        const response = await gapi.client.calendar.events.list({
          calendarId: calendarId,
          timeMin: testDate.toISOString(),
          timeMax: new Date(testDate.setDate(testDate.getDate() + 1)).toISOString(),
          singleEvents: true,
          orderBy: 'startTime',
        });
        allHolidays = allHolidays.concat(response.result.items);
      } catch (error) {
        console.error(`Error fetching events for calendar ${calendarId}`, error);
      }
    }
    setHolidays(allHolidays);
    filterTestHolidays(allHolidays, testDateString);
  };

  const filterTestHolidays = (events, testDateString) => {
    const testDateEvents = events.filter(event =>
      event.start.date === testDateString ||
      event.start.dateTime?.startsWith(testDateString)
    );
    setTestHolidays(testDateEvents);
  };

  return (
    <div className="holiday-container">
      <div className="holiday-header">
        <h3>Todays Message</h3>
      </div>
      <div className="holiday-body">
      {testHolidays.length > 0 ? (
        <ul>
          {/* <h3>Holidays on Test Date</h3> */}
          {testHolidays.map((holiday, index) => (
            <li key={index}>{holiday.summary}</li>
          ))}
        </ul>
      ) : (
        <p>We have some special packages for you!!!!</p>
      )}
      </div>
    </div>
  );
};

export default Holidays;
