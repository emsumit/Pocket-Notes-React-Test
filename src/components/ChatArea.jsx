import React, { useState } from "react";
import "./ChatArea.css";
import submitBtnDisabled from "../assets/submit-disabled.png";
import submitBtnEnabled from "../assets/submit-enabled.png";
import Ellipse from "../assets/Ellipse.png";
import backBtn from "../assets/back-btn.png";

export default function ChatArea({
  notes,
  onAddNote,
  groupName,
  color,
  backbtnclick,
}) {
  const [newNote, setNewNote] = useState("");

  const handleBackButtonClick = () => {
    backbtnclick(); // Call the onBackButtonClick function passed from App.js
  };

  const handleSubmit = () => {
    if (newNote.trim() !== "") {
      onAddNote(newNote);
      setNewNote(""); // Clear the textarea after submitting
    }
  };
  const handleKeyDown = (e) => {
    // Check if Enter key is pressed
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents adding a new line
      handleSubmit(); // Call the submit function
    }
  };

  // Function to get initial letters from the group name
  const getInitialLetters = (name) => {
    const words = name.split(" ");
    const initials = words.map((word) => word.charAt(0).toUpperCase());
    return initials.join("");
  };

  return (
    <>
      <div className="chat-area-main">
        <div className="chat-area-head">
          <div className="back-button" onClick={handleBackButtonClick}>
            <img src={backBtn} />
          </div>
          <h1 style={{ backgroundColor: color }}>
            {getInitialLetters(groupName) || "No Group Selected"}
          </h1>
          <h2>{groupName}</h2>
        </div>

        <div className="chat-area-notes">
          {notes.map((note, index) => (
            <div className="chat-notes" key={index}>
              <p>{note.content}</p>
              <div className="note-date-time">
                <small>{note.noteDate}</small>{" "}
                <div>
                  <img src={Ellipse} />
                </div>
                <small>{note.timestamp}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-input-area">
        <textarea
          placeholder="Enter your text here..........."
          autoComplete="off"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>{" "}
        <button onClick={handleSubmit} disabled={!newNote.trim()}>
          {newNote.trim() ? (
            <img src={submitBtnEnabled} alt="Enabled Button" />
          ) : (
            <img src={submitBtnDisabled} alt="Disabled Button" />
          )}
        </button>
      </div>
    </>
  );
}
