import React, { useState } from "react";
import usePostPizzaToUser from "../../hooks/usePostPizzaToUser";
import {
  AbsoluteCenter,
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import useGetRoomDetails from "../../hooks/useGetRoomDetails";
import UserItem from "../User/UserItem";

const AddPizza = () => {
  const [pizzaSlices, setPizzaSlices] = useState<number>(0);
  const [userId, setUserId] = useState("");
  const {
    error: errorPostPizza,
    isLoading: loadingPostPizza,
    addSliceToUser,
    success,
  } = usePostPizzaToUser();
  const {
    error: getRoomError,
    isLoading: getRoomisLoading,
    roomDetails,
  } = useGetRoomDetails();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!roomDetails) {
      throw new Error("Room details is undefined!");
    }

    const currentUser = roomDetails.users.find((user) => user.uuid == userId);

    if (!currentUser) {
      throw new Error("Could no find user");
    }
    const currentPizzaSlices = currentUser.slicesEaten;

    if (currentPizzaSlices != 0 && !currentPizzaSlices) {
      throw new Error("Number of slices is undefined!");
    }

    console.log(pizzaSlices + currentPizzaSlices);

    addSliceToUser(pizzaSlices + currentPizzaSlices, userId);
  };

  if (getRoomError) {
    return (
      <Alert status="error">
        <AlertIcon />
        There was an error processing your request.
        {getRoomError.message}
      </Alert>
    );
  }

  return (
    <Stack spacing={3}>
      <Heading as="h2" size="lg">
        Add slices to user!
      </Heading>
      <FormControl>
        <FormLabel>Select user!</FormLabel>
        <Select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Name"
        >
          {roomDetails?.users.map((user) => (
            <option key={user.uuid} value={user.uuid}>
              {user.name}
            </option>
          ))}
        </Select>
      </FormControl>
      {userId && roomDetails && (
        <>
          <Box position="relative" padding="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4">
              User status!
            </AbsoluteCenter>
          </Box>
          <UserItem
            user={roomDetails.users.find((user) => user.uuid == userId) || null}
          />
          <Box position="relative" padding="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4">
              Add slices!
            </AbsoluteCenter>
          </Box>
          <FormControl>
            <FormLabel>Number of new slices!</FormLabel>
            <Input
              type="number"
              value={pizzaSlices}
              onChange={(e) => setPizzaSlices(parseInt(e.target.value))}
              placeholder="Ammount of slices"
            />
          </FormControl>
          <Button onClick={handleSubmit} isLoading={loadingPostPizza}>
            Eat!
          </Button>
        </>
      )}

      {loadingPostPizza && <p>Loading...</p>}
      {errorPostPizza && (
        <Alert status="error">
          <AlertIcon /> Error: {JSON.stringify(errorPostPizza)}
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
