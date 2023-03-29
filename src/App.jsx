import { useState } from "react";
import { defaultScale } from "./utils/Scales";
import WordSynth from "./utils/WordSynth";
import * as Tone from "tone";
import "./App.css";

function Track() {
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
  };

  const spanStyle = {
    fontFamily: "Courier",
    fontSize: "30px",
    marginRight: "5px",
    marginLeft: "5px",
    borderRadius: "5px",
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

  const handlePlay = (input) => {
    Tone.Transport.bpm.value = 90; // TODO: Allow setting this yourself
    let noteSequence = wordSynth.parseInput(input, defaultScale);
    const synth = new Tone.Synth();
    const freeverb = new Tone.Freeverb(0.2).toDestination();
    sequence = new Tone.Sequence((time, note) => {
      synth.triggerAttackRelease(note, 0.3, time).connect(freeverb);
      Tone.Draw.schedule(() => {
        setCurrentWordIndex((currentIndex) => {
          let nextIndex = (currentIndex + 1) % noteSequence.length;
          return nextIndex;
        });
      }, time);
    }, noteSequence);
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
          style={{ marginTop: 10, marginRight: 5 }}
          onClick={() => handlePlay(text)}
        >
          Play
        </button>
        <button
          className="btn-stop"
          style={{ marginTop: 10, marginLeft: 5 }}
          onClick={handleStop}
        >
          Stop
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <Track />
    </div>
  );
}

export default App;
