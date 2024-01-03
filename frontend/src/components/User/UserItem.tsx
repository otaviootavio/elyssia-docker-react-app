import { Box, Text } from "@chakra-ui/react";
import { user } from "../../types/user.d";
import React from "react";

const UserItem: React.FC<{ user: user | null }> = ({
  user,
}: {
  user: user | null;
}) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px">
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
