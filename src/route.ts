import Elysia, { t } from "elysia";
import { tRoomsModel } from "./models/rooms.model";
import { tRoomModel } from "./models/room.model";
import {
  addUserToRoom,
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
} from "./controllers/roomController";
import { UserAlreadyExistsOnRoom } from "./libs/RoomErrors";
import { NotFoundError } from "elysia";

const createRoomRoute = new Elysia()
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
    () => {
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
  );

const getRoomRoute = new Elysia().use(tRoomsModel).get(
  "/rooms",
  () => {
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
);

const getRoomByIdRoute = new Elysia()
  .use(tRoomModel)
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
  );
const addUserToRoomRoute = new Elysia()
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
  );

const deleteRoomRoute = new Elysia()
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

const roomRoutes = new Elysia()
  .use(createRoomRoute)
  .use(getRoomRoute)
  .use(getRoomByIdRoute)
  .use(addUserToRoomRoute)
  .use(deleteRoomRoute);

export { roomRoutes };
