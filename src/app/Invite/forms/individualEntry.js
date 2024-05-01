import React from 'react'

const Component = ({member, key}) => {
  return(
  <div>
      <div className="d-flex justify-content-left individualEntry">
        <label className="fs-5">{member.Fname} {member.Lname}</label>
      </div>
    </div>
  )
}

export default Component;
