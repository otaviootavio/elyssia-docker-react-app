import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { routes } from "./routes";

const app = new Elysia().use(swagger()).use(routes).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export { app };
