import { useState } from "react";
import usePostNewRoom from "../../hooks/usePostNewRoom";
import {
  Alert,
  AlertIcon,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

const NewRoom = () => {
  const { room, isLoading, error, postUser } = usePostNewRoom();
  const [totalSlices, setTotalSlices] = useState(0);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    postUser(totalSlices);
  };

  return (
    <Card margin="10px">
      <CardHeader>
        <b>Create a New Room</b>
      </CardHeader>
      <CardBody>
        <label htmlFor="totalSlices">Total Slices: </label>
        <InputGroup>
          <Input
            type="number"
            id="totalSlices"
            value={totalSlices}
            width="34rem"
            onChange={(e) => setTotalSlices(parseInt(e.target.value, 10))}
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
      </CardBody>
      <CardFooter>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error.message}
          </Alert>
        )}
        {room && (
          <Alert status="success">
            <AlertIcon />
            Room created! {room.uuid}
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
};

export default NewRoom;
