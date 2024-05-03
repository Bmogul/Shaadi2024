"use client";
import { useState, useEffect } from "react";
export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/sheets");
      const data = await response.json();
      setData(data);

      fetch("/api/sheets")
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    };

    fetchData();
  }, []);

return (
  <div>
    <h1>Family Data</h1>
    {Object.keys(data).map((hofId) => (
      <div key={hofId}>
        <h2>HOFID: {hofId}</h2>
        {data[hofId].map((family, index) => (
          <div key={index}>
            <ul>
              <li>GUID: {family.GUID}</li>
              <li>HOFID: {family.HOFID}</li>
              <li>NJscan_id: {family["NJscan_id"]}</li>
              <li>HOFID-temp: {family["HOFID-temp"]}</li>
              <li>HOF Flag: {family["HOF Flag"]}</li>
              <li>LastName: {family.LastName}</li>
              <li>relationnameTitle: {family.relationnameTitle}</li>
              <li>Fname: {family.Fname}</li>
              <li>HOFEmail: {family.HOFEmail}</li>
              <li>E-mail1: {family["E-mail1"]}</li>
              <li>Whatsapp#: {family["Whatsapp#"]}</li>
              <li>GenderSal: {family.GenderSal}</li>
              <li>Gender: {family.Gender}</li>
              <li>Name: {family.Name}</li>
              <li>MCnt: {family.MCnt}</li>
              <li>Fcnt: {family.Fcnt}</li>
              <li>MainInvite: {family.MainInvite}</li>
              <li>ShitabiInvite: {family.ShitabiInvite}</li>
              <li>WalimoInvite: {family.WalimoInvite}</li>
              <li>Mainviteby Num,ber: {family["Mainviteby Num,ber"]}</li>
              <li>MainResponse: {family.MainResponse}</li>
              <li>ShitabiResponse: {family.ShitabiResponse}</li>
              <li>WalimoResponse: {family.WalimoResponse}</li>
            </ul>
          </div>
        ))}
      </div>
    ))}
  </div>
);
}
