import React, { useState } from "react";
import NavBarContainer from "./containers/NavBarContainer";
import UserTracks from "./presentational/UserTracks";

function App() {
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
      <NavBar />
      <Tracks />
      <button className="add-btn" onClick={handleAdd}>
        +
      </button>
    </main>
  );
}

export default App;
