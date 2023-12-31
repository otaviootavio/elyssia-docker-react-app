import React, { useState } from "react";
import useAddUserToRoom from "../../hooks/useAddUserToRoom";
import { Alert, AlertIcon, Button, Input, Stack } from "@chakra-ui/react";

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
      <h2>Add user to room!</h2>
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
