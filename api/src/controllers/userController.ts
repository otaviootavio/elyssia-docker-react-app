import { Prisma, PrismaClient, users } from "@prisma/client";
import { NotFoundError } from "elysia";

const prisma = new PrismaClient(
  {
    log: ['query', 'info', 'warn', 'error'],
  }
);

const userController = {
  createUser: async (name: string): Promise<users> => {
    const newUser = await prisma.users.create({
      data: {
        name: name
      }
    })
    return newUser;
  },
  deleteUser: async (uuid: string) => {
    await prisma.users.delete({
      where: { uuid },
    }).catch((e) => {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025' || e.code === 'P2016') {
          throw new NotFoundError(`Can't find user with id ${uuid}`);
        }
      }
      throw e;
    })
  },

  getUserByUuid: async (uuid: string): Promise<users> => {
    const user = await prisma.users.findUnique({ where: { uuid } })

    if (!user) {
      throw new NotFoundError(`User with id ${uuid} was not found`);
    }

    return user
  },

  addPizzaToUser: async (userId: string, slicesEaten: number) => {
    const user = await prisma.users.update({
      where: { uuid: userId },
      data: { slicesEaten: slicesEaten }
    })
    return
  }
};

export { userController };
