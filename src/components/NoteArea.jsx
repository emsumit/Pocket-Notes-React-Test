import React from "react";
import MainPage from "./MainPage";
import ChatArea from "./ChatArea";
import "./NoteArea.css";

export default function NoteArea({
  showChatArea,
  selectedGroup,
  onAddNote,
  onBackButtonClick,
}) {
  return (
    <div className="note-area-main">
      {showChatArea ? (
        <ChatArea
          groupName={selectedGroup.title}
          notes={selectedGroup.notes}
          onAddNote={onAddNote}
          color={selectedGroup.color}
          backbtnclick={onBackButtonClick}
        />
      ) : (
        <MainPage />
      )}
    </div>
  );
}
