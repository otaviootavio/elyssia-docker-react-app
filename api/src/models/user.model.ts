import { Elysia, t } from "elysia";

export const tUserModel = new Elysia().model({
  user: t.Object({
    uuid: t.String(),
    name: t.String(),
  }),
});
