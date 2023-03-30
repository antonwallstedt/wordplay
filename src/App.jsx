import { useState } from "react";
import * as Tone from "tone";
import "./App.css";
import Track from "./components/Track";

function App() {
  const defaultTracks = [
    { key: 0, id: 0, text: "Hello my name is Anton" },
    {
      key: 1,
      id: 1,
      text: "These are temporary placeholders h a h a",
    },
  ];

  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const handlePlayAll = () => {
    setIsPlayingAll(true);
  };

  const handleStopAll = () => {
    Tone.Transport.cancel();
    setIsPlayingAll(false);
  };

  const handleDelete = (trackId) => {
    console.log(tracks);
    setTracks((prev) => prev.filter((track) => track.id !== trackId));
  };

  const [tracks, setTracks] = useState(defaultTracks);
  const handleAdd = () => {
    setTracks([...tracks, { key: tracks.length, id: Date.now(), text: "" }]);
  };

  return (
    <>
      <div className="navbar" style={navbarStyle}>
        <button
          className="play-all-btn"
          style={btnStyle}
          onClick={handlePlayAll}
        >
          Play All
        </button>
        <button
          className="stop-all-btn"
          style={btnStyle}
          onClick={handleStopAll}
        >
          Stop All
        </button>
      </div>
      {tracks.map((track) => (
        <Track
          key={track.key}
          id={track.id}
          onDelete={handleDelete}
          isPlayingAll={isPlayingAll}
          inputText={track.text}
        />
      ))}
      <button className="add-track-btn" style={addBtnStyle} onClick={handleAdd}>
        Add Track
      </button>
    </>
  );
}

// * Styling
const addBtnStyle = {
  marginTop: 10,
};

const navbarStyle = {
  backgroundColor: "rgb(30,30,30)",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "5%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: 10,
  paddingBottom: 10,
};

const btnStyle = {
  marginLeft: 5,
  marginRight: 5,
};

export default App;
