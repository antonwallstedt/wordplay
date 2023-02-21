import React, { useState } from "react";
import NavBarContainer from "./containers/NavBarContainer";
import UserTracks from "./presentational/UserTracks";

function App() {
  const defaultTrack = { ref: React.createRef(null), id: Date.now() };
  const [allTracks, setAllTracks] = useState([defaultTrack]);
  const handleAdd = (event) => {
    event.preventDefault();
    const newTrack = {
      ref: React.createRef(null),
      id: Date.now(),
    };
    setAllTracks((prev) => [...prev, newTrack]);
  };

  const handleDelete = (trackId) => {
    setAllTracks((prev) => prev.filter((track) => track.id !== trackId));
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
