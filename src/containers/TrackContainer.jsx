import { useEffect, useState } from "react";
import PseudoLexer from "../lib/PseudoLexer";
import { synths } from "../utils/Synths";
import * as Tone from "tone";
import Track from "../presentational/Track";
import ScaleGenerator from "../lib/ScaleGenerator";

const TrackContainer = ({
  id,
  onDelete,
  onSolo,
  isTrackMuted,
  isPlayingAll,
  inputText,
  inputOctave,
  inputSynth,
  inputSpeed,
  inputVolume,
  inputRoot,
  mapping,
  octave,
  scaleNotes,
}) => {
  /**
   * HOOKS
   */
  const lexer = new PseudoLexer();
  const scaleGenerator = new ScaleGenerator();
  const [text, setText] = useState(inputText);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNote, setCurrentNote] = useState({});
  const [part, setPart] = useState(null);
  const [trackSynth, setTrackSynth] = useState();
  const [isMuted, setIsMuted] = useState(false);
  const [isSoloed, setIsSoloed] = useState(false);

  const [vol, setVol] = useState(() => {
    if (inputVolume) return Number(inputVolume);
    else return 0;
  });

  const [currentRoot, setCurrentRoot] = useState(() => {
    if (inputRoot) return inputRoot;
    else return scaleNotes[0];
  });

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
      let newNotes = lexer.interpret(text, mapping, currentOctave);
      setNotes(newNotes);
      setReferenceNotes(newNotes);
      if (speed !== 1)
        newNotes = lexer.changeSpeed(referenceNotes, newNotes, speed);
      refreshPart(newNotes);
    }
  }, [mapping]);

  // Update the current word index when the current note changes.
  useEffect(() => {
    setCurrentWordIndex(() => {
      return notes.indexOf(currentNote);
    });
  }, [currentNote, notes]);

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
        <p className="font-inter text-sm font-semibold text-stone-900 opacity-70">
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
    // We want to keep a reference of the original speed before we modify it
    let newNotes = lexer.interpret(target.value, mapping, currentOctave);
    setReferenceNotes(newNotes);

    // If the user has shifted the root note
    if (currentRoot !== scaleNotes[0]) {
      let shiftedNotes = scaleGenerator.shiftRoot(
        newNotes,
        currentRoot,
        scaleNotes,
        currentOctave
      );

      newNotes = [...newNotes].map((obj, index) => ({
        ...obj,
        note: shiftedNotes[index],
      }));
    }

    // Then we can modify it and set the speed of the notes playing
    if (speed !== 1) newNotes = lexer.changeSpeed(newNotes, newNotes, speed);
    setNotes(newNotes);
    setText(target.value);
    refreshPart(newNotes);
  };

  const handleSynthSelect = ({ target }) => {
    let newSynth = synths.find((synth) => synth.name === target.value).name;
    setSynth(newSynth);
    setTrackSynth(newSynth);
  };

  const handleOctaveChange = ({ target }) => {
    // If the octaves are updated we need to update the notes array
    // and store the original speed in the reference array
    let newNotes = scaleGenerator.setOctave(notes, target.value);
    setReferenceNotes((prev) => {
      return prev.map((obj, index) => ({ ...obj, note: newNotes[index].note }));
    });

    // Then update the playing notes array
    if (speed !== 1)
      newNotes = lexer.changeSpeed(referenceNotes, newNotes, speed);
    setCurrentOctave(target.value);
    setNotes(newNotes);
    refreshPart(newNotes);
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !isPlaying) {
      handlePlay();
    }
  };

  const handleVolumeChange = ({ target }) => {
    setVol(Number(target.value));
    trackSynth.volume.value = Number(target.value);
  };

  const handlePlay = () => {
    if (isPlaying) return;
    Tone.start();
    const currentSynth = synths
      .find((s) => s.name === synth)
      .synth.toDestination();
    currentSynth.volume.value = Number(vol);
    setTrackSynth(currentSynth);

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
      handleVolumeChange={handleVolumeChange}
      handleKeyPress={handleKeyPress}
      synth={synth}
      volume={vol}
      currentScale={mapping}
      currentOctave={currentOctave}
      currentSpeed={speed}
      currentRoot={currentRoot}
      scaleNotes={scaleNotes}
    />
  );
};

export default TrackContainer;
