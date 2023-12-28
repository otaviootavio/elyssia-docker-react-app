import React, { useState } from "react";
import useAddUserToRoom from "../../hooks/useAddUserToRoom";

const AddUserToRoomForm = () => {
  const [roomId, setRoomId] = useState("");
  const [userId, setUserId] = useState("");
  const { linkUserToRoom, isLoading, error, success } = useAddUserToRoom();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    linkUserToRoom(roomId, userId);
  };

  return (
    <div>
      <h2>Link User to Room</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
        />
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
        />
        <button type="submit" disabled={isLoading || !roomId || !userId}>
          Link
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {JSON.stringify(error)}</p>}
      {success && <p>User linked to room successfully!</p>}
    </div>
  );
};

export default AddUserToRoomForm;
