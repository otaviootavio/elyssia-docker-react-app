import Elysia, { t } from "elysia";
import { userController } from "../controllers/userController";
import { tUsersModel } from "../models/users.model";
import { tUserModel } from "../models/user.model";
import { UserNotFound } from "./../libs/UserErrors"

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

const addPizzaToUser = new Elysia()
  .use(tUserModel)
  .post(
    "/user/pizza",
    async ({ body }) => {
      return await userController.addPizzaToUser(body.userId, body.slicesEaten)
    }, {
    body: t.Object({
      userId: t.String(),
      slicesEaten: t.Number()
    }),
    afterHandle: ({ set }) => {
      set.status = 201;
    },
    response: {
      201: t.Void(),
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

const getUserByUuid = new Elysia()
  .use(tUserModel)
  .error({ UserNotFound })
  .onError(({ code, error, set }) => {
    switch (code) {
      case "UserNotFound":
        set.status = 404;
        return error;
    }
  })
  .get("/user/:userid",
    async ({ params: { userid } }) => {
      return await userController.getUserByUuid(userid)
    }, {
    params: t.Object({
      userid: t.String(),
    }),
    afterHandle: ({ set }) => {
      set.status = 201;
    },
    response: {
      201: 'user',
    }
  })

const deleteUserById = new Elysia()
  .error({ UserNotFound })
  .onError(({ code, error, set }) => {
    switch (code) {
      case "UserNotFound":
        set.status = 404;
        return error;
    }
  })
  .delete("/user/:userid",
    async ({ params: { userid } }) => {
      await userController.deleteUser(userid)
    }, {
    params: t.Object({
      userid: t.String()
    }),
    afterHandle: ({ set }) => {
      set.status = "OK";
    },
    response: {
      200: t.Void(),
    },
  })
const userRoutes = new Elysia().group("", (app) => app
  .use(createUserRoute)
  .use(getAllUsers)
  .use(getUserByUuid)
  .use(deleteUserById)
  .use(addPizzaToUser));

export { userRoutes };