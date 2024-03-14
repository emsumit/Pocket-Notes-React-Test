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
        <p>Create New Group</p>
        <div className="group-name-input">
          <p>Group Name</p>
          <input
            type="text"
            placeholder="Enter Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className="color-name-input">
          <p>Choose Colour</p>
          <ColorPicker onSelectColor={handleColorSelect} />
        </div>
        <div className="group-create-btn">
          <button onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default AddGroupForm;
