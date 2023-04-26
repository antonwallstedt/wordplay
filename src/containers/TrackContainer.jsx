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
  /**
   * HOOKS
   */
  const lexer = new PseudoLexer();
  const [text, setText] = useState(inputText);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNote, setCurrentNote] = useState({});
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
    if (inputText) return lexer.interpret(inputText, mapping, currentOctave);
    else return [];
  });

  // When changing the speed, we don't want to modify
  // our original array of notes, since it applies a scalar
  // it will not be in relation to the "original notes"
  // so we keep a separate state as reference that never changes.
  const [referenceNotes, setReferenceNotes] = useState(notes);

  const [synth, setSynth] = useState(() => {
    // If a synth is pre-supplied use that, otherwise
    // resort to default "Synth"
    if (inputSynth) return inputSynth;
    else return "Synth";
  });

  // Start all tracks, if current track is already playing ignore.
  useEffect(() => {
    if (isPlayingAll && !isPlaying) {
      setIsPlaying(true);
      handlePlay();
    } else {
      handleStop();
    }
  }, [isPlayingAll]);

  // Update notes if the scale changes from the sidebar.
  useEffect(() => {
    if (text) {
      setNotes(lexer.interpret(text, scale, currentOctave));
      setReferenceNotes(lexer.interpret(text, scale, currentOctave));
      if (isPlaying) {
        let newNotes = lexer.interpret(text, scale, currentOctave);
        for (var noteObj of newNotes) {
          part.at(noteObj.time).value.note = noteObj.note;
        }
      }
    }
  }, [scale]);

  // Update the current word index when the current note changes.
  useEffect(() => {
    setCurrentWordIndex(() => {
      return notes.indexOf(currentNote);
    });
  }, [currentNote]);

  /**
   * HELPER FUNCTIONS
   */

  // TODO: fix issue when you only have one word
  const highlightWord = (obj, index) => {
    return (
      <div key={index}>
        <span
          key={index}
          className={
            "items-center justify-center rounded-md px-[6px] text-center font-jetbrains text-xl font-semibold drop-shadow-md " +
            (isPlaying && index === currentWordIndex
              ? "bg-green-700 bg-opacity-80"
              : "")
          }
        >
          {obj.word}
        </span>
        <p className="font-inter text-lg text-stone-900 opacity-60">
          {obj.note}
        </p>
      </div>
    );
  };

  const calculateLoopEnd = (notes) => {
    let lastNoteTime = Tone.Time(notes[notes.length - 1].time).toSeconds();
    let loopEnd = Tone.Time("1m").toSeconds();
    while (lastNoteTime >= loopEnd) {
      // TODO: Run more tests with this to see what is suitable
      loopEnd += Tone.Time("1m").toSeconds();
    }
    return loopEnd;
  };

  const refreshPart = (newNotes) => {
    if (isPlaying) {
      part.clear();
      for (var note of newNotes) {
        part.add(note.time, note);
      }
      part.loopEnd = calculateLoopEnd(newNotes);
    }
  };

  /**
   * EVENT HANDLERS
   */

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
    refreshPart(newNotes);
  };

  const handleSynthSelect = ({ target }) => {
    setSynth(synths.find((synth) => synth.name === target.value).name);
  };

  const handleOctaveChange = ({ target }) => {
    setCurrentOctave(target.value);
    setNotes(lexer.interpret(text, scale, target.value));
  };

  const handleSpeedChange = ({ target }) => {
    let newNotes = lexer.changeSpeed(
      referenceNotes,
      notes,
      Number(target.value)
    );
    setNotes(newNotes);
    setSpeed(Number(target.value));
    refreshPart(newNotes);
  };

  const handleRootShift = ({ target }) => {
    console.log(referenceNotes.map((obj) => obj.note));
    let shiftedNotes = scaleGenerator.shiftRoot(
      referenceNotes,
      target.value,
      scaleNotes,
      currentOctave
    );
    console.log(shiftedNotes);

    let newNotes = [...notes].map((obj, index) => {
      return { ...obj, note: shiftedNotes[index] };
    });

    if (speed !== 1)
      newNotes = lexer.changeSpeed(referenceNotes, newNotes, speed);

    setNotes(newNotes);
    setCurrentRoot(target.value);
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

  const handlePlay = () => {
    if (isPlaying) return;
    Tone.start();
    const currentSynth = synths
      .find((s) => s.name === synth)
      .synth.toDestination();

    const notePart = new Tone.Part((time, value) => {
      currentSynth.triggerAttackRelease(
        value.note,
        value.duration,
        time,
        value.velocity
      );

      Tone.Draw.schedule(() => {
        setCurrentNote(() => {
          return value;
        });
      }, time);
    }, notes);
    notePart.loopEnd = calculateLoopEnd(notes);
    notePart.loop = true;
    notePart.start("0m", 0);
    Tone.Transport.start();
    setIsPlaying(true);
    setPart(notePart);
  };

  return (
    <Track
      displayText={notes}
      highlightWord={highlightWord}
      handleChange={handleChange}
      handleDelete={handleDelete}
      handleSynthSelect={handleSynthSelect}
      handleOctaveChange={handleOctaveChange}
      handlePlay={handlePlay}
      handleStop={handleStop}
      handleSpeedChange={handleSpeedChange}
      handleRootShift={handleRootShift}
      synth={synth}
      currentScale={mapping}
      currentOctave={currentOctave}
      currentSpeed={speed}
      scaleNotes={scaleNotes}
    />
  );
};

export default TrackContainer;
