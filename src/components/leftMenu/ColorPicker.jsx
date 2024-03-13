import React from "react";
import "./ColorPicker.css";

const ColorPicker = ({ onSelectColor }) => {
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  return (
    <div className="color-picker">
      {colors.map((color, index) => (
        <div
          key={index}
          className="color-option"
          style={{ backgroundColor: color }}
          onClick={() => onSelectColor(color)}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
