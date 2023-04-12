import React, { useEffect, useState } from "react";
import ButtonSecondary from "../components/ButtonSecondary";
import { AiOutlineDelete } from "react-icons/ai";
import { GiHamburger, GiHamburgerMenu } from "react-icons/gi";
import WordSynth from "../lib/WordSynth";
import { synths } from "../utils/Synths";
import * as Tone from "tone";

const Track = ({ id, onDelete, isPlayingAll, inputText, scale }) => {
  const wordSynth = new WordSynth();
  const [text, setText] = useState(inputText);
  const [rhythm, setRhythm] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [sequence, setSequence] = useState(null);
  const [synth, setSynth] = useState("Synth");
  const [hamburgerMenu, setHamburgerMenu] = useState(true);

  useEffect(() => {
    // Only play this track if it's not already playing.
    if (isPlayingAll && !isPlaying) {
      setIsPlaying(true);
      handlePlay(text);
    } else {
      handleStop();
    }
  }, [isPlayingAll]);

  // TODO: allow highlight of individual characters.
  const highlightWord = (word, index) => {
    return (
      <span
        key={index}
        className={
          "m-1.5 items-center justify-center rounded-md px-1 text-center font-jetbrains text-2xl font-semibold drop-shadow-md " +
          (isPlaying && index === currentWordIndex ? "bg-green-900" : "")
        }
      >
        {word}
      </span>
    );
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleChange = ({ target }) => {
    setText(target.value);
  };

  const handleHamburgerMenu = () => {
    setHamburgerMenu(!hamburgerMenu);
  };

  const handleSynthSelect = ({ target }) => {
    setSynth(synths.find((synth) => synth.name === target.value).name);
  };

  const handleRhythmInput = ({ target }) => {
    // TODO: Run Parser.jsx to validate input
    // TODO: Connect to handlePlay
    setRhythm(target.value);
  };

  const handlePlay = (input) => {
    const inputSequence = wordSynth.parseInput(input, scale);
    const notes = inputSequence.map((obj, index) => ({
      time: index * 0.5, // TODO: Use value from input if given, otherwise subdivide based on input length?
      note: obj.note,
    }));
    const lens = inputSequence.map((obj) => obj.len);
    let lenIndex = 0;

    // Get the synth from the select-menu by matching its name with
    // the useState 'synth' value.
    const testSynth = new Tone.Synth().toDestination();
    const currentSynth = synths.find((s) => s.name === synth).synth;
    const freeverb = new Tone.Freeverb(0.3).toDestination();
    const release = lens[lenIndex] * 0.05; // TODO: Figure out a better calculation.
    const velocity = lens[lenIndex] * 0.05;
    const part = new Tone.Part((time, value) => {
      testSynth.triggerAttackRelease(value.note, "8n", time);
      Tone.Draw.schedule(() => {
        lenIndex = (lenIndex + 1) % lens.length;
        setCurrentWordIndex((currentIndex) => {
          let nextIndex = (currentIndex + 1) % notes.length;
          return nextIndex;
        }, time);
      });
    }, notes);
    part.loop = true; // TODO: Fix stopping now that we're using Part instead...
    part.start(0);
    // const seq = new Tone.Sequence((time, note) => {
    //   currentSynth
    //     .triggerAttackRelease(
    //       note,
    //       release, // Release depends on length of word (see TODO above).
    //       time,
    //       velocity // Velocity also depends on length of word (see TODO above).
    //     )
    //     .connect(freeverb);
    //   Tone.Draw.schedule(() => {
    //     lenIndex = (lenIndex + 1) % lens.length;
    //     setCurrentWordIndex((currentIndex) => {
    //       let nextIndex = (currentIndex + 1) % notes.length;
    //       return nextIndex;
    //     });
    //   }, time);
    // }, notes);
    // seq.start(0);
    // setSequence(seq);
    setIsPlaying(true);
    Tone.Transport.start();
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentWordIndex(-1);
    if (sequence) {
      sequence.stop();
      sequence.clear();
      sequence.dispose();
    }
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <div
        className={
          "relative mb-10 mr-2 w-[300px] rounded-lg bg-stone-400 p-5 drop-shadow-lg transition-transform duration-500 ease-in-out " +
          (!hamburgerMenu && "translate-x-[100%]")
        }
      >
        <div className="flex flex-col">
          <h3 className="text-md font-semibold">Rhythm</h3>
          <input
            className="w-30 mb-2 rounded-md indent-2 font-jetbrains"
            onChange={handleRhythmInput}
          />
        </div>
      </div>
      <div
        className={
          "mb-10 flex max-w-2xl flex-col items-center justify-between rounded-3xl bg-gradient-to-b from-stone-400 to-stone-500 px-10 py-5 drop-shadow-lg transition-transform duration-500 ease-in-out " +
          (hamburgerMenu ? "" : "-translate-x-[150px]")
        }
      >
        <div className="flex items-center justify-center">
          {text.split(" ").map((word, index) => highlightWord(word, index))}
        </div>
        <input
          className="mt-5 w-full rounded-md p-1 indent-2 drop-shadow-md"
          maxLength="48"
          placeholder={text}
          onChange={handleChange}
        />
        <div className="float-left mt-5 flex gap-4">
          <ButtonSecondary
            icon={
              <GiHamburgerMenu
                className={
                  "transition-duration-600 transition-transform ease-in-out " +
                  (hamburgerMenu && "rotate-90")
                }
                size="20px"
              />
            }
            handleClick={handleHamburgerMenu}
          />
          <ButtonSecondary text="Play" handleClick={() => handlePlay(text)} />
          <ButtonSecondary text="Stop" handleClick={handleStop} />
          <ButtonSecondary
            edit="float-right"
            icon={<AiOutlineDelete size="20px" />}
            handleClick={handleDelete}
          />
          <select
            className="rounded-md"
            onChange={handleSynthSelect}
            defaultValue={synth}
          >
            {synths.map(({ name, synth }, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Track;
