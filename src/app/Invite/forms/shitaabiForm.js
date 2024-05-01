/*import React from 'react'

const ShitaabiForm = () => {
  return (
    <div className="row d-flex">
      <label className="fs-4">Shitaabi</label>
  </div>)
}

export default ShitaabiForm*/

import React from 'react';

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

export default ShitaabiComponent;
