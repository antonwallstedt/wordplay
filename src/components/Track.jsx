import { useEffect, useState } from "react";
import { defaultScale } from "../utils/Scales";
import WordSynth from "../utils/WordSynth";
import * as Tone from "tone";
import "../App.css";
import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

function Track({ id, onDelete, isPlayingAll, inputText }) {
  // TODO: Allow instrument selection in individual tracks
  // TODO: Allow users to set BPM
  // TODO: Fix buggy play all functionality
  // TODO: Handle edge cases
  // TODO:  - Double spaces in input
  // TODO:  - Invalid characters
  // TODO:  - Press play all when tracks are playing

  // * Constants
  let sequence; // TODO: Don't init to empty sequence...
  const wordSynth = new WordSynth();

  // Words in paragraph are 0-indexed, so start from -1 so when next
  // iteration starts it will be at 0
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [sequence, setSequence] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState("Synth");
  const [rootnote, setRootnote] = useState("C");
  const [scale, setScale] = useState("Major");
  const [text, setText] = useState(inputText);

  // * Event Handlers
  const handleChange = ({ target }) => {
    setText(target.value);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleSynthSelect = ({ target }) => {
    setSynth(synths.find((synth) => synth.name === target.value).name);
  };

  useEffect(() => {
    // Only play this track if it isn't currently playing
    if (isPlayingAll && !isPlaying) {
      setIsPlaying(true);
      handlePlay(text);
    } else {
      setIsPlaying(false);
      setCurrentWordIndex(0);
    }
  }, [isPlayingAll]);

  const handlePlay = (input) => {
    Tone.Transport.bpm.value = 90;
    const inputSequence = wordSynth.parseInput(input, defaultScale);
    const notes = inputSequence.map((obj) => obj.note);
    const lenArr = inputSequence.map((obj) => obj.len);
    let lenIndex = 0;

    const currentSynth = synths.find((s) => s.name === synth).synth;
    const freeverb = new Tone.Freeverb(0.3).toDestination();
    const release = lenArr[lenIndex] * 0.05;
    const velocity = lenArr[lenIndex] * 0.05;
    const seq = new Tone.Sequence((time, note) => {
      currentSynth
        .triggerAttackRelease(
          note,
          release, // Release depends on length of word
          time,
          velocity // Velocity also depends on length of word
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
    seq.humanize = true;
    seq.start(0);
    setIsPlaying(true);
    setSequence(seq);
    Tone.Transport.start();
  };

  const handleStop = () => {
    console.log(sequence);
    setIsPlaying(false);
    setCurrentWordIndex(-1);
    if (sequence) {
      sequence.stop();
      sequence.clear();
      sequence.dispose();
    }
    console.log(Tone.Transport.get());
    // Tone.Transport.cancel();
  };

  // * Functions
  const highlightWord = (word, index) => {
    return (
      <span
        key={index}
        style={spanStyle}
        className={isPlaying && index === currentWordIndex ? "highlighted" : ""}
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
        width: "100%",
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
          placeholder={inputText}
        />
        <div className="media-container">
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
          <select
            style={selectStyle}
            onChange={(e) => handleSynthSelect(e)}
            defaultValue={synth}
          >
            {synths.map(({ name, synth }, index) => (
              <option value={name} key={index}>
                {name}
              </option>
            ))}
          </select>
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

// * Styling
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
  paddingLeft: "5px",
  paddingRight: "5px",
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

const selectStyle = {
  float: "left",
  height: 40,
  width: 125,
  marginLeft: 10,
  marginTop: 10,
  borderRadius: 10,
  border: "none",
  backgroundColor: "rgb(25,25,25)",
  textIndent: "10px",
};

export default Track;
