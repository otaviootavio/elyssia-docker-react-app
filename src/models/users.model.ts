import { Elysia, t } from "elysia";

export const tUsersModel = new Elysia().model({
  users: t.Array(
    t.Object({
      uuid: t.String(),
      name: t.String(),
    }),)
});
