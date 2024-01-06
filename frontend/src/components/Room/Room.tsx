import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import AddPizza from "../Pizza/AddPizza";
// import AddUserToRoomForm from "../User/LinkUserToRoomForm";
import NewUserForm from "../User/NewUserForm";
import RoomDetails from "./RoomDetails";
import { LastUpdateTimeProvider } from "../../providers/LastUpdateTimeContext";
import SocialShareWrapper from "../Social/SocialShareWrapper";

const Room = () => {
  return (
    <LastUpdateTimeProvider>
      <Link href="/">🏠 Home</Link>
      <Card>
        <CardHeader>
          <Heading as="h1" size="lg">
            Room
          </Heading>
          <SocialShareWrapper />
        </CardHeader>
        <CardBody>
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList>
              <Tab>Details</Tab>
              <Tab>Create User</Tab>
              {/* <Tab>Add User to Room</Tab> */}
              <Tab>Eat!</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <RoomDetails />
              </TabPanel>
              <TabPanel>
                <NewUserForm />
              </TabPanel>
              {/* TODO
              <TabPanel>
                <AddUserToRoomForm />
              </TabPanel> */}
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
