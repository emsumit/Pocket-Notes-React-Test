// Group.js
import React from "react";

export default function Group({ title, initialLetters, color, onClick }) {
  console.log(color);
  return (
    <div onClick={onClick}>
      {" "}
      <h1 style={{ backgroundColor: color }}>{initialLetters}</h1>
      <h2>{title}</h2>
      {/* No display of notes in the Group component */}
    </div>
  );
}
