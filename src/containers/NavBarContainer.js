import { useState } from "react";
import WordSynth from "../utils/WordSynth";
import { defaultScale } from "../utils/Scales";
import NavBar from "../presentational/NavBar";
import * as Tone from "tone";

function NavBarContainer({ userTracks }) {
  var userInput = [];
  var sequences = [];
  const wordSynth = new WordSynth();

  /**
   * Sets BPM and plays back user input
   */
  const handlePlay = () => {
    Tone.Transport.bpm.value = bpm;
    userInput = [];
    for (const track of userTracks) {
      userInput.push(track.ref.current.value);
    }
    playInput(userInput);
  };

  /**
   * Disposes sequence(s) of user input.
   */
  const handleStop = () => {
    for (const sequence of sequences) {
      sequence.dispose();
    }
    sequences = [];
  };

  // TODO: Check how default init works...
  const [scale, setScale] = useState(defaultScale);
  /**
   * Changes the scale used in `getNote`.
   * @param {*} target the option the user has selected
   */
  const handleScaleSelect = ({ target }) => {
    // When the scale is passed as a value-prop from the select option
    // it doesn't return the array, instead a single line of all the notes
    // separated by commas.
    setScale(target.value.split(","));
  };

  const [bpm, setBpm] = useState(120);
  /**
   * Changes the bpm of `Tone.Transport`
   * @param {*} target the target input field for setting BPM
   */
  const handleBpmChange = ({ target }) => {
    setBpm(target.value);
  };

  const playInput = (userInput) => {
    let noteSequences = wordSynth.parseInput(userInput, scale);
    const synth = new Tone.Synth();
    const freeverb = new Tone.Freeverb(0.2).toDestination();
    for (const i in noteSequences) {
      const seq = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, 0.3, time).connect(freeverb);
      }, noteSequences[i]);
      sequences.push(seq);

      // Start consecutive tracks i whole notes after previous track
      seq.start(i == 0 ? 0 : `${i}n`);
    }
    Tone.Transport.start();
  };

  // TODO: Return NavBar presentational component passing props as needed.
  return (
    <NavBar
      handlePlay={handlePlay}
      handleStop={handleStop}
      handleBpmChange={handleBpmChange}
      handleScaleSelect={handleScaleSelect}
    />
  );
}

export default NavBarContainer;
