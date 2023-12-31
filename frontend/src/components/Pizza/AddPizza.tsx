import React, { useState } from "react";
import usePostPizzaToUser from "../../hooks/usePostPizzaToUser";
import {
  Alert,
  AlertIcon,
  Button,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";

const AddPizza = () => {
  const [pizzaSlices, setPizzaSlices] = useState<number>(0);
  const [userId, setUserId] = useState("");
  const { error, isLoading, linkUserToRoom, success } = usePostPizzaToUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    linkUserToRoom(pizzaSlices, userId);
  };

  return (
    <Stack spacing={3}>
      <Heading as="h2" size="lg">
        Add slice to user!
      </Heading>
      <Input
        type="number"
        value={pizzaSlices}
        onChange={(e) => setPizzaSlices(parseInt(e.target.value))}
        placeholder="Enter Room ID"
      />
      <Input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter User ID"
      />
      <Button onClick={handleSubmit} isLoading={isLoading}>
        Eat!
      </Button>
      {isLoading && <p>Loading...</p>}
      {error && (
        <Alert status="error">
          <AlertIcon /> Error: {JSON.stringify(error)}
        </Alert>
      )}
      {success && (
        <Alert status="success">
          <AlertIcon />
          Yooooo, eat that pizza!
        </Alert>
      )}
    </Stack>
  );
};

export default AddPizza;
