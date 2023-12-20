import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import {
  addUserToRoom,
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
} from "./controllers/roomController";
import { tRoomModel } from "./models/room.model";
import { tRoomsModel } from "./models/rooms.model";
import {
  addUserToRoomRoute,
  createRoomRoute,
  deleteRoomRoute,
  getRoomByIdRoute,
  getRoomRoute,
} from "./route";

const app = new Elysia()
  .use(tRoomsModel)
  .use(tRoomModel)
  .use(swagger())
  .use(createRoomRoute)
  .use(getRoomRoute)
  .use(getRoomByIdRoute)
  .use(addUserToRoomRoute)
  .use(deleteRoomRoute);

app.listen(3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export { app };
