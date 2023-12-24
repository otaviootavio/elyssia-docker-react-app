import { PrismaClient, users } from "@prisma/client";

const prisma = new PrismaClient();

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
    });
  },
  // updateUser: async () => {
  // },
  getUserByUuid: async (uuid: string): Promise<users> => {
    const user: users = await prisma.users.findUniqueOrThrow({ where: { uuid } })
    return user
  },
  getAllUsers: async (): Promise<users[]> => {
    const allUsers: users[] = await prisma.users.findMany();
    return allUsers;
  }
};

export { userController };
