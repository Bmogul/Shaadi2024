import React from "react";

import IndividualEntry from './individualEntry.js'

const EventForm = ({ title, date, location, members }) => {
  console.log(members);
  return (
    <div className="eventFormContainer">
      <div className="row d-flex mt-3">
        <div className="d-flex justify-content-left formDetailTitle ">
          <label className="fs-3">{title}</label>
        </div>
        <div className="d-flex justify-content-left formDetailContainer ">
          <img className="figIcon" src="/Date_range_fill.svg" />
          <label className="fs-6 formDetail">{date}</label>
        </div>
        <div className="d-flex justify-content-left formDetailContainer ">
          <img className="figIcon" src="/Pin_alt.svg" />
          <label className="fs-6 formDetail">{location}</label>
        </div>
      </div>
      {members && members.map((member, index) => (
        <IndividualEntry key={index} member={member} />
      ))}
        </div>
      );
};

      export default EventForm;

/*import React from 'react';

const ShitaabiComponent = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ fontFamily: 'Arial, sans-serif' }}>Shitaabi</h2>
      <p style={{ fontFamily: 'Arial, sans-serif' }}>August 16th, 2024</p>
      <button style={{ marginTop: '10px', backgroundColor: '#C4C4C4', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Add to Calendar</button>
      <p style={{ fontFamily: 'Arial, sans-serif', marginTop: '20px' }}>Shabbir Mogul</p>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <button
          style={{
            backgroundColor: '#A9D08E',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            marginRight: '10px',
            cursor: 'pointer',
          }}
        >
          Yes
        </button>
        <button
          style={{
            backgroundColor: '#C4C4C4',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ShitaabiComponent;*/
