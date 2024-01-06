import {
  Box,
  Text,
  Heading, Alert,
  AlertIcon,
  Skeleton,
  VStack
} from "@chakra-ui/react";
import useGetRoomDetails from "../../hooks/useGetRoomDetails";
import UsersInRoom from "./UsersInRoom";

const RoomDetails = () => {
  const { roomDetails, isLoading, error } = useGetRoomDetails();

  if (isLoading) {
    return (
      <Box p={4}>
        <Skeleton height="20px" width="200px" mb={4} />
        <Skeleton height="15px" mb={4} />
        <Skeleton height="15px" mb={4} />
        <Skeleton height="20px" width="150px" mb={4} />
        <VStack spacing={4}>
          {Array(3)
            .fill("")
            .map((_, index) => (
              <Box key={index} width="full">
                <Skeleton height="50px" />
              </Box>
            ))}
        </VStack>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error loading room details: {error.message}
      </Alert>
    );
  }

  if (!roomDetails) {
    return <Text p={4}>No room details found.</Text>;
  }

  return (
    <>
      <Heading as="h2" size="lg">
        Room Details
      </Heading>
      <Text mt={2}>
        <strong>Total slices:</strong> {roomDetails.totalSlices}
      </Text>
      {roomDetails.users.length > 0 && <UsersInRoom users={roomDetails.users} />}
    </>
  );
};

export default RoomDetails;
