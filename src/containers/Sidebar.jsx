import React, { useEffect } from "react";

const Sidebar = ({
  isShowing,
  handleRootNoteChange,
  handleScaleChange,
  handleOctaveChange,
  scales,
  defaultScale,
  mapping,
}) => {
  useEffect(() => {
    let userMapping = mapping;
  }, [mapping]);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return (
    <div
      className={
        "transition-duration-500 first-letter: absolute right-0 z-0 mt-0 flex h-[90%] w-96 flex-col rounded-bl-xl bg-gradient-to-b from-stone-300 to-stone-400 p-10 drop-shadow-lg transition-transform ease-in-out " +
        (isShowing && "translate-x-[100%]")
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
        <input
          className="ml-5 mt-[5px] h-5 w-10 rounded-md bg-stone-50 indent-1"
          placeholder="C"
          onChange={handleRootNoteChange}
        />
      </div>
      <div className="row-span-2 flex flex-row pb-2">
        <h2 className="text-xl font-semibold drop-shadow-sm">Scale</h2>
        <select
          className="w-30 ml-[60px] mt-[5px] h-5 rounded-md bg-stone-50 indent-1"
          onChange={handleScaleChange}
          defaultValue={defaultScale}
        >
          {scales.map((scale, index) => (
            <option key={index} value={scale}>
              {scale}
            </option>
          ))}
        </select>
      </div>
      <div className="row-span-2 mb-5 flex flex-row border-b-2 border-stone-500 border-opacity-30 pb-2">
        <h2 className="text-xl font-semibold drop-shadow-sm">Octave</h2>
        <input
          className="ml-11 mt-[5px] h-5 w-10 rounded-md bg-stone-50 indent-1"
          placeholder="4"
          onChange={handleOctaveChange}
        />
      </div>
      <h2 className="text-xl font-semibold drop-shadow-sm">Mapping</h2>
      <div className="mt-4 h-full overflow-y-auto rounded-lg bg-stone-100 shadow-sm">
        <ul className="p-5 drop-shadow-md">
          {mapping.map((note, index) => (
            <li key={index} className="my-4 flex flex-row first:my-0 last:my-0">
              <p className="w-5 font-black">{alphabet[index]}:</p>
              <input
                className="ml-5 w-full rounded-md bg-stone-300 indent-2"
                value={note}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
