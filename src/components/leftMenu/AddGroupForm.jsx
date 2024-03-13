import React, { useState } from "react";
import "./AddGroupForm.css";
import ColorPicker from "./ColorPicker"; // Import the ColorPicker component

const AddGroupForm = ({ onAddGroup, onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ff5733");

  const handleSubmit = () => {
    if (groupName.trim() !== "") {
      onAddGroup(groupName, selectedColor); // Pass the selectedColor to onAddGroup
      setGroupName("");
      setSelectedColor("#ff5733"); // Reset the color to default
      onClose();
    }
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("modal-container")) {
      onClose();
    }
  };

  // Function to handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="modal-container" onClick={handleCloseModal}>
      <div className="modal-content">
        <input
          type="text"
          placeholder="Enter Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        {/* Render the ColorPicker component */}
        <ColorPicker onSelectColor={handleColorSelect} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AddGroupForm;
