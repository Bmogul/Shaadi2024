import React from "react";

const RSVPForm = ({closeForm}) => {
  return (
    <dialog open className="formModal">
      <h2>RSVP</h2>
      
      <button onClick={closeForm}>Close</button>
    </dialog>
  );
};

export default RSVPForm;
