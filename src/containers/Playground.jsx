import React from "react";
import TrackContainer from "./TrackContainer";

const Playground = ({
  handleDelete,
  handleSolo,
  tracks,
  isPlayingAll,
  mapping,
  octave,
  rootNote,
  scaleNotes,
  cleanUp,
}) => {
  return (
    <div className="relative top-0 z-0 flex h-full flex-grow flex-col items-center justify-center bg-gradient-to-br from-white to-amber-50">
      <div className="flex h-full w-full flex-wrap items-center justify-center">
        <div className="grid h-full w-full grid-cols-1 overflow-auto p-10">
          {tracks.map((track) => (
            <TrackContainer
              key={track.key}
              id={track.id}
              inputText={track.text}
              onDelete={handleDelete}
              onSolo={handleSolo}
              isPlayingAll={isPlayingAll}
              mapping={mapping}
              octave={octave}
              inputOctave={track.octave}
              inputSynth={track.instrument}
              inputSpeed={track.speed}
              inputVolume={track.volume}
              inputRoot={track.root}
              scaleNotes={scaleNotes}
              rootNote={rootNote}
              isTrackMuted={track.isMuted}
              cleanUp={cleanUp}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playground;
