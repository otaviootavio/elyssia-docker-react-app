import NewRoom from "./components/Room/NewRoom";
import Room from "./components/Room/Room";
import getUuidFromUrl from "./util/getUuidFromUrl";

function App() {
  const uuid = getUuidFromUrl();
  return <>{uuid ? <Room /> : <NewRoom />}</>;
}

export default App;
