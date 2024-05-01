import React from "react";
import Image from 'next/image'

const Details = ({ genericLocation, detailedLocation, rsvpDate, openForm }) => {
  return (
    <div className="container">
      <div className="row mb-3">
        <h2>Location</h2>
      </div>
      <div className="row mb-3 d-flex justify-content-center text-center ">
        <label className="fs-4 w-75">{genericLocation}</label>
      </div>
      <div className="row mb-4 d-flex justify-content-center">
        <label className="fs-6 w-75">{detailedLocation}</label>
      </div>
      <div className="row mb-5">
        <div className="col-md">
          <img src="/Pin_alt.svg" />
          <a target="_blank" href="https://www.google.com/maps/place/341+Dunhams+Corner+Rd,+East+Brunswick,+NJ+08816/@40.4146621,-74.4463111,17z/data=!3m1!4b1!4m6!3m5!1s0x89c3c5051d6ec6a1:0x99723410729f8c22!8m2!3d40.4146621!4d-74.4437362!16s%2Fg%2F11b8vd5k0v?entry=ttu">
            Open Map
          </a>
        </div>
        {/*<div className="col-md">
          <label>Add to Calander</label>
        </div>*/}
      </div>
      <div className="row mb-5">
        <label className="fs-3">Please RSVP by {rsvpDate}</label>
      </div>
      <div className="row d-flex justify-content-center">
        <button className="p-2 rounded-5 w-50 fs-4 hoverbtn" style={{}} onClick={openForm}>
          RSVP Now!
        </button>
      </div>
    </div>
  );
};

export default Details; 
