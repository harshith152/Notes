import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CreateGroupPopup from './CreateGroupPopup';

const Sidebar = ({ groups, createGroup, onGroupSelect }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const location = useLocation();
  
  const handleCreateGroup = (newGroup) => {
    createGroup(newGroup);
    setIsPopupOpen(false);
  };

  const getGroupInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
  };

  const isActiveGroup = (index) => {
    return location.pathname === `/group/${index}`;
  };

  const handleGroupClick = () => {
    onGroupSelect();
  };

  return (
    <div className="sidebar show-sidebar">
      <h1 className="sidebar-title">Pocket Notes</h1>
      <button className="create-group-button" onClick={() => setIsPopupOpen(true)}>
        + Create Notes group
      </button>
      <ul className="group-list">
        {groups.map((group, index) => (
          <li key={index} className={isActiveGroup(index) ? 'active' : ''}>
            <Link to={`/group/${index}`} className="group-item" onClick={handleGroupClick}>
              <span
                style={{ backgroundColor: group.color }}
                className="group-icon"
              >
                {getGroupInitials(group.name)}
              </span>
              <span className="group-name">{group.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      {isPopupOpen && <CreateGroupPopup onCreateGroup={handleCreateGroup} onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default Sidebar;
