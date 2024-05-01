import React from "react";

import ShitaabiForm from "./forms/shitaabiForm.js"

const RSVPForm = ({ closeForm }) => {
  return (
    <dialog open className="formModal">
      <div className="row">
        <div className="col-md-12 d-flex">
          <img className="closeRing" src="/close_ring.svg" onClick={closeForm}/>
          <label className="fs-2 formHeader">RSVP</label>
        </div>
      </div>
      <ShitaabiForm />
    </dialog>
  );
};

export default RSVPForm;
