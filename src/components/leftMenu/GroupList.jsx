// GroupList.js
import React from "react";
import Group from "./Group";

export default function GroupList({ groups, onGroupClick, onDeleteGroup }) {
  const handleClick = (group) => {
    onGroupClick(group);
  };

  return (
    <div>
      <div>
        <h1>Pocket Notes</h1>
      </div>
      <div>
        {groups.map((group) => (
          <div key={group.id}>
            {/* Pass the initial letters and color as props */}
            <Group
              title={group.title}
              initialLetters={getInitialLetters(group.title)}
              color={group.color}
              onClick={() => handleClick(group)}
            />
            <button onClick={() => onDeleteGroup(group.id)}>
              Delete Group
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to get the initial letters
function getInitialLetters(title) {
  const words = title.split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase());
  return initials.slice(0, 2).join("");
}
