import Elysia, { t } from "elysia";
import { tRoomsModel } from "./../models/rooms.model";
import { tRoomModel } from "./../models/room.model";
import {
  addUserToRoom,
  createRoom,
  deleteRoomById,
  getRoomById,
} from "./../controllers/roomController";
import { tUserModel } from "../models/user.model";

const createRoomRoute = new Elysia()
  .use(tRoomsModel)
  .use(tRoomModel)
  .post(
    "/room",
    ({ body }) => {
      return createRoom(body.totalSlices);
    },
    {
      body: t.Object({
        totalSlices: t.Number()
      }),
      afterHandle: ({ set }) => {
        set.status = "Created";
      },
      response: {
        201: "room",
      },
    }
  );


const getRoomByIdRoute = new Elysia()
  .use(tRoomModel)
  .onError(({ code, error, set }) => {
    switch (code) {
      case "NOT_FOUND":
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
  .use(tUserModel)
  .onError(({ code, error, set }) => {
    switch (code) {
      case "NOT_FOUND":
        set.status = 404;
        return error;
    }
  })
  .put(
    "/room/:roomId/:user",
    async ({ params: { roomId, user } }) => {
      return await addUserToRoom(roomId, user);
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
        201: "user",
      },
    }
  );

const deleteRoomRoute = new Elysia()
  .delete(
    "/room/:roomId",
    async ({ params: { roomId } }) => {
      await deleteRoomById(roomId);
    },
    {
      params: t.Object({
        roomId: t.String(),
      })
    }
  );

const roomRoutes = new Elysia().group("", (app) =>
  app
    .use(createRoomRoute)
    .use(getRoomByIdRoute)
    .use(addUserToRoomRoute)
    .use(deleteRoomRoute)
);

export { roomRoutes };
