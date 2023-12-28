import Room from "./components/Room/Room";
import Rooms from "./components/Rooms/Rooms";
import getUuidFromUrl from "./util/getUuidFromUrl";

function App() {
  const uuid = getUuidFromUrl();
  return <>{uuid ? <Room /> : <Rooms />}</>;
}

export default App;
