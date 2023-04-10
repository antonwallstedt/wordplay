import { useState } from "react";
import Playground from "./containers/Playground";
import Sidebar from "./containers/Sidebar";
import Toolbar from "./containers/Toolbar";
import ScaleGenerator from "./lib/ScaleGenerator";

function App() {
  const scaleGenerator = new ScaleGenerator();
  const [rootNote, setRootNote] = useState("C");
  const [scale, setScale] = useState("Major");
  const [octave, setOctave] = useState(4);
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

  return (
    <div className="flex h-full flex-col overflow-x-hidden font-inter">
      <Toolbar handleSideBarOpen={handleSidebarOpen} />
      <div className="flex h-full flex-row justify-between overflow-x-hidden">
        <Playground />
        <Sidebar
          isShowing={sidebarOpen}
          scales={scales}
          defaultScale={"Major"}
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
