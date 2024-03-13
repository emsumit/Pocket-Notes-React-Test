import React from "react";

export default function Group({ title, initialLetters, color, onClick }) {
  return (
    <div onClick={onClick}>
      {" "}
      <h1 style={{ backgroundColor: color }}>{initialLetters}</h1>
      <h2>{title}</h2>
    </div>
  );
}
