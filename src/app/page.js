"use client";
import React, { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import Details from "./Invite/details.js";
import RSVPForm from "./Invite/rsvpForm.js";
import Tunes from "./Invite/tunes.js";

const main = {
  front: "/frontCard.jpeg",
  back: "/backCard.jpeg",
  flipped: true,
};
const shitaabi = {
  front: "/Shitaabi.png",
  back: "/ShitaabiBack.png",
  flipped: true,
};
const waalimo = {
  front: "/waalimoFront.jpg",
  back: "/WalimoBack.jpg",
  flipped: true,
};

const Home = () => {
  const [family, setFamily] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [mainT, setMainT] = useState(false);
  const [shitaabiT, setShitaabiT] = useState(false);
  const [waalimoT, setWaalimoT] = useState(false);

  const [headMember, setHeadMember] = useState(false);

  const [showBack, setShowBack] = useState(false);

  const [isFlipped, setIsFlipped] = useState([]);

  const searchParams = useSearchParams();
  const guid = searchParams.get("guid");

  const gLoc = "Al Masjid Al Zainee Anjuman-e-Burhani (New Jersey)";
  const dLoc =
    "341 Dunhams Corner Rd, East Brunswick, NJ 08816 Saturday, August 17th, 2024";
  const rsvpDate = "Saturday, June 15th, 2024";

  const [cardOrder, setCardOrder] = useState(() => {
    const order = [];
    if (waalimoT) order.push(waalimo);
    if (shitaabiT) order.push(shitaabi);
    if (mainT) order.push(main);
    return order;
  });

  useEffect(() => {
    if (!family) return;
    const updatedMainT = Object.values(family).some(
      (fam) =>
        fam.MainInvite === "1" ||
        parseInt(fam.MainInvite) > 1 ||
        fam.MainInvite === "ALL",
    );
    setMainT(updatedMainT);

    const updatedShitaabiT = Object.values(family).some(
      (fam) => fam.ShitabiInvite === "1" || parseInt(fam.ShitabiInvite) > 1,
    );
    setShitaabiT(updatedShitaabiT);

    const updatedWaalimoT = Object.values(family).some(
      (fam) => fam.WalimoInvite === "1" || parseInt(fam.WalimoInvite) > 1,
    );
    setWaalimoT(updatedWaalimoT);

    setCardOrder(() => {
      const order = [];
      if (updatedWaalimoT) order.push(waalimo);
      if (updatedShitaabiT) order.push(shitaabi);
      if (updatedMainT) order.push(main);
      const flip = Array(order.length).fill(false);
      setIsFlipped(flip);
      console.log(order, flip);
      return order;
    });

    const headM = family.find((fam) => fam["HOF_Flag"] === "Self");
    setHeadMember(headM);
  }, [family]);

  useEffect(() => {
    const fetchData = async (guid) => {
      try {
        const response = await fetch(`/api/sheets?guid=${guid}`);
        const data = await response.json();
        // Process the data as needed
        setFamily(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(guid);
  }, [guid]);

  const handleCardClick = (clickedCard, index) => {
    const frontCard = cardOrder[cardOrder.length - 1];
    const isFrontCardFlipped = frontCard.flipped;

      if (!isFrontCardFlipped) {
        console.log("NOT FRONT CARD");
        // If the front card is not flipped, trigger the flip animation
        const updatedOrder = cardOrder.map((card) =>
          card === frontCard ? { ...card, flipped: true } : card,
        );
        setCardOrder(updatedOrder);

        // Wait for the flip animation to complete before updating the order
        setTimeout(() => {
          updateCardOrder(clickedCard);
        }, 950); // Adjust the delay as needed (600ms is a typical flip animation duration)
      } else {
        // If the front card is already flipped, update the order immediately
      //
        updateCardOrder(clickedCard);
      }
    
  };

  const updateCardOrder = (clickedCard) => {
    const newOrder = cardOrder.filter((card) => card !== clickedCard);
    newOrder.forEach((card) => (card.flipped = true));
    newOrder.push({ ...clickedCard, flipped: false });
    setCardOrder(newOrder);
  };

  const openForm = () => {
    setShowModal(true);
  };

  const formSubmit = () => {
    setShowModal(false);
  };

  const updateMember = (member) => {
    const updatedFam = family.map((mem) => {
      if (mem.NJscan_id === member.NJscan_id) {
        return member;
      }
      return mem;
    });
    setFamily(updatedFam);
  };

  const saveRsvpRes = async () => {
    toast("Thank you for your response");
    setShowModal(false);
    try {
      const response = await fetch("/api/sheets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ family }),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        throw new Error("Failed to save data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container text-center landingpage">
      {showModal && (
        <RSVPForm
          closeForm={formSubmit}
          family={family}
          invitedTo={{ mainT, shitaabiT, waalimoT }}
          updateMember={updateMember}
          saveRsvpRes={saveRsvpRes}
        />
      )}
      <div className="row p-3 mt-3 mb-4">
        <h1>Mogul Shaadi 1446</h1>
      </div>
      {!guid ? (
        <div className="row">
          <div className="col-12 text-center">
            <p className="fs-2">Soon?</p>
          </div>
        </div>
      ) : family && Object.keys(family).length > 0 ? (
        <div className="row">
          <Tunes />
          <div className="col-12 col-md-5 p-3 order-md-1 cardsDiv">
            <div className="image-stack">
              {cardOrder.map((item, index) => {
                const handleClick = () => {
                  handleCardClick(item, index);
                  console.log(item.flipped);
                };

                return (
                  <div
                    key={index}
                    className="cardD"
                    onClick={handleClick}
                    style={{ zIndex: cardOrder.indexOf(item) + 1 }}
                  >
                    <div className="flip-card">
                      <div
                        className={`flip-card-inner ${item.flipped ? "flipped" : ""}`}
                      >
                        <div className="flip-card-front">
                          <img
                            src={item.front}
                            alt="Card"
                            className="cardView card-img-top"
                          />
                        </div>
                        <div className="flip-card-back">
                          <img
                            src={item.back}
                            alt="Card"
                            className="cardView card-img-top"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-12 col-md-1" />
          <div className="col-12 col-md-5 d-flex align-items-center order-md-2">
            <Details
              genericLocation={gLoc}
              detailedLocation={dLoc}
              rsvpDate={rsvpDate}
              openForm={openForm}
              headMember={headMember}
              family={family}
            />
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-12 text-center">
            <p className="fs-2">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Root() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />

      <ToastContainer />
    </Suspense>
  );
}
