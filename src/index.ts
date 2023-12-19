import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import {
  addUserToRoom,
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
} from "./controllers/roomController";
import { RoomModel } from "./models/RoomModel";
import { UserAlreadyExistsOnRoom } from "./libs/RoomErrors";
import { NotFoundError } from "elysia";
import { tRoomModel } from "./models/room.model";
import { tRoomsModel } from "./models/rooms.model";

const app = new Elysia()
  .use(swagger())
  .use(tRoomsModel)
  .use(tRoomModel)
  .onError(({ code, error, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;

      return error.message;
    }
  })
  .post(
    "/room",
    (): RoomModel => {
      return createRoom();
    },
    {
      afterHandle: ({ set }) => {
        set.status = "Created";
      },
      response: {
        201: "room",
      },
    }
  )
  .get(
    "/rooms",
    (): RoomModel[] => {
      return getRooms();
    },
    {
      afterHandle: ({ set }) => {
        set.status = "Created";
      },
      response: {
        201: "rooms",
      },
    }
  )
  .onError(({ code, error, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;
      return error.message;
    }
  })
  .get(
    "/room/:roomId",
    ({ params: { roomId } }) => {
      return getRoom(roomId);
    },
    {
      params: t.Object({
        roomId: t.String(),
      }),
      response: {
        200: "room",
      },
    }
  )
  .error({
    UserAlreadyExistsOnRoom,
    NotFoundError,
  })
  .onError(({ code, error, set }) => {
    switch (code) {
      case "UserAlreadyExistsOnRoom":
        //Conflict
        set.status = 409;
        return error;
      case "NotFoundError":
        set.status = "Not Found";
        return error;
    }
  })
  .put(
    "/room/:roomId/:user",
    ({ params: { roomId, user } }) => {
      addUserToRoom(roomId, user);
    },
    {
      params: t.Object({
        roomId: t.String(),
        user: t.String(),
      }),
      afterHandle: ({ set }) => {
        set.status = "Created";
      },
      response: {
        201: t.Void(),
      },
    }
  )
  .onError(({ code, error, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;

      return error.message;
    }
  })
  .delete(
    "/room/:roomId",
    ({ params: { roomId } }) => {
      deleteRoom(roomId);
    },
    {
      params: t.Object({
        roomId: t.String(),
      }),
      afterHandle: ({ set }) => {
        set.status = "Created";
      },
      response: {
        201: t.Void(),
      },
    }
  );

app.listen(3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export { app };
