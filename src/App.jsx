import React, { useState, useEffect } from "react";
import { useRef } from "react";

import "./App.css";
import GroupList from "./components/leftMenu/GroupList";
import NoteArea from "./components/NoteArea";
import AddGroupForm from "./components/leftMenu/AddGroupForm";

export default function App() {
  const hasLoadedLocalStorage = useRef(false);

  const [showChatArea, setShowChatArea] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([]);
  const [showAddGroupForm, setShowAddGroupForm] = useState(false);

  // Load data from local storage on the initial render
  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];

    // Only set the state on the initial render
    if (!hasLoadedLocalStorage.current) {
      setGroups(storedGroups);
      hasLoadedLocalStorage.current = true;
    }
  }, []);

  // Save data to local storage whenever groups state changes
  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  const handleAddGroup = (newGroupName, color) => {
    setGroups((prevGroups) => {
      const newGroup = {
        id: prevGroups.length + 1,
        title: newGroupName,
        notes: [],
        color: color,
      };
      return [...prevGroups, newGroup];
    });
    setShowAddGroupForm(false);
  };

  const handleDeleteGroup = (groupId) => {
    setGroups((prevGroups) =>
      prevGroups.filter((group) => group.id !== groupId)
    );
  };

  const handleBackButtonClick = () => {
    setShowNoteArea(false); // Hide note area when back button is clicked
  };

  const [showNoteArea, setShowNoteArea] = useState(false);

  const handleGroupClick = (group) => {
    setShowChatArea(true);
    setSelectedGroup(group);
    setShowNoteArea(true);
  };

  const handleAddNote = (newNote) => {
    if (selectedGroup) {
      const currentDate = new Date();

      const optionsTime = {
        hour: "numeric",
        minute: "numeric",
        hour12: true, // Use 12-hour format
      };

      const day = currentDate.toLocaleString("en-US", { day: "numeric" });
      const month = currentDate.toLocaleString("en-US", { month: "long" });
      const year = currentDate.toLocaleString("en-US", { year: "numeric" });
      const formattedDate = `${day} ${month} ${year}`;
      const formattedTime = currentDate.toLocaleString("en-US", optionsTime);

      const updatedGroup = {
        ...selectedGroup,
        notes: [
          ...selectedGroup.notes,
          {
            content: newNote,
            noteDate: formattedDate,
            timestamp: formattedTime,
          },
        ],
      };
      setSelectedGroup(updatedGroup);
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === selectedGroup.id ? updatedGroup : group
        )
      );
    }
  };

  const handleAddGroupClick = () => {
    setShowAddGroupForm(true);
  };

  const handleAddGroupFormClose = () => {
    setShowAddGroupForm(false);
  };

  return (
    <div className={`main-container ${showNoteArea ? "note-area-shown" : ""}`}>
      <div className={`group-area ${showNoteArea ? "group-area-hidden" : ""}`}>
        <GroupList
          groups={groups}
          onGroupClick={handleGroupClick}
          onDeleteGroup={handleDeleteGroup}
          selectedGroupId={selectedGroup ? selectedGroup.id : null}
        />
        <div className="add-group-btn" onClick={handleAddGroupClick}>
          +
        </div>
      </div>
      <div className={`notes-area ${showNoteArea ? "notes-area-shown" : ""}`}>
        <NoteArea
          groups={groups}
          showChatArea={showChatArea}
          selectedGroup={selectedGroup}
          onAddNote={handleAddNote}
          onBackButtonClick={handleBackButtonClick}
        />
      </div>{" "}
      {showAddGroupForm && (
        <AddGroupForm
          onAddGroup={handleAddGroup}
          onClose={handleAddGroupFormClose}
        />
      )}
    </div>
  );
}
