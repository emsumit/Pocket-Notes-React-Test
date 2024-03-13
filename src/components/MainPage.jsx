import React from "react";
import "./MainPage.css";
import mainImg from "../assets/homepage.png";
import lock from "../assets/lock.png";
export default function MainPage() {
  return (
    <div className="main-page">
      <div>
        <img src={mainImg} />
      </div>
      <div>
        <h2 className="">Pocket Notes</h2>
      </div>
      <div>
        <p className="main-text">
          Send and receive messages without keeping your phone online. Use
          Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
      </div>
      <div className="bottom-lock">
        <img src={lock} style={{ width: "20px" }} />
        <p>end-to-end encrypted</p>
      </div>
    </div>
  );
}
