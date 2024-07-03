import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import NotesGroup from './components/NotesGroup';
import './styles.css';
import useWindowSize from './hooks/useWindowSize'; // Ensure you have this custom hook if you're using it

function App() {
  const [groups, setGroups] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const size = useWindowSize();

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroups(savedGroups);
  }, []);

  const createGroup = (newGroup) => {
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
  };

  const addMessageToGroup = (groupIndex, message) => {
    const updatedGroups = groups.map((group, index) =>
      index === groupIndex ? { ...group, messages: [...group.messages, message] } : group
    );
    setGroups(updatedGroups);
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
  };

  const handleGroupSelect = () => {
    if (size.width <= 767) {
      setShowSidebar(false);
    }
  };

  const handleBackToSidebar = () => {
    if (size.width <= 767) {
      setShowSidebar(true);
    }
  };

  return (
    <Router>
      <div className="app">
        {showSidebar && (
          <Sidebar
            groups={groups}
            createGroup={createGroup}
            onGroupSelect={handleGroupSelect}
          />
        )}
        <Routes>
          {size.width > 767 && (
            <Route path="/" element={<HomePage />} />
          )}
          {groups.map((group, index) => (
            <Route
              key={index}
              path={`/group/${index}`}
              element={
                <NotesGroup
                  group={group}
                  groupIndex={index}
                  addMessage={addMessageToGroup}
                  setShowSidebar={handleBackToSidebar}
                />
              }
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
