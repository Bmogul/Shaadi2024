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
          console.log("GOT DATA", data);
          setData(data);
        });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Google Sheets Data</h1>
      <ul>
        {data.map((row, index) => (
          <li key={index}>{row.join(", ")}</li>
        ))}
      </ul>
    </div>
  );
}
