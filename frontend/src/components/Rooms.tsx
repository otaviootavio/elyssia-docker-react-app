import useGetRooms from "../hooks/useGetRooms";

const Rooms = () => {
  const { rooms, isLoading, error } = useGetRooms();

  if (isLoading) return <p>Loading rooms...</p>;
  if (error) return <p>Error loading rooms: {error.message}</p>;

  return (
    <div>
      <h2>Rooms</h2>
      <pre>{JSON.stringify(rooms, null, 2)}</pre>
    </div>
  );
};

export default Rooms;
