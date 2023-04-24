import { useEffect, useState } from "react";
import PseudoLexer from "../lib/PseudoLexer";
import ScaleGenerator from "../lib/ScaleGenerator";
import WordSynth from "../lib/WordSynth";
import { synths } from "../utils/Synths";
import * as Tone from "tone";
import Track from "../presentational/Track";

const TrackContainer = ({
  id,
  onDelete,
  isPlayingAll,
  inputText,
  inputOctave,
  inputSynth,
  scale,
  octave,
}) => {
  const lexer = new PseudoLexer();
  const [text, setText] = useState(inputText);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [part, setPart] = useState(null);

  const [currentOctave, setCurrentOctave] = useState(() => {
    if (inputOctave) return inputOctave;
    else return octave;
  });

  const [notes, setNotes] = useState(() => {
    if (inputText) return lexer.interpret(inputText, scale, currentOctave);
    else return [];
  });

  const [synth, setSynth] = useState(() => {
    // If a synth is pre-supplied use that, otherwise
    // resort to default "Synth"
    if (inputSynth) return inputSynth;
    else return "Synth";
  });

  useEffect(() => {
    if (isPlayingAll && !isPlaying) {
      setIsPlaying(true);
      // TODO: Handle play
      handlePlay();
    } else {
      // TODO: Handle stop
      handleStop();
    }
  }, [isPlayingAll]);

  // Update notes if the scale changes from the sidebar
  useEffect(() => {
    if (text) {
      setNotes(lexer.interpret(text, scale, currentOctave));
      if (isPlaying) {
        let newNotes = lexer.interpret(text, scale, currentOctave);
        for (var noteObj of newNotes) {
          part.at(noteObj.time).value.note = noteObj.note;
        }
      }
    }
  }, [scale]);

  // TODO: allow highlight of individual characters
  // TODO: fix issue when you only have one word
  const highlightWord = (word, index) => {
    return (
      <span
        key={index}
        className={
          "m-1.5 items-center justify-center rounded-md px-1 text-center font-jetbrains text-xl font-semibold drop-shadow-md " +
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
    if (isPlaying) {
      // TODO: Update notes on change
      // TODO:  - adding more words
      // TODO:    > to the end
      // TODO:    > to the start
      // TODO:    > somewhere in the middle
      // TODO:  - changing an existing word
    }
    setNotes(lexer.interpret(target.value, scale, currentOctave));
  };

  const handleSynthSelect = ({ target }) => {
    setSynth(synths.find((synth) => synth.name === target.value).name);
  };

  const handleOctaveChange = ({ target }) => {
    setCurrentOctave(target.value);
    setNotes(lexer.interpret(text, scale, target.value));
  };

  const handleStop = () => {
    if (part) {
      part.stop();
      part.clear();
      part.dispose();
    }
    setIsPlaying(false);
    setCurrentWordIndex(-1);
  };

  // TODO: Sometimes when you start the track it doesn't start on the first measure
  const handlePlay = () => {
    if (isPlaying) return;
    Tone.start();
    const currentSynth = synths
      .find((s) => s.name === synth)
      .synth.toDestination();

    const part = new Tone.Part((time, value) => {
      currentSynth.triggerAttackRelease(
        value.note,
        value.duration,
        time,
        value.velocity
      );

      Tone.Draw.schedule(() => {
        setCurrentWordIndex((currentIndex) => {
          return (currentIndex + 1) % notes.length;
        }, time);
      });
    }, notes);
    part.loop = true;
    part.start("0m", 0);
    Tone.Transport.start();
    setIsPlaying(true);
    setPart(part);
  };

  return (
    <Track
      displayText={text}
      highlightWord={highlightWord}
      handleChange={handleChange}
      handleDelete={handleDelete}
      handleSynthSelect={handleSynthSelect}
      synth={synth}
      currentOctave={currentOctave}
      handleOctaveChange={handleOctaveChange}
      handlePlay={handlePlay}
      handleStop={handleStop}
    />
  );
};

export default TrackContainer;
