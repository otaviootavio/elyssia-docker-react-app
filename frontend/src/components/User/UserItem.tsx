import { Box, Text } from "@chakra-ui/react";
import { user } from "../../types/user.d";
import React from "react";

const UserItem: React.FC<{ user: user }> = ({ user }: { user: user }) => {
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
