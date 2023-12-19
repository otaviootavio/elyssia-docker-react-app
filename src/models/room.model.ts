import { Elysia, t } from "elysia";

export const tRoomModel = new Elysia().model({
  room: t.Object({
    uuid: t.String(),
    users: t.Array(t.String()),
  }),
});
