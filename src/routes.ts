import Elysia from "elysia";
import { roomRoutes } from "./routes/roomRoute";



const routes = new Elysia().use(roomRoutes)

export { routes };
