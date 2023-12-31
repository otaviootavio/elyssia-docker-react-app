import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { routes } from "./routes";
import { helmet } from 'elysia-helmet';
import { cors } from '@elysiajs/cors'

const app = new Elysia()
  .use(swagger())
  .use(cors())
  .use(helmet())
  .use(routes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export { app };
