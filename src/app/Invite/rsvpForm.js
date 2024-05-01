import React, { useState, useEffect } from "react";

import EventForm from "./forms/eventForm.js";

const RSVPForm = ({ closeForm, family, invitedTo }) => { 
  const [shitaabiMembers, setShitaabiMembers] = useState(undefined) 

  useEffect(()=>{
    if(!family) return
    const updatedMem = family.filter(member => parseInt(member.ShitabiInvite) === 1)
    setShitaabiMembers(updatedMem)
    console.log("setting members", family, updatedMem)
  },[family])

  useEffect(()=>{
    console.log("MEMEBRS",shitaabiMembers)
  },[shitaabiMembers])
  
  return (
    <dialog open className="formModal">
      {family ? (
        <div className="row">
          <div className="col-md-12 d-flex">
            <img
              className="closeRing"
              src="/close_ring.svg"
              onClick={closeForm}
              alt="close"
            />
            <label className="fs-2 formHeader">RSVP</label>
          </div>
        </div>
      ) : (
        <h3> Loading...</h3>
      )}
      {invitedTo.shitaabiT && (
        <div>
          <EventForm
            title="Shitaabi"
            date="August 16th, 2024"
            location="B2 Georges road, Dayton NJ, 08810"
            members={shitaabiMembers}
          />
        </div>
      )}
      {/*invitedTo.waalimoT && (
        <div>
          <ShitaabiForm
            title="Shitaabi"
            date="August 16th, 2024"
            location="B2 Georges road, Dayton NJ, 08810"
          />
        </div>
      )*/}
    </dialog>
  );
};

export default RSVPForm;
