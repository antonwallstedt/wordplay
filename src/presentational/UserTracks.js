import Track from "../components/Track";

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
