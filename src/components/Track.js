import React from "react";

/**
 * Single track component for accepting user input.
 * @param {Object} React.createRef()
 * @returns input field with ref for retrieving user input
 */
function Track({ inputRef }) {
  const inputStyle = {
    width: "100%",
    fontSize: 20,
    textIndent: 20,
  };

  return (
    <input
      data-testid="track-test"
      className="user-track"
      ref={inputRef}
      style={inputStyle}
    />
  );
}

export default Track;
