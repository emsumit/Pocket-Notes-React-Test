// NoteArea.js
import React from "react";
import MainPage from "./MainPage"; // Make sure this import statement is correct
import ChatArea from "./ChatArea";

export default function NoteArea({
  showChatArea,
  selectedGroup,
  onAddNote,
  color,
}) {
  console.log(color);
  return (
    <div style={{ height: "100%" }}>
      {showChatArea ? (
        <ChatArea
          groupName={selectedGroup.title}
          notes={selectedGroup.notes}
          onAddNote={onAddNote}
          color={color}
        />
      ) : (
        <MainPage />
      )}
    </div>
  );
}
