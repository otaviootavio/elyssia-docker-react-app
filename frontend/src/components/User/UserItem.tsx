import { Card, CardBody, Skeleton, SkeletonText, Text } from "@chakra-ui/react";
import { user } from "../../types/user.d";
import React from "react";

const UserItem: React.FC<{ user: user | null }> = ({
  user,
}: {
  user: user | null;
}) => {
  if (!user) {
    return (
      <>
        <Skeleton height="40px" width="100%" />
        <SkeletonText noOfLines={2} spacing="5" />
      </>
    );

  }

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
