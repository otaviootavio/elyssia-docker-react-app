import { ChakraProvider, Container, Flex } from "@chakra-ui/react";
import NewRoom from "./components/Room/NewRoom";
import Room from "./components/Room/Room";
import getUuidFromUrl from "./util/getUuidFromUrl";

function App() {
  const uuid = getUuidFromUrl();
  return (
    <ChakraProvider>
      <Flex
        width={"100vw"}
        height={"100vh"}
        alignContent={"end"}
        justifyContent={"center"}
        marginTop={"10px"}
      >
        <Container>{uuid ? <Room /> : <NewRoom />}</Container>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
