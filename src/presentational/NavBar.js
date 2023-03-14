import { scales } from "../utils/Scales";

/**
 * NavBar presentational component. Takes the event handlers from
 * the container component to attach to appropriate JSX elements.
 * @param {*} props
 * @returns JSX NavBar
 */
function NavBar(props) {
  const navBarStyle = {
    display: "flex",
    position: "relative",
    backgroundColor: "grey",
    justifyContent: "center",
  };

  const buttonStyle = {
    height: 40,
    margin: "20px 10px",
  };

  const dropdownStyle = {
    height: 40,
    margin: "20px 10px",
  };

  const inputStyle = {
    height: 40,
    margin: "20px 10px",
  };

  const { handlePlay, handleStop, handleBpmChange, handleScaleSelect } = props;
  return (
    <div className="navbar" style={navBarStyle}>
      <h1>WordPlay</h1>
      <button
        className="media-button play-button"
        onClick={handlePlay}
        style={buttonStyle}
      >
        Play
      </button>
      <button
        className="media-button stop-button"
        onClick={handleStop}
        style={buttonStyle}
      >
        Stop
      </button>
      <h2 className="scale-heading">Scale: </h2>
      <select
        className="scale-select"
        onChange={(e) => handleScaleSelect(e)}
        style={dropdownStyle}
      >
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
        style={inputStyle}
      />
    </div>
  );
}

export default NavBar;
