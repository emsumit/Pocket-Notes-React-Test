import React from "react";
import Group from "./Group";
import "./GroupList.css";

export default function GroupList({
  groups,
  onGroupClick,
  onDeleteGroup,
  selectedGroupId,
}) {
  const handleClick = (group) => {
    onGroupClick(group);
  };

  return (
    <>
      <div className="header-name">
        <h1>Pocket Notes</h1>
      </div>
      <div className="list-container">
        {groups.map((group) => (
          <div key={group.id}>
            <Group
              title={group.title}
              initialLetters={getInitialLetters(group.title)}
              color={group.color}
              onClick={() => handleClick(group)}
              selected={selectedGroupId === group.id}
            />
            {/* <button onClick={() => onDeleteGroup(group.id)}>
              Delete Group
            </button> */}
          </div>
        ))}
      </div>
    </>
  );
}

// Helper function to get the initial letters
function getInitialLetters(title) {
  const words = title.split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase());
  return initials.slice(0, 2).join("");
}
