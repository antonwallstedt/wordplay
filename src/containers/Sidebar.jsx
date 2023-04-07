import React from "react";

const Sidebar = ({ isShowing }) => {
  return (
    <div
      className={
        "z-5 transition-duration-500 first-letter: absolute right-0 mt-0 flex h-full w-96 flex-col rounded-b-xl bg-stone-300 p-10 drop-shadow-lg transition-transform ease-in-out " +
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
        />
      </div>
      <div className="row-span-2 mb-5 flex flex-row border-b-2 border-stone-500 border-opacity-30 pb-2">
        <h2 className="text-xl font-semibold drop-shadow-sm">Scale</h2>
        <select className="mb-3 ml-5 mt-[5px] h-5 w-10 rounded-md bg-stone-50 indent-1"></select>
      </div>
      <h2 className="text-xl font-semibold drop-shadow-sm">Mapping</h2>
      <div className="mt-4 h-full overflow-y-auto rounded-lg bg-stone-100 shadow-sm"></div>
    </div>
  );
};

export default Sidebar;
