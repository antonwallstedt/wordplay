import React from "react";

/**
 * Single track component for accepting user input.
 * @param {Object} React.createRef()
 * @returns input field with ref for retrieving user input
 */
function Track({ inputRef }) {
  return (
    <input data-testid="track-test" className="user-track" ref={inputRef} />
  );
}

export default Track;
