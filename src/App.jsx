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

  const handleSurprise = () => {
    let scales = scaleGenerator.getScales();
    let notes = scaleGenerator.getChromaticScale();
    let octaves = [2, 3, 4];
    let randScale = scales[Math.floor(Math.random() * scales.length)];
    let randRootNote = notes[Math.floor(Math.random() * notes.length)];
    let randOctave = octaves[Math.floor(Math.random() * octaves.length)];
    setScale(randScale);
    setRootNote(randRootNote);
    setOctave(randOctave);
    setMapping(
      scaleGenerator.createMapping(randRootNote, randScale, Number(randOctave))
    );
    setScaleNotes(scaleGenerator.createScale(randRootNote, randScale));
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
          mapping={mapping}
          scaleNotes={scaleNotes}
          octave={octave}
          rootNote={rootNote}
        />
        <Sidebar
          isShowing={sidebarOpen}
          scales={scales}
          defaultRootNote={rootNote}
          defaultScale={scale}
          defaultOctave={octave}
          chromaticScale={chromaticScale}
          handleScaleChange={handleScaleChange}
          handleRootNoteChange={handleRootNoteChange}
          handleOctaveChange={handleOctaveChange}
          handleSurprise={handleSurprise}
          mapping={mapping}
        />
      </div>
    </div>
  );
}

export default App;
