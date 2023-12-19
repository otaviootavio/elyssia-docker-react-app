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

const app = new Elysia();

app.use(swagger());

app.all("/", () => "Landing");

app
  .onError(({ code, error, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;

      return error.message;
    }
  })
  .post(
    "/room",
    (): string => {
      return createRoom();
    },
    {
      afterHandle: ({ set }) => {
        set.status = "Created";
      },
    }
  )
  .get(
    "/rooms",
    (): RoomModel[] => {
      return getRooms();
    },
    {}
  )
  .onError(({ code, error, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;

      return error.message;
    }
  })
  .get(
    "/room/:roomId",
    ({ params: { roomId } }): RoomModel => {
      return getRoom(roomId);
    },
    {
      params: t.Object({
        roomId: t.String(),
      }),
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
    }
  );

app.listen(8080);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
