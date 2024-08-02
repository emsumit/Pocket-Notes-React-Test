import React, { useState, useEffect } from "react";
import "./HomePage.css";
import GroupList from "../components/leftMenu/GroupList";
import NoteArea from "../components/NoteArea";
import AddGroupForm from "../components/leftMenu/AddGroupForm";
import {
  getAllGroups,
  createGroup,
  deleteGroup,
  updateGroup,
} from "../api/notes";

export default function HomePage() {
  const [showChatArea, setShowChatArea] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([]);
  const [showAddGroupForm, setShowAddGroupForm] = useState(false);
  const [showNoteArea, setShowNoteArea] = useState(false);

  // Load data from backend on the initial render
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const fetchedGroups = await getAllGroups();
        setGroups(fetchedGroups);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const handleAddGroup = async (newGroupName, color) => {
    try {
      const newGroup = {
        title: newGroupName,
        color,
        notes: [],
      };
      const response = await createGroup(newGroup);
      setGroups((prevGroups) => [...prevGroups, response]);
      setShowAddGroupForm(false);
    } catch (error) {
      console.error("Error adding group:", error);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await deleteGroup(groupId);
      setGroups((prevGroups) =>
        prevGroups.filter((group) => group._id !== groupId)
      );
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  const handleBackButtonClick = () => {
    setShowNoteArea(false); // Hide note area when back button is clicked
  };

  const handleGroupClick = (group) => {
    setShowChatArea(true);
    setSelectedGroup(group);
    setShowNoteArea(true);
  };

  const handleAddNote = async (newNote) => {
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
          group._id === selectedGroup._id ? updatedGroup : group
        )
      );

      // Update the group in the backend
      try {
        await updateGroup(selectedGroup._id, updatedGroup);
      } catch (error) {
        console.error("Error updating group:", error);
      }
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
          selectedGroupId={selectedGroup ? selectedGroup._id : null}
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
      </div>
      {showAddGroupForm && (
        <AddGroupForm
          onAddGroup={handleAddGroup}
          onClose={handleAddGroupFormClose}
        />
      )}
    </div>
  );
}
