import { useState } from "react";
import "./App.css";

function Track() {
  const inputStyle = {
    width: "100%",
    height: "100%",
    transition: "all 1s",
    borderRadius: "10px",
    fontSize: "20px",
  };

  const divStyle = {
    backgroundColor: "black",
    padding: "40px",
    borderRadius: "20px",
    transition: "all 1s",
  };

  const paragraphStyle = {
    fontFamily: "Courier",
    fontSize: "30px",
  };

  const [text, setText] = useState("");
  const handleChange = ({ target }) => {
    setText(target.value);
  };
  return (
    <div className="track-container" style={divStyle}>
      <p style={paragraphStyle}>{text}</p>
      <textarea
        className="track-input"
        onChange={handleChange}
        style={inputStyle}
      />
    </div>
  );
}

function App() {
  return (
    <div>
      <Track />
    </div>
  );
}

export default App;
