import Elysia from "elysia";
import { roomRoutes } from "./routes/roomRoute";
import { userRoutes } from "./routes/userRoute";



const routes = new Elysia().use(roomRoutes).use(userRoutes)

export { routes };
