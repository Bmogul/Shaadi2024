import React, { useState, useEffect } from "react";

import EventForm from "./forms/eventForm.js";

const RSVPForm = ({
  closeForm,
  family,
  invitedTo,
  updateMember,
  saveRsvpRes,
}) => {
  const [invitedEvents, setInvitedEvents] = useState([]);
  const [mainMembers, setMainMembers] = useState(undefined);
  const [shitaabiMembers, setShitaabiMembers] = useState(undefined);
  const [waalimoMembers, setWaalimoMembers] = useState(undefined);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    if (!family) return;
    const updatedMemS = family.filter(
      (member) => parseInt(member.ShitabiInvite) >= 1,
    );
    setShitaabiMembers(updatedMemS);

    const updatedMemM = family.filter(
      (member) => parseInt(member.MainInvite) >= 1 || member.MainInvite === "ALL",
    );
    setMainMembers(updatedMemM);

    const updatedMemW = family.filter(
      (member) => parseInt(member.WalimoInvite) >= 1,
    );
    setWaalimoMembers(updatedMemW);
    console.log("WAALIMO", updatedMemW);
  }, [family]);

  useEffect(() => {
    console.log("MEMEBRS", shitaabiMembers);
  }, [shitaabiMembers]);

  useEffect(() => {
    const events = [];
    if (invitedTo.mainT) {
      events.push({
        title: "Shaadi Jaman & Darees",
        date: "August 17th, 2024",
        location: "341 Dunhams Corner Rd, East Brunswick, NJ 08816",
        members: mainMembers,
      });
    }
    if (invitedTo.shitaabiT) {
      events.push({
        title: "Shitaabi",
        date: "August 16th, 2024",
        location: "10 Wood Lake Ct, North Brunswick, NJ 08902",
        members: shitaabiMembers,
      });
    }
    if (invitedTo.waalimoT) {
      events.push({
        title: "Waalimo",
        date: "August 11th, 2024",
        location: "TBD, Houston, TX",
        members: waalimoMembers,
      });
    }
    setInvitedEvents(events);
  }, [invitedTo, shitaabiMembers, waalimoMembers, mainMembers]);

  const handlePrevClick = () => {
    setCurrentEventIndex((prevIndex) =>
      prevIndex === 0 ? invitedEvents.length - 1 : prevIndex - 1,
    );
  };

  const handleNextClick = () => {
    setCurrentEventIndex((prevIndex) =>
      prevIndex === invitedEvents.length - 1 ? 0 : prevIndex + 1,
    );
  };

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

      {invitedEvents.length > 0 && (
        <div>
          <EventForm
            key={invitedEvents[currentEventIndex].title}
            title={invitedEvents[currentEventIndex].title}
            date={invitedEvents[currentEventIndex].date}
            location={invitedEvents[currentEventIndex].location}
            members={invitedEvents[currentEventIndex].members}
            updateMember={updateMember}
          />
          <div className="d-flex justify-content-center formUtilityBtns">
            <div className="col-md">
              {currentEventIndex !== 0 && (
                <img src="/left_arrow.svg" className="prevBtn rsvpFormBtn" onClick={handlePrevClick} />
              )}
            </div>

            <div className="col-md">
              <button className="saveBtn rsvpFormBtn rounded-4" onClick={saveRsvpRes}>
                Save
              </button>
            </div>

            <div className="col-md">
              {currentEventIndex !== invitedEvents.length - 1 && (
                <img src="/right_arrow.svg" className="nextBtn rsvpFormBtn" onClick={handleNextClick} />
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
};

export default RSVPForm;
