import { useState } from "react";
import { defaultScale } from "./utils/Scales";
import WordSynth from "./utils/WordSynth";
import * as Tone from "tone";
import "./App.css";
import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

function Track({ id, onDelete }) {
  // * Constants
  let sequence;
  const wordSynth = new WordSynth();
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [instrument, setInstrument] = useState(null); // TODO: Set init to an instrument

  // * Styles
  const inputStyle = {
    width: "100%",
    height: "100%",
    transition: "all 1s",
    borderRadius: "10px",
    fontSize: "20px",
    backgroundColor: "rgb(40,40,40)",
    border: "2px solid rgb(35,35,35)",
    marginTop: "10px",
  };

  const divStyle = {
    backgroundColor: "rgb(30,30,30)",
    padding: "40px",
    borderRadius: "20px",
    transition: "all 1s",
    marginTop: 20,
    width: "100%",
  };

  const spanStyle = {
    fontFamily: "Courier",
    fontSize: "30px",
    marginRight: "5px",
    marginLeft: "5px",
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const paragraphContainerStyle = {
    borderRadius: "5px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  };

  // * Event Handlers
  const [text, setText] = useState("");
  const handleChange = ({ target }) => {
    setText(target.value);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handlePlay = (input) => {
    Tone.Transport.bpm.value = 90; // TODO: Allow setting this yourself
    const inputSequence = wordSynth.parseInput(input, defaultScale);
    const notes = inputSequence.map((obj) => obj.note);
    const lenArr = inputSequence.map((obj) => obj.len);
    let lenIndex = 0;

    const synth = new Tone.Synth();
    const freeverb = new Tone.Freeverb(0.2).toDestination();
    sequence = new Tone.Sequence((time, note) => {
      synth
        .triggerAttackRelease(
          note,
          lenArr[lenIndex] * 0.05, // Release depends on length of word
          time,
          lenArr[lenIndex] * 0.1 // Velocity also depends on length of word
        )
        .connect(freeverb);
      Tone.Draw.schedule(() => {
        lenIndex = (lenIndex + 1) % lenArr.length;
        setCurrentWordIndex((currentIndex) => {
          let nextIndex = (currentIndex + 1) % notes.length;
          return nextIndex;
        });
      }, time);
    }, notes);
    sequence.start(0);
    Tone.Transport.start();
  };

  const handleStop = () => {
    setCurrentWordIndex(-1);
    Tone.Transport.cancel();
  };

  // * Functions
  const highlightWord = (word, index) => {
    return (
      <span
        key={index}
        style={spanStyle}
        className={index === currentWordIndex ? "highlighted" : ""}
      >
        {word}
      </span>
    );
  };

  // * HTML
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: 600,
      }}
    >
      <div className="track-container" style={divStyle}>
        <div className="paragraph-container" style={paragraphContainerStyle}>
          {text.split(" ").map((word, index) => highlightWord(word, index))}
        </div>
        <input
          className="track-input"
          onChange={handleChange}
          style={inputStyle}
          maxLength={64}
        />
        <div className="media-btn-container">
          <button
            className="btn-play"
            style={{ marginTop: 10, marginRight: 5, float: "left" }}
            onClick={() => handlePlay(text)}
          >
            Play
          </button>
          <button
            className="btn-stop"
            style={{ marginTop: 10, marginLeft: 5, float: "left" }}
            onClick={handleStop}
          >
            Stop
          </button>
          <IconButton
            aria-label="delete-btn"
            icon={<DeleteIcon />}
            mt={10}
            pl={5}
            pr={5}
            float="right"
            height="35px"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

function App() {
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
  };

  const btnStyle = {
    marginLeft: 5,
    marginRight: 5,
  };

  const handleDelete = (trackId) => {
    console.log(tracks);
    setTracks((prev) => prev.filter((track) => track.id !== trackId));
  };

  const defaultTrack = { key: 0, id: Date.now() };
  const [tracks, setTracks] = useState([defaultTrack]);
  const handleAdd = () => {
    setTracks([...tracks, { key: tracks.length, id: Date.now() }]);
  };

  return (
    <>
      <div className="navbar" style={navbarStyle}>
        <button className="play-all-btn" style={btnStyle}>
          Play All
        </button>
        <button className="stop-all-btn" style={btnStyle}>
          Stop All
        </button>
      </div>
      {tracks.map((track) => (
        <Track key={track.key} id={track.id} onDelete={handleDelete} />
      ))}
      <button className="add-track-btn" style={addBtnStyle} onClick={handleAdd}>
        Add Track
      </button>
    </>
  );
}

export default App;
