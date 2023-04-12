import React from "react";
import { BiEdit } from "react-icons/bi";
import ButtonPrimary from "../components/ButtonPrimary";
import * as Tone from "tone";

function Toolbar({ handleSideBarOpen, handlePlayAll, handleStopAll }) {
  Tone.Transport.bpm.value = 90; // Default to 90 bpm
  const handleBpmChange = ({ target }) => {
    Tone.Transport.bpm.value = target.value;
  };
  return (
    <div className="z-10 flex items-center justify-center bg-gradient-to-tr from-orange-200 to-orange-300 py-5 text-center drop-shadow-md">
      <h1 className="absolute left-10 font-caveat text-3xl font-bold drop-shadow-md md:text-4xl">
        WordPlay
      </h1>
      <div className="flex gap-4">
        <ButtonPrimary text="Play All" />
        <ButtonPrimary text="Stop All" />
        <h2 className="mt-1 text-lg font-semibold">BPM</h2>
        <input
          className="-ml-2 mt-1 h-7 w-12 rounded-md indent-1"
          placeholder="90"
          onChange={handleBpmChange}
        />
      </div>
      <ButtonPrimary
        edit="absolute right-10 flex justify-center items-center text-center"
        text="Edit Rules"
        icon={<BiEdit className="mr-2" size="30px" />}
        handleClick={handleSideBarOpen}
      />
    </div>
  );
}

export default Toolbar;
