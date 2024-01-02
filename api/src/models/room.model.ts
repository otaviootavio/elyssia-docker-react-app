import { Elysia, t } from "elysia";

export const tRoomModel = new Elysia().model({
  room: t.Object({
    uuid: t.String(),
    users: t.Array(t.Object({
      uuid: t.String(),
      name: t.String(),
      slicesEaten: t.Integer(),
    })),
    totalSlices: t.Integer()
  }),
});
