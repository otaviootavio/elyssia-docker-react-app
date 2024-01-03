import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";
import { user } from "../../types/user.d";
import React from "react";

const UserItem: React.FC<{ user: user | null }> = ({
  user,
}: {
  user: user | null;
}) => {
  return (
    <Card>
      <CardBody>
        <Text> {user?.name}</Text>
        <Text>
          <strong>Slices Eaten:</strong> {user?.slicesEaten}
        </Text>
      </CardBody>
    </Card>
  );
};

export default UserItem;
