import { useEffect } from "react";
import useGetUserById from "../../hooks/useGetUserById";
import { Box, Text, Spinner, Alert, AlertIcon } from "@chakra-ui/react";

const UserItem = ({ userId }: { userId: string }) => {
  const { user, isLoading, error, getUser } = useGetUserById();

  useEffect(() => {
    getUser(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (isLoading) {
    return (
      <Box textAlign="center" py={5}>
        <Spinner />
        <Text>Loading user...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error loading user: {error.message}
      </Alert>
    );
  }

  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Text mt={4}>
        <strong>UUID:</strong> {user?.uuid}
      </Text>
      <Text mt={4}>
        <strong>Name:</strong> {user?.name}
      </Text>
      <Text mt={4}>
        <strong>Slices Eaten:</strong> {user?.slicesEaten}
      </Text>
    </Box>
  );
};

export default UserItem;
