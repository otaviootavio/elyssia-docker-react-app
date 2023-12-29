import { ChakraProvider, Container } from "@chakra-ui/react";
import NewRoom from "./components/Room/NewRoom";
import Room from "./components/Room/Room";
import getUuidFromUrl from "./util/getUuidFromUrl";

function App() {
  const uuid = getUuidFromUrl();
  return (
    <ChakraProvider>
      <Container>{uuid ? <Room /> : <NewRoom />}</Container>
    </ChakraProvider>
  );
}

export default App;
