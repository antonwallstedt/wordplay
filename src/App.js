import React, { useState } from "react";
import NavBarContainer from "./containers/NavBarContainer";
import UserTracks from "./presentational/UserTracks";

/**
 * Main App file for rendering all the components.
 * @returns all JSX components.
 */
function App() {
  const addBtnStyle = {
    position: "relative",
    left: "50%",
  };

  const defaultTrack = { ref: React.createRef(null), id: Date.now() };
  const [userTracks, setUserTracks] = useState([defaultTrack]);
  const handleAdd = (event) => {
    event.preventDefault();
    const newTrack = {
      ref: React.createRef(null),
      id: Date.now(),
    };
    setUserTracks((prev) => [...prev, newTrack]);
  };

  const handleDelete = (trackId) => {
    setUserTracks((prev) => prev.filter((track) => track.id !== trackId));
  };

  return (
    <main>
      <NavBarContainer userTracks={userTracks} />
      <UserTracks userTracks={userTracks} handleDelete={handleDelete} />
      <button className="add-btn" onClick={handleAdd} style={addBtnStyle}>
        Add
      </button>
    </main>
  );
}

export default App;
