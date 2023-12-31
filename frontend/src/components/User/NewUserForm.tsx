import React, { useState } from "react";
import usePostNewUser from "../../hooks/usePostNewUser";
import {
  Alert,
  AlertIcon,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";

const NewUserForm = () => {
  const [name, setName] = useState("");
  const { user, isLoading, error, postUser } = usePostNewUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postUser(name);
  };

  return (
    <Stack spacing={3}>
      <h2>Create New User</h2>
      <InputGroup>
        <Input
          type="text"
          id="name"
          value={name}
          width="34rem"
          onChange={(e) => setName(e.target.value)}
        />
        <InputRightElement width="5rem">
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            size="sm"
            onClick={handleSubmit}
            h="1.75rem"
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </InputRightElement>
      </InputGroup>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      {user && (
        <Alert status="success">
          <AlertIcon />
          User Created: {user.name} {user.uuid}
        </Alert>
      )}
    </Stack>
  );
};

export default NewUserForm;
