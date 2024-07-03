import React, { useState } from 'react';

const NotesGroup = ({ group, groupIndex, addMessage, setShowSidebar }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        timestamp: new Date().toLocaleString(),
      };
      addMessage(groupIndex, newMessage);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`notes-group show-notes`}>
      <div className="group-header">
        <span className="back-button" onClick={() => setShowSidebar(true)}>🔙</span>
        <span
          style={{ backgroundColor: group.color }}
          className="group-icon"
        >
          {group.name.substring(0, 2).toUpperCase()}
        </span>
        <span className="group-header-name">{group.name}</span>
      </div>
      <div className="messages">
        {group.messages.map((msg, index) => (
          <div key={index} className="message">
            <span className="timestamp">{msg.timestamp}</span>
            <p className="message-text">{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="message-input-container">
        <div className="message-input">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your text here..."
            onKeyPress={handleKeyPress}
            rows="3"
            className="message-textarea"
          />
          <button onClick={handleSend} className="send-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-send"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesGroup;
