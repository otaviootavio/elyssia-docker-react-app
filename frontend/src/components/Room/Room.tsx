import AddUserToRoomForm from "../User/LinkUserToRoomForm";
import NewUserForm from "../User/NewUserForm";
import RoomDetails from "./RoomDetails";

const Room = () => {
  return (
    <div>
      <h2>Room</h2>
      <RoomDetails />
      <NewUserForm />
      <AddUserToRoomForm />
    </div>
  );
};

export default Room;
