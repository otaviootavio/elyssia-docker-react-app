import { PrismaClient, users } from "@prisma/client";
import { UserNotFound } from "../libs/UserErrors";

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
    const user = await prisma.users.findUnique({
      where: { uuid },
    });

    if (!user) {
      throw new UserNotFound(`User with id ${uuid} was not found`);
    }

    await prisma.users.delete({
      where: { uuid },
    });
  },
  // updateUser: async () => {
  // },
  getUserByUuid: async (uuid: string): Promise<users> => {
    const user = await prisma.users.findUnique({ where: { uuid } })

    if (!user) {
      throw new UserNotFound(`User with id ${uuid} was not found`);
    }

    return user
  },
  getAllUsers: async (): Promise<users[]> => {
    const allUsers: users[] = await prisma.users.findMany();
    return allUsers;
  }
};

export { userController };
