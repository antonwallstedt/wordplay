import React, { useState } from "react";
import ButtonSecondary from "../components/ButtonSecondary";
import { AiOutlineDelete } from "react-icons/ai";

// * Input card for the users
const Track = ({ id, onDelete, isPlayingAll, inputText, scale }) => {
  const wordSynth = new WordSynth();
  const [text, setText] = useState(inputText);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [sequence, setSequence] = useState([]);
  const [synth, setSynth] = useState("Synth");

  useEffect(() => {
    if (isPlayingAll && !isPlaying) {
      setIsPlaying(true);
      handlePlay(text);
    } else {
      setIsPlaying(false);
    }
  }, [isPlayingAll]);

  const highlightWord = (word, index) => {
    return (
      <span
        key={index}
        className="m-1.5 items-center justify-center text-center font-jetbrains text-2xl font-semibold drop-shadow-md"
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

  const handleSynthSelect = ({ target }) => {
    setSynth(synths.find((synth) => synth.name === target.value).name);
  };

  const handlePlay = (input) => {
    const inputSequence = wordSynth.parseInput(input, scale);
    console.log(inputSequence);
    const notes = inputSequence.map((obj) => obj.note);
    const lens = inputSequence.map((obj) => obj.len);
    let lenIndex = 0;

    const currentSynth = synths.find((s) => s.name === synth).synth;
    const release = lens[lenIndex] * 0.05;
    const velocity = lens[lenIndex] * 0.05;
    const seq = new Tone.Sequence((time, note) => {
      currentSynth.triggerAttackRelease(note, release, time, velocity);
      Tone.Draw.schedule(() => {
        lenIndex = (lenIndex + 1) % lens.length;
        setCurrentWordIndex((currentIndex) => {
          let nextIndex = (currentIndex + 1) % notes.length;
          return nextIndex;
        });
      }, time);
    }, notes);
    seq.start(0);
    setIsPlaying(true);
    setSequence(seq);
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
    <div className="mb-10 flex max-w-2xl flex-col items-center justify-between rounded-3xl bg-gradient-to-b from-stone-400 to-stone-500 px-10 py-5 drop-shadow-lg">
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
      </div>
    </div>
  );
};

export default Track;
