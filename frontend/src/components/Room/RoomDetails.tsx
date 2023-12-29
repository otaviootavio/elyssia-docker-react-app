import useGetRoomDetails from "../../hooks/useGetRoomDetails";
import UserItem from "../User/UserItem";

const RoomDetails = () => {
  const { roomDetails, isLoading, error } = useGetRoomDetails();

  if (isLoading) {
    return <p>Loading room details...</p>;
  }

  if (error) {
    return <p>Error loading room details: {error.message}</p>;
  }

  if (!roomDetails) {
    return <p>No room details found.</p>;
  }

  return (
    <div>
      <h2>Room Details</h2>
      <p>UUID: {roomDetails.uuid}</p>
      <p>Total slices: {roomDetails.totalSlices}</p>
      <h3>Users in this Room:</h3>
      <ul>
        {roomDetails.users.map((user, index) => (
          <li key={index}>
            <UserItem userId={user} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomDetails;
