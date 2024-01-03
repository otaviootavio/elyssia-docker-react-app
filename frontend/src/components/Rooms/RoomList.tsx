import useGetRooms from "../../hooks/useGetRooms";

const RoomsList = () => {
  const { rooms, isLoading, error } = useGetRooms();

  if (isLoading) {
    return <p>Loading rooms...</p>;
  }

  if (error) {
    return <p>Error loading rooms: {error.message}</p>;
  }

  if (!rooms || rooms.length === 0) {
    return <p>No rooms available.</p>;
  }

  return (
    <div>
      <h2>Rooms List</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.uuid}>
            <p>Created At: {new Date(room.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomsList;
