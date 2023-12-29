import { useState } from "react";
import usePostNewRoom from "../../hooks/usePostNewRoom";

const NewRoom = () => {
  const { user, isLoading, error, postUser } = usePostNewRoom();
  const [totalSlices, setTotalSlices] = useState(0);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    postUser(totalSlices);
  };

  return (
    <div>
      <h2>Create a New Room</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="totalSlices">Total Slices: </label>
        <input
          type="number"
          id="totalSlices"
          value={totalSlices}
          onChange={(e) => setTotalSlices(parseInt(e.target.value, 10))}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Room"}
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {user && <p>Room Created! ID: {user.uuid}</p>}
    </div>
  );
};

export default NewRoom;
