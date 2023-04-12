import React, { useState } from "react";
import Track from "./Track";
import ButtonPrimary from "../components/ButtonPrimary";
import { MdOutlineAddCircleOutline } from "react-icons/md";

const Playground = ({ isPlayingAll, scale }) => {
  const defaultTracks = [
    { key: 0, id: 0, text: "Hello my name is Anton" },
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
      {tracks.map((track) => (
        <Track
          key={track.key}
          id={track.id}
          inputText={track.text}
          onDelete={handleDelete}
          isPlayingAll={isPlayingAll}
          scale={scale}
        />
      ))}
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
