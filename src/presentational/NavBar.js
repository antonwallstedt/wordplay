function NavBar() {
  // TODO: pass appropriate props from container
  // - handlePlay, handleStop, handleBpmChange, scales (?)
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
      <select className="scale-select">
        /* TODO: map over util/Scales and populate dropdown */
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
