import React from "react";
import ButtonSecondary from "../components/ButtonSecondary";
import { AiOutlineDelete } from "react-icons/ai";
import { synths } from "../utils/Synths";

const Track = ({
  displayText,
  highlightWord,
  handleChange,
  handleDelete,
  handleSynthSelect,
  synth,
  inputRhythm,
  handleRhythmInput,
  currentOctave,
  handleOctaveChange,
  handlePlay,
  handleStop,
}) => {
  return (
    <div className="flex w-full items-center justify-center pb-10 text-center">
      <div className="flex w-full flex-col items-center justify-between rounded-3xl bg-gradient-to-b from-stone-400 to-stone-500 px-10 py-5 drop-shadow-lg">
        <div className="flex items-center justify-center">
          {displayText
            .split(" ")
            .map((word, index) => highlightWord(word, index))}
        </div>
        <input
          className="mt-5 w-full rounded-md p-1 indent-2 drop-shadow-md"
          maxLength="80"
          placeholder={displayText}
          onChange={handleChange}
        />
        <div className="float-left mt-5 flex gap-4">
          <ButtonSecondary text="Play" handleClick={handlePlay} />
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
