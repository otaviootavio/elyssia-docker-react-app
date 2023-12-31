import { Elysia, t } from "elysia";

export const tRoomsModel = new Elysia().model({
  rooms: t.Array(
    t.Object({
      uuid: t.String(),
      users: t.Array(t.String()),
      totalSlices: t.Integer()
    })
  ),
});
