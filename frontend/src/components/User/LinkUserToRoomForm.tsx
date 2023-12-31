import React, { useState } from "react";
import useAddUserToRoom from "../../hooks/useAddUserToRoom";
import {
  Alert,
  AlertIcon,
  Button,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";

const AddUserToRoomForm = () => {
  const [roomId, setRoomId] = useState("");
  const [userId, setUserId] = useState("");
  const { linkUserToRoom, isLoading, error, success } = useAddUserToRoom();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    linkUserToRoom(roomId, userId);
  };

  return (
    <Stack spacing={3}>
      <Heading as="h2" size="lg">
        Add user to room!
      </Heading>
      <Input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter Room ID"
      />
      <Input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter User ID"
      />
      <Button onClick={handleSubmit} isLoading={isLoading}>
        Link
      </Button>
      {error && (
        <Alert status="error">
          <AlertIcon /> Error: {JSON.stringify(error)}
        </Alert>
      )}
      {success && (
        <Alert status="success">
          <AlertIcon />
          User linked to room successfully!
        </Alert>
      )}
    </Stack>
  );
};

export default AddUserToRoomForm;
