import Elysia, { t } from "elysia";
import { userController } from "../controllers/userController";
import { tUsersModel } from "../models/users.model";
import { tUserModel } from "../models/user.model";

const createUserRoute = new Elysia()
  .use(tUserModel)
  .post(
    "/user",
    async ({ body }) => {
      return await userController.createUser(body.name)
    }, {
    body: t.Object({
      name: t.String()
    }),
    response: {
      201: "user",
    },
  }
  );

const getAllUsers = new Elysia()
  .use(tUsersModel)
  .get(
    "/users",
    async () => {
      return await userController.getAllUsers()
    }, {
    response: {
      201: "users",
    },
  }
  );

const getUserByUuid = new Elysia().
  get("/user/:userid",
    async ({ params: { userid } }) => {
      return await userController.getUserByUuid(userid)
    }, {
    params: t.Object({
      userid: t.String(),
    })
  })

const deleteUserById = new Elysia().
  delete("/user/:userid",
    async ({ params: { userid } }) => {
      return await userController.deleteUser(userid)
    }, {
    params: t.Object({
      userid: t.String()
    })
  })
const userRoutes = new Elysia().group("", (app) => app
  .use(createUserRoute)
  .use(getAllUsers)
  .use(getUserByUuid)
  .use(deleteUserById));

export { userRoutes };