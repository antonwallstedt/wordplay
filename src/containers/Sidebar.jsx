import React from "react";
import ButtonSecondary from "../components/ButtonSecondary";
import { FaRegSurprise } from "react-icons/fa";

const Sidebar = ({
  isShowing,
  handleRootNoteChange,
  handleScaleChange,
  handleOctaveChange,
  handleSurprise,
  chromaticScale,
  scales,
  defaultScale,
  defaultRootNote,
  defaultOctave,
  mapping,
}) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return (
    <div
      className={
        "absolute right-0 z-0 mt-0 flex h-[90%] w-96 flex-col rounded-bl-xl bg-gradient-to-b from-stone-300 to-stone-400 p-10 drop-shadow-lg transition-transform duration-500 ease-in-out " +
        (!isShowing && "translate-x-[100%]")
      }
    >
      <h1 className="text-2xl font-semibold drop-shadow-md">Edit Rule Set</h1>
      <p className="mb-5 text-base font-medium">
        Here you can set the scale and edit the mapping from letter to note.
        Select a root note and a scale and the mapping will auto-fill. You can
        then edit individual mappings to your liking.
      </p>
      <div className="row-span-2 flex flex-row pb-2">
        <h2 className="text-xl font-semibold drop-shadow-sm">Root note</h2>
        <select
          className="ml-5 mt-[5px] h-5 w-12 rounded-md bg-stone-50 indent-1"
          onChange={handleRootNoteChange}
          value={defaultRootNote}
        >
          {chromaticScale.map((note, index) => (
            <option key={index} value={note}>
              {note}
            </option>
          ))}
        </select>
      </div>
      <div className="row-span-2 flex flex-row pb-2">
        <h2 className="text-xl font-semibold drop-shadow-sm">Scale</h2>
        <select
          className="ml-[60px] mt-[5px] h-5 w-40 rounded-md bg-stone-50 indent-1"
          onChange={handleScaleChange}
          value={defaultScale}
        >
          {scales.map((scale, index) => (
            <option key={index} value={scale}>
              {scale}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-rowpb-5 row-span-2 mb-5 flex">
        <h2 className="text-xl font-semibold drop-shadow-sm">Octave</h2>
        <select
          className="ml-11 mt-[5px] h-5 w-10 rounded-md bg-stone-50 indent-1"
          value={defaultOctave}
          onChange={handleOctaveChange}
        >
          {[2, 3, 4, 5, 6].map((octave, index) => (
            <option key={index} value={octave}>
              {octave}
            </option>
          ))}
        </select>
      </div>
      <ButtonSecondary
        text="Surprise me!"
        edit={"w-30 mb-5 right-10 flex justify-center items-center text-center"}
        icon={<FaRegSurprise className="mr-2" size={"18px"} />}
        handleClick={handleSurprise}
      />
      <h2 className="text-xl font-semibold drop-shadow-sm">Mapping</h2>
      <div className="mt-4 h-full overflow-y-auto rounded-lg bg-stone-100 shadow-sm">
        <ul className="p-5 drop-shadow-md">
          {mapping.map((note, index) => (
            <li key={index} className="my-4 flex flex-row first:my-0 last:my-0">
              <p className="w-5 font-black">{alphabet[index]}</p>
              <input
                className="ml-5 w-full rounded-md bg-stone-300 indent-2"
                value={note}
                onChange={() => {}} /* TODO: Figure out handleChange event */
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
