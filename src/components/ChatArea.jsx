// ChatArea.js
import React, { useState } from "react";

export default function ChatArea({ notes, onAddNote, groupName, color }) {
  const [newNote, setNewNote] = useState("");

  const handleSubmit = () => {
    if (newNote.trim() !== "") {
      onAddNote(newNote);
      setNewNote(""); // Clear the textarea after submitting
    }
  };
  const handleKeyDown = (e) => {
    // Check if Enter key is pressed
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents adding a new line (optional)
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
      <div style={{ height: "70%" }}>
        <div>
          {console.log(color)}
          <h1 style={{ backgroundColor: color }}>
            {getInitialLetters(groupName) || "No Group Selected"}
          </h1>
          <h2>{groupName}</h2>
        </div>

        <div>
          {notes.map((note, index) => (
            <div key={index}>
              <p>{note.content}</p>
              <small>{note.noteDate}</small> <small>{note.timestamp}</small>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: "30%" }}>
        <textarea
          autoComplete="off"
          style={{ width: "100%", height: "70%" }}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>{" "}
        <button onClick={handleSubmit} disabled={!newNote.trim()}>
          Submit
        </button>
      </div>
    </>
  );
}
