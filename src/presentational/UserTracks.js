import Track from "../components/Track";

/**
 *
 * @param {UserTracks} UserTracks component
 * @param {Event} handler for deleting tracks
 * @returns JSX unordered list of tracks
 */
function UserTracks({ userTracks, handleDelete }) {
  return (
    <ul className="user-tracks">
      {userTracks.map(({ id, ref }) => (
        <li key={id}>
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
