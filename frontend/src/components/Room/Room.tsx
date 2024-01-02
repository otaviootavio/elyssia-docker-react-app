import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import AddPizza from "../Pizza/AddPizza";
import AddUserToRoomForm from "../User/LinkUserToRoomForm";
import NewUserForm from "../User/NewUserForm";
import RoomDetails from "./RoomDetails";
import { LastUpdateTimeProvider } from "../../providers/LastUpdateTimeContext";

const Room = () => {
  return (
    <LastUpdateTimeProvider>
      <Card>
        <CardHeader>
          <Heading as="h1" size="lg">
            Room
          </Heading>
        </CardHeader>
        <CardBody>
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList>
              <Tab>Details</Tab>
              <Tab>Create User</Tab>
              <Tab>Add User to Room</Tab>
              <Tab>Eat!</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <RoomDetails />
              </TabPanel>
              <TabPanel>
                <NewUserForm />
              </TabPanel>
              <TabPanel>
                <AddUserToRoomForm />
              </TabPanel>
              <TabPanel>
                <AddPizza />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </LastUpdateTimeProvider>
  );
};

export default Room;
