import Track from "../components/Track";

/**
 *
 * @param {UserTracks} UserTracks component
 * @param {Event} handler for deleting tracks
 * @returns JSX unordered list of tracks
 */
function UserTracks({ userTracks, handleDelete }) {
  const listStyle = {
    padding: "0px 40px 0px",
    marginTop: 30,
    listStyleType: "none",
  };

  const listItemStyle = {
    height: 60,
    display: "flex",
    justifyContent: "center",
  };

  return (
    <ul className="user-tracks" style={listStyle}>
      {userTracks.map(({ id, ref }) => (
        <li key={id} style={listItemStyle}>
          <Track inputRef={ref} />
          <button className="delete-btn" onClick={() => handleDelete(id)}>
            X
          </button>
        </li>
      ))}
    </ul>
  );
}

export default UserTracks;
