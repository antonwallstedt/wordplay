import React, { useEffect, useState } from "react";
import ButtonSecondary from "../components/ButtonSecondary";
import { AiOutlineDelete } from "react-icons/ai";
import WordSynth from "../lib/WordSynth";
import ScaleGenerator from "../lib/ScaleGenerator";
import PseudoLexer from "../lib/PseudoLexer";
import { synths } from "../utils/Synths";
import * as Tone from "tone";

const Track = ({
  id,
  onDelete,
  isPlayingAll,
  inputText,
  inputOctave,
  inputRhythm,
  inputSynth,
  scale,
  octave,
}) => {
  const lexer = new PseudoLexer();
  const wordSynth = new WordSynth();
  const scaleGenerator = new ScaleGenerator();
  const [text, setText] = useState(inputText);
  const [parsedInput, setParsedInput] = useState(() => {
    if (inputText) return lexer.interpret(inputText, scale);
    else return [];
  });
  const [notes, setNotes] = useState(() => {
    if (inputText) return wordSynth.parseInput(text, scale);
    else return [];
  });
  const [currentOctave, setCurrentOctave] = useState(() => {
    // Keep track of this track's individual octave
    if (inputOctave) return inputOctave;
    else return octave;
  });
  const [rhythm, setRhythm] = useState(inputRhythm);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [sequence, setSequence] = useState(null);
  const [noteSequence, setNoteSequence] = useState(null);
  const [synth, setSynth] = useState(() => {
    if (inputSynth) return inputSynth;
    else return "Synth";
  });

  useEffect(() => {
    // Only play this track if it's not already playing.
    if (isPlayingAll && !isPlaying) {
      setIsPlaying(true);
      handlePlay();
    } else {
      handleStop();
    }
  }, [isPlayingAll]);

  // Update notes if the scale is changed from the sidebar.
  useEffect(() => {
    if (text) {
      if (currentOctave === octave) {
        setNotes(wordSynth.parseInput(text, scale));
      } else {
        setNotes(
          scaleGenerator.setOctave(
            wordSynth.parseInput(text, scale),
            currentOctave
          )
        );
      }
    }
  }, [scale]);

  // Update the notes if the notes are changed in the sidebar.
  // E.g. if the user presses the "Surprise me!" button.
  useEffect(() => {
    setNoteSequence(() => {
      if (rhythm) {
        return notes.map((obj, index) => ({
          time: index * Number(rhythm), // TODO: Use value from input if given, otherwise subdivide based on input length?
          note: obj.note,
        }));
      } else {
        return notes.map((obj) => obj.note);
      }
    });
  }, [notes, rhythm]);

  // TODO: allow highlight of individual characters.
  // TODO: Fix issue when you only have one word.
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
    setParsedInput(lexer.interpret(target.value, scale));
    if (target.value) {
      if (currentOctave === octave) {
        setNotes(wordSynth.parseInput(target.value, scale));
      } else {
        setNotes(
          scaleGenerator.setOctave(
            wordSynth.parseInput(target.value, scale),
            currentOctave
          )
        );
      }
    }
  };

  const handleSynthSelect = ({ target }) => {
    setSynth(synths.find((synth) => synth.name === target.value).name);
  };

  const handleRhythmInput = ({ target }) => {
    // TODO: Run Parser.jsx to validate input
    setRhythm(target.value);
  };

  const handleOctaveChange = ({ target }) => {
    setCurrentOctave(target.value);
    setNotes(
      scaleGenerator.setOctave(wordSynth.parseInput(text, scale), target.value)
    );
  };

  // TODO: Move this into WordSynth.jsx
  const handlePlay = () => {
    Tone.start();
    const currentSynth = synths
      .find((s) => s.name === synth)
      .synth.toDestination();
    let test = parsedInput.map((obj) => [obj.note, obj.time]);
    const part = new Tone.Part(
      (time, value) => {
        currentSynth.triggerAttackRelease(value.note, "8n", time);
        Tone.Draw.schedule(() => {
          setCurrentWordIndex((currentIndex) => {
            let nextIndex = (currentIndex + 1) % parsedInput.length;
            return nextIndex;
          }, time);
        });
      },
      parsedInput.map((obj) => ({ time: obj.time, note: obj.note }))
    );
    setSequence(part);
    part.loop = true;
    part.start("0m");
    setIsPlaying(true);
    Tone.Transport.start();
    // Tone.start();
    // const currentSynth = synths
    //   .find((s) => s.name === synth)
    //   .synth.toDestination();
    // const lens = notes.map((obj) => obj.len);
    // let lenIndex = 0;
    // if (rhythm) {
    //   // Get the synth from the select-menu by matching its name with
    //   // the useState 'synth' value.
    //   const part = new Tone.Part((time, value) => {
    //     currentSynth.triggerAttackRelease(value.note, "8n", time);
    //     // TODO: Create new function for this.
    //     Tone.Draw.schedule(() => {
    //       lenIndex = (lenIndex + 1) % lens.length;
    //       setCurrentWordIndex((currentIndex) => {
    //         let nextIndex = (currentIndex + 1) % notes.length;
    //         return nextIndex;
    //       }, time);
    //     });
    //   }, noteSequence);
    //   setSequence(part);
    //   part.loop = true; // TODO: Fix stopping now that we're using Part instead...
    //   part.start("0m");
    //   Tone.Transport.start();
    //   setIsPlaying(true);
    // } else {
    //   const seq = new Tone.Sequence((time, note) => {
    //     currentSynth.triggerAttackRelease(note, "8n", time);
    //     Tone.Draw.schedule(() => {
    //       lenIndex = (lenIndex + 1) % lens.length;
    //       setCurrentWordIndex((currentIndex) => {
    //         let nextIndex = (currentIndex + 1) % notes.length;
    //         return nextIndex;
    //       });
    //     }, time);
    //   }, noteSequence);
    //   seq.start(0);
    //   setSequence(seq);
    //   Tone.Transport.start();
    //   setIsPlaying(true);
    // }
  };

  const handleStop = () => {
    if (sequence) {
      sequence.stop();
      sequence.clear();
      sequence.dispose();
    }
    setIsPlaying(false);
    setCurrentWordIndex(-1);
  };

  return (
    <div className="flex w-full items-center justify-center pb-10 text-center">
      <div className="flex w-full flex-col items-center justify-between rounded-3xl bg-gradient-to-b from-stone-400 to-stone-500 px-10 py-5 drop-shadow-lg">
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
          <ButtonSecondary text="Play" handleClick={() => handlePlay(text)} />
          <ButtonSecondary text="Stop" handleClick={handleStop} />
          <ButtonSecondary
            edit="float-right"
            icon={<AiOutlineDelete size="20px" />}
            handleClick={handleDelete}
          />
          <select
            className="rounded-md indent-1"
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
      <div className="my-10 mb-10 ml-5 h-full w-auto rounded-3xl bg-stone-400 p-5 drop-shadow-lg">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <h3 className="text-md font-semibold">Rhythm</h3>
            <input
              className="mb-2 ml-2 w-24 rounded-md indent-2 font-jetbrains"
              defaultValue={inputRhythm}
              onChange={handleRhythmInput}
            />
          </div>
          <div className="flex flex-row">
            <h3 className="text-md font-semibold drop-shadow-sm">Octave</h3>
            <select
              className="ml-3 mt-[3px] h-5 w-10 rounded-md bg-stone-50 indent-1"
              defaultValue={currentOctave}
              onChange={handleOctaveChange}
            >
              {[2, 3, 4, 5, 6].map((octave, index) => (
                <option key={index} value={octave}>
                  {octave}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
