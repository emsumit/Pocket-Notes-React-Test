import React from "react";
import MainPage from "./MainPage";
import ChatArea from "./ChatArea";

export default function NoteArea({ showChatArea, selectedGroup, onAddNote }) {
  return (
    <div style={{ height: "100%" }}>
      {showChatArea ? (
        <ChatArea
          groupName={selectedGroup.title}
          notes={selectedGroup.notes}
          onAddNote={onAddNote}
          color={selectedGroup.color}
        />
      ) : (
        <MainPage />
      )}
    </div>
  );
}
