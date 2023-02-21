import { scales } from "../utils/Scales";

function NavBar(props) {
  const { handlePlay, handleStop, handleBpmChange, handleScaleSelect } = props;
  return (
    <div className="navbar">
      <h1>WordPlay</h1>
      <button className="media-button play-button" onClick={handlePlay}>
        Play
      </button>
      <button className="media-button stop-button" onClick={() => handleStop()}>
        Stop
      </button>
      <h2 className="scale-heading">Scale: </h2>
      <select className="scale-select" onChange={(e) => handleScaleSelect(e)}>
        {scales.map(({ name, scale }) => (
          <option value={scale} key={name}>
            {name}
          </option>
        ))}
      </select>
      <h2 className="bpm-heading">BPM: </h2>
      <input
        className="bpm-select"
        placeholder="120"
        onChange={handleBpmChange}
      />
    </div>
  );
}

export default NavBar;
