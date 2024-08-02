import React from "react";

export default function Group({
  title,
  initialLetters,
  color,
  onClick,
  selected,
}) {
  return (
    <div
      className="groupNameAndTitle"
      style={{ backgroundColor: selected ? "#2F2F2F2B" : "transparent" }}
      onClick={onClick}
    >
      <h1 className="group-initial" style={{ backgroundColor: color }}>
        {initialLetters}
      </h1>
      <h2 className="group-title">{title}</h2>
    </div>
  );
}
