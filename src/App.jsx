import { useState } from "react";
import * as Tone from "tone";
import "./App.css";
import Track from "./components/Track";
import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

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
    Tone.Transport.stop();
    Tone.Transport.cancel();
    Tone.Transport.clear();

    setIsPlayingAll(false);
  };

  Tone.Transport.bpm.value = 90;
  const handleBpmChange = ({ target }) => {
    Tone.Transport.bpm.value = target.value;
  };

  const handleDelete = (trackId) => {
    console.log(tracks);
    setTracks((prev) => prev.filter((track) => track.id !== trackId));
  };

  const [tracks, setTracks] = useState(defaultTracks);
  const handleAdd = () => {
    setTracks([...tracks, { key: tracks.length, id: Date.now(), text: "" }]);
  };

  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const handleHamburgerClick = () => {
    setHamburgerOpen(!hamburgerOpen);
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
        <p style={bpmStyle}>BPM</p>
        <input
          style={bpmInputStyle}
          placeholder="90"
          onChange={handleBpmChange}
        />
        <IconButton
          aria-label="hamburger-btn"
          icon={<HamburgerIcon />}
          float="right"
          height="30px"
          pl="5px"
          pr="5px"
          onClick={handleHamburgerClick}
          transition="all 1s"
        />
      </div>
      <div className="content-container" style={contentContainerStyle}>
        {tracks.map((track) => (
          <Track
            key={track.key}
            id={track.id}
            onDelete={handleDelete}
            isPlayingAll={isPlayingAll}
            inputText={track.text}
          />
        ))}
        <button
          className="add-track-btn"
          style={addBtnStyle}
          onClick={handleAdd}
        >
          Add Track
        </button>
      </div>
      {hamburgerOpen && (
        <div className="sidebar-container" style={sidebarStyle}>
          Hello
        </div>
      )}
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

const bpmStyle = {
  marginLeft: 5,
  marginRight: 5,
};

const bpmInputStyle = {
  marginLeft: 5,
  marginRight: 5,
  width: 50,
};

const sidebarStyle = {
  float: "right",
  height: "100%",
  width: 300,
  backgroundColor: "rgb(30,30,30)",
  marginRight: 0,
};

const contentContainerStyle = {
  marginLeft: 100,
  marginRight: 100,
  height: "100%",
};

export default App;
