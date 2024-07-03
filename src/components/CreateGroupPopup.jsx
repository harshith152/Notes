import React, { useState } from 'react';

const colors = ['#C77DFF', '#A29BFE', '#74B9FF', '#81ECEC', '#FFA69E', '#74C69D'];

const CreateGroupPopup = ({ onCreateGroup, onClose }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleCreate = () => {
    if (groupName.trim()) {
      onCreateGroup({ name: groupName, color: selectedColor, messages: [] });
      setGroupName('');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Create New Notes Group</h2>
        <div className="form-group">
          <label htmlFor="group-name">Create group name:</label>
          <input
            id="group-name"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter your group name..."
          />
        </div>
        <div className="form-group">
          <label>Choose colour:</label>
          <div className="color-picker">
            {colors.map((color) => (
              <span
                key={color}
                className={`color-swatch ${color === selectedColor ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>
        <div className="popup-buttons">
          <button className="popup-close" onClick={onClose}>Close</button>
          <button className="popup-create" onClick={handleCreate}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupPopup;
