import React, { useState, useEffect } from "react";

import EventForm from "./forms/eventForm.js";

const RSVPForm = ({ closeForm, family, invitedTo, updateMember }) => { 
  const [invitedEvents, setInvitedEvents] = useState([])
  const [mainMembers, setMainMembers] = useState(undefined) 
  const [shitaabiMembers, setShitaabiMembers] = useState(undefined) 
  const [waalimoMembers, setWaalimoMembers] = useState(undefined) 

  useEffect(()=>{
    if(!family) return
    const updatedMemS = family.filter(member => parseInt(member.ShitabiInvite) >= 1)
    setShitaabiMembers(updatedMemS)

    const updatedMemM = family.filter(member => parseInt(member.MainInvite) >= 1)
    setMainMembers(updatedMemM)

    const updatedMemW = family.filter(member => parseInt(member.WaalimoInvite) >= 1)
    setMainMembers(updatedMemW)
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
            updateMember={updateMember}
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
