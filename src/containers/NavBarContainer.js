import { useState } from "react";
import * as WordSynth from "../utils/WordSynth";
import * as Tone from "tone";

function NavBarContainer() {
  /* Constants */
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  var userInput = [];

  /* Hooks */
  const handlePlay = () => {};
  const handleStop = () => {};

  const [scale, setScale] = useState(null);
  const handleScaleSelect = ({ target }) => {};

  const [bpm, setBpm] = useState(120);
  const handleBpmChange = ({ target }) => {};

  const playInput = (userInput) => {
    let noteSequences = WordSynth.parseInput(userInput);
    const synth = new Tone.Synth();
    const freeverb = new Tone.Freeverb(0.2).toDestination();
    for (const i in noteSequences) {
      const seq = new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, 0.3, time).connect(freeverb);
      }, noteSequences[i]);

      // Start consecutive tracks i whole notes after previous track
      seq.start(i == 0 ? 0 : `${i}n`);
    }
    Tone.Transport.start();
  };

  // TODO: Return NavBar presentational component passing props as needed.
  return;
}

export default NavBarContainer;
