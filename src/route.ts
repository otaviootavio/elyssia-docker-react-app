import Elysia from "elysia";
import { roomRoutes } from "./routes/roomRoute";



const route = new Elysia().use(roomRoutes)

export { route };
