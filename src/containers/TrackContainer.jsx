import { useEffect, useState } from "react";
import PseudoLexer from "../lib/PseudoLexer";
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
  inputSpeed,
  scale,
  octave,
}) => {
  const lexer = new PseudoLexer();
  const [text, setText] = useState(inputText);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [part, setPart] = useState(null);

  const [speed, setSpeed] = useState(() => {
    if (inputSpeed) return inputSpeed;
    else return 1;
  });

  const [currentOctave, setCurrentOctave] = useState(() => {
    if (inputOctave) return inputOctave;
    else return octave;
  });

  const [notes, setNotes] = useState(() => {
    if (inputText) return lexer.interpret(inputText, scale, currentOctave);
    else return [];
  });

  // When changing the speed, we don't want to modify
  // our original array of notes, since it applies a scalar
  // it will not be in relation to the "original notes"
  // so we keep a separate state as reference that never changes.
  const [referenceNotes, setReferenceNotes] = useState(notes);

  // TODO: Total length doesn't seem to work for highlighting
  const [totalLength, setTotalLength] = useState(notes.length);

  const [synth, setSynth] = useState(() => {
    // If a synth is pre-supplied use that, otherwise
    // resort to default "Synth"
    if (inputSynth) return inputSynth;
    else return "Synth";
  });

  useEffect(() => {
    if (isPlayingAll && !isPlaying) {
      setIsPlaying(true);
      handlePlay();
    } else {
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
          "items-center justify-center rounded-md px-1 text-center font-jetbrains text-xl font-semibold drop-shadow-md " +
          (isPlaying && index === currentWordIndex ? "bg-green-700" : "")
        }
      >
        {word}
      </span>
    );
  };

  const handleDelete = () => {
    handleStop();
    onDelete(id);
  };

  const handleChange = ({ target }) => {
    let newNotes = lexer.interpret(target.value, scale, currentOctave);
    if (speed !== 1) newNotes = lexer.changeSpeed(newNotes, speed);

    // Need to come up with something different for this...
    // `notes` in Tone.Draw doesn't get updated from this call
    // so the highlighting doesn't work...
    setNotes(newNotes);
    setReferenceNotes(newNotes);
    setText(target.value);
    if (isPlaying) {
      part.clear();
      for (var note of newNotes) {
        part.add(note.time, note);
      }
      part.loopEnd = calculateLoopEnd(newNotes);

      setTotalLength(() => {
        return newNotes.length;
      });
    }
  };

  const handleSynthSelect = ({ target }) => {
    setSynth(synths.find((synth) => synth.name === target.value).name);
  };

  const handleOctaveChange = ({ target }) => {
    setCurrentOctave(target.value);
    setNotes(lexer.interpret(text, scale, target.value));
  };

  const handleSpeedChange = ({ target }) => {
    let newNotes = lexer.changeSpeed(referenceNotes, Number(target.value));
    setNotes(newNotes);
    setSpeed(Number(target.value));
    refreshPart(newNotes);
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

  const calculateLoopEnd = (notes) => {
    let lastNoteTime = Tone.Time(notes[notes.length - 1].time).toSeconds();
    let loopEnd = Tone.Time("1m").toSeconds();
    console.log(lastNoteTime, loopEnd);
    while (lastNoteTime >= loopEnd) {
      // TODO: Run more tests with this to see what is suitable
      loopEnd += Tone.Time("2n").toSeconds();
    }
    return loopEnd;
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
        // TODO: Fix issue with word highlighting when adding more words
        setCurrentWordIndex(notes.indexOf(value));
      }, time);
    }, notes);
    part.loopEnd = calculateLoopEnd(notes);
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
      handleSpeedChange={handleSpeedChange}
      synth={synth}
      currentOctave={currentOctave}
      currentSpeed={speed}
    />
  );
};

export default TrackContainer;
