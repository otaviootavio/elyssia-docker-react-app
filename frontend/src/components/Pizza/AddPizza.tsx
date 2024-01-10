import { useState } from "react";
import {
  Alert,
  AlertIcon,
  Heading,
  Stack,
} from "@chakra-ui/react";
import useGetRoomDetails from "../../hooks/useGetRoomDetails";
import { UserSelector } from "./UserSelector";
import { UserStatus } from "./UserStatus";
import { user } from "../../types/user.d";

const AddPizza = () => {
  const [user, setUser] = useState<user | null>(null);
  const { error: getRoomError, roomDetails } = useGetRoomDetails();


  if (getRoomError) {
    return (
      <Alert status="error">
        <AlertIcon />
        There was an error processing your request.
        {getRoomError.message}
      </Alert>
    );
  }

  if (!roomDetails) {
    return (
      <Alert status="loading">
        <AlertIcon />
        Wait..
      </Alert>
    )
  }

  if (roomDetails.users.length == 0) {
    return (
      <Alert status="info">
        <AlertIcon />
        No users on the room!
      </Alert>
    )
  }

  return (
    <Stack spacing={3}>
      <Heading as="h2" size="lg">Add slices to user!</Heading>
      <UserSelector user={user} setUser={setUser} users={roomDetails.users} />
      {user && roomDetails && (
        <>
          <UserStatus key={user.uuid} userUuid={user.uuid} />
        </>
      )}
    </Stack>
  );
};

export default AddPizza;
