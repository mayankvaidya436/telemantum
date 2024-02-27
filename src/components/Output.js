import React, { useState, useEffect } from 'react';
import './Output.css';

function Output() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://gist.githubusercontent.com/telematum/7751eec667033ac8acd244542e464e18/raw/d4710c6fb54224a0bd316ecdc5246633aceefce5/todays.json');
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Today's Schedule</h1>
      {loading && <p>Loading...</p>}
      {data && data.schedule && (
        <div className="schedule">
          {data.schedule.map((item, index) => (
            <div key={index} className="schedule-item">
              <div className="time">{item.time}</div>
              <div className="event">{item.event}</div>
              <div className="placeholder" style={{ backgroundColor: item.color }}></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Output;
