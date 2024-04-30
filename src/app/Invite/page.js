"use client";
import React, { useState } from "react";
import Image from 'next/image'

/*import main from "/frontCard.jpeg";
import shitaabi from "/public/Shitaabi.png";
import waalimo from "/public/backCard.jpeg";*/

import Details from "./details.js";
import RSVPForm from "./rsvpForm.js";

const main = "/frontCard.jpeg";
const shitaabi= "/Shitaabi.png";
const waalimo = "/backCard.jpeg";



const Home= () => {
  const [showModal, setShowModal] = useState(false);
  const gLoc = "Al Masjid Al Zainee Anjuman-e-Burhani (New Jersey)";
  const dLoc =
    "341 Dunhams Corner Rd, East Brunswick, NJ 08816 Saturday, August 17th, 2024";
  const rsvpDate = "Saturday, June 15th, 2024";

  const mainT = true;
  const shitaabiT = true;
  const waalimoT = true;

  const [cardOrder, setCardOrder] = useState(() => {
    const order = [];
    if (waalimoT) order.push(waalimo);
    if (shitaabiT) order.push(shitaabi);
    if (mainT) order.push(main);
    return order;
  });

  const handleCardClick = (clickedCard) => {
    console.log(clickedCard);
    const newOrder = cardOrder.filter((card) => card !== clickedCard);
    newOrder.push(clickedCard);
    setCardOrder(newOrder);
  };

  const openForm = () => {
    setShowModal(true);
  };

  const formSubmit = () => {
    setShowModal(false);
  };

  return (
    <div className="container text-center landingpage">
      {showModal && <RSVPForm closeForm={formSubmit} />}
      <div className="row p-3 mt-3 mb-4">
        <h1>Mogul Shaadi 1446</h1>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 p-3 order-md-1 cardsDiv">
          <div className="image-stack">
            {cardOrder.map((item, index) => (
              <div
                key={index}
                className="cardD"
                onClick={() => handleCardClick(item)}
                style={{ zIndex: cardOrder.indexOf(item) + 1 }}
              >
                <img src={item} alt="Card" className="cardView card-img-top" />
              </div>
            ))}
          </div>
        </div>
        <div className="col-12 col-md-6 d-flex align-items-center order-md-2">
          <Details
            genericLocation={gLoc}
            detailedLocation={dLoc}
            rsvpDate={rsvpDate}
            openForm={openForm}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
