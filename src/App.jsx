import { useState } from "react";
import Playground from "./containers/Playground";
import Sidebar from "./containers/Sidebar";
import Toolbar from "./containers/Toolbar";
import ScaleGenerator from "./lib/ScaleGenerator";
import * as Tone from "tone";

function App() {
  const scaleGenerator = new ScaleGenerator();
  const [rootNote, setRootNote] = useState("G");
  const [scale, setScale] = useState("Dorian Mode");
  const [octave, setOctave] = useState(4);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [mapping, setMapping] = useState(
    scaleGenerator.createMapping(rootNote, scale, octave)
  );
  const scales = scaleGenerator.getScales();
  const chromaticScale = scaleGenerator.getChromaticScale();
  const handleRootNoteChange = ({ target }) => {
    setRootNote(target.value);
    setMapping(() => {
      return scaleGenerator.createMapping(target.value, scale, octave);
    });
  };

  const handleScaleChange = ({ target }) => {
    setScale(target.value);
    setMapping(() =>
      scaleGenerator.createMapping(rootNote, target.value, octave)
    );
  };

  const handleOctaveChange = ({ target }) => {
    setOctave(Number(target.value));
    setMapping(() =>
      scaleGenerator.createMapping(rootNote, scale, Number(target.value))
    );
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePlayAll = () => {
    setIsPlayingAll(true);
  };

  const handleStopAll = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    Tone.Transport.clear();
    setIsPlayingAll(false);
  };

  return (
    <div className="flex h-full flex-col overflow-x-hidden font-inter">
      <Toolbar
        handleSideBarOpen={handleSidebarOpen}
        handlePlayAll={handlePlayAll}
        handleStopAll={handleStopAll}
      />
      <div className="flex h-full flex-row justify-between overflow-x-hidden">
        <Playground
          isPlayingAll={isPlayingAll}
          scale={mapping}
          octave={octave}
          rootNote={rootNote}
        />
        <Sidebar
          isShowing={sidebarOpen}
          scales={scales}
          defaultRootNote={rootNote}
          defaultScale={scale}
          chromaticScale={chromaticScale}
          handleScaleChange={handleScaleChange}
          handleRootNoteChange={handleRootNoteChange}
          handleOctaveChange={handleOctaveChange}
          mapping={mapping}
        />
      </div>
    </div>
  );
}

export default App;
