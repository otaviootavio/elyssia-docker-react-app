import { edenTreaty } from "@elysiajs/eden";
import { app } from "../../../api/src";

const api = edenTreaty<typeof app>(
  import.meta.env.VITE_API_PATH || "http://localhost:3000"
);

export { api };
