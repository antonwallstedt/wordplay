import React, { useState } from "react";
import Track from "./Track";
import ButtonPrimary from "../components/ButtonPrimary";
import { MdOutlineAddCircleOutline } from "react-icons/md";

const Playground = ({ isPlayingAll, scale, octave, rootNote }) => {
  const defaultTracks = [
    {
      key: 0,
      id: 0,
      text: "This, is our funky bass",
      octave: 2,
      rhythm: "0.5",
      instrument: "Synth",
    },
  ];
  const [tracks, setTracks] = useState(defaultTracks);

  const handleAdd = () => {
    setTracks([...tracks, { key: tracks.length, id: Date.now(), text: "" }]);
  };

  const handleDelete = (trackId) => {
    setTracks((prev) => prev.filter((track) => track.id !== trackId));
  };

  return (
    <div className="relative top-0 z-0 flex h-full flex-grow flex-col items-center justify-center bg-gradient-to-br from-white to-amber-50 p-20">
      <div className="flex w-full flex-wrap items-center justify-center">
        <div className="grid w-full grid-cols-1 overflow-auto">
          {tracks.map((track) => (
            <Track
              key={track.key}
              id={track.id}
              inputText={track.text}
              onDelete={handleDelete}
              isPlayingAll={isPlayingAll}
              scale={scale}
              octave={octave}
              inputOctave={track.octave}
              inputRhythm={track.rhythm}
              inputSynth={track.instrument}
              rootNote={rootNote}
            />
          ))}
        </div>
      </div>
      <ButtonPrimary
        icon={<MdOutlineAddCircleOutline className="mr-2" size="25px" />}
        edit="w-30 mb-10 right-10 flex justify-center items-center text-center"
        text="Add Track"
        handleClick={handleAdd}
      />
    </div>
  );
};

export default Playground;
