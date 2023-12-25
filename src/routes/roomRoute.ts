import Elysia, { t } from "elysia";
import { tRoomsModel } from "./../models/rooms.model";
import { tRoomModel } from "./../models/room.model";
import {
  addUserToRoom,
  createRoom,
  deleteRoomById,
  getAllRooms,
  getRoomById,
} from "./../controllers/roomController";
import { UserAlreadyExistsOnRoom, RoomNotFound } from "./../libs/RoomErrors";
import { UserNotFound } from "./../libs/UserErrors"

const createRoomRoute = new Elysia()
  .use(tRoomsModel)
  .use(tRoomModel)
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

const getAllRoomsRoute = new Elysia()
  .use(tRoomsModel)
  .error({
    UserAlreadyExistsOnRoom,
    RoomNotFound,
  })
  .onError(({ code, error, set }) => {
    switch (code) {
      case "UserAlreadyExistsOnRoom":
        //Conflict
        set.status = 409;
        return error;
      case "RoomNotFound":
        set.status = 404;
        return error;
    }
  })
  .get(
    "/rooms",
    () => {
      return getAllRooms();
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
  .error({
    UserAlreadyExistsOnRoom,
    RoomNotFound,
  })
  .onError(({ code, error, set }) => {
    switch (code) {
      case "UserAlreadyExistsOnRoom":
        //Conflict
        set.status = 409;
        return error;
      case "RoomNotFound":
        set.status = 404;
        return error;
    }
  })
  .get(
    "/room/:roomId",
    async ({ params: { roomId } }) => {
      return await getRoomById(roomId);
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
    RoomNotFound,
    UserNotFound
  })
  .onError(({ code, error, set }) => {
    switch (code) {
      case "UserAlreadyExistsOnRoom":
        //Conflict
        set.status = 409;
        return error;
      case "RoomNotFound":
        set.status = 404;
        return error;
      case "UserNotFound":
        set.status = 404;
        return error;
    }
  })
  .put(
    "/room/:roomId/:user",
    async ({ params: { roomId, user } }) => {
      await addUserToRoom(roomId, user);
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
  .error({
    UserAlreadyExistsOnRoom,
    RoomNotFound,
  })
  .onError(({ code, error, set }) => {
    switch (code) {
      case "UserAlreadyExistsOnRoom":
        //Conflict
        set.status = 409;
        return error;
      case "RoomNotFound":
        set.status = 404;
        return error;
    }
  })
  .delete(
    "/room/:roomId",
    async ({ params: { roomId } }) => {
      await deleteRoomById(roomId);
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

const roomRoutes = new Elysia().group("", (app) =>
  app
    .use(createRoomRoute)
    .use(getAllRoomsRoute)
    .use(getRoomByIdRoute)
    .use(addUserToRoomRoute)
    .use(deleteRoomRoute)
);

export { roomRoutes };
