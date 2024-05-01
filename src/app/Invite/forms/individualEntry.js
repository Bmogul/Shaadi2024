import React, { useState, useEffect } from "react";

const Component = ({ key, member, event, updateMember }) => {
  const [eventRes, setEventRes] = useState(undefined);
  const [memberData, setMemberData] = useState(member);

  useEffect(() => {
    switch (event) {
      case "Shitaabi":
        setEventRes("ShitabiResponse");
        break;
      case "Waalimo":
        setEventRes("WalimoResponse");
        break;
      case "Shaadi Jaman & Darees":
        setEventRes("MainResponse");
        break;
      default:
        console.log(event);
        setEventRes(null);
        break;
    }
  }, [event]);

  const handleButtonClick = (response) => {
    console.log(response);
    const updatedMemberData = { ...memberData };
    updatedMemberData[eventRes] = response ? 1 : 0;
    setMemberData(updatedMemberData);
    updateMember(updatedMemberData);
  };

  const isYesButtonActive = parseInt(memberData[eventRes]) === 1;
  const isNoButtonActive = parseInt(memberData[eventRes]) === 0;

  return (
    <div>
      {(eventRes != undefined) & (eventRes != null) ? (
        <div className="individualEntry">
          <div className="col-md-4">
            <label className="fs-5">
              {member.Fname + " " + member.LastName}
            </label>
          </div>
          <div className="col-md-3">
            <button
              className={`rounded-4 fs-5 rsvpResBtn ${isYesButtonActive ? "rsvpResBtnS" : ""}`}
              onClick={() => handleButtonClick(true)}
            >
              Yes
            </button>
          </div>
          <div className="col-md-3">
            <button
              className={`rounded-4 fs-5 rsvpResBtn ${isNoButtonActive ? "rsvpResBtnS" : ""}`}
              onClick={() => handleButtonClick(false)}
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <div>
          <label>Hello {eventRes}</label>
        </div>
      )}
    </div>
  );
};

export default Component;
