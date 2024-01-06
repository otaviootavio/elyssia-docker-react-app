import { Prisma, PrismaClient } from "@prisma/client";
import { NotFoundError } from "elysia";

const prisma = new PrismaClient(
  {
    log: ['query', 'info', 'warn', 'error'],
  }
);

const createRoom = async (totalSlices: number) => {
  const newRoom = await prisma.rooms.create({
    include: {
      users: true
    },
    data: { totalSlices: totalSlices },
  });
  return newRoom;
};

const deleteRoomById = async (uuid: string) => {
  await prisma.rooms.delete({
    where: { uuid },
  }).catch((e) => {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2025' || e.code === 'P2016') {
        throw new NotFoundError(`Can't find user with id ${uuid}`);
      }
    }
    throw e;
  })
};

const getRoomById = async (uuid: string) => {
  const roomWithUsers = await prisma.rooms.findUnique({
    where: { uuid: uuid },
    include: {
      users: true
    },
  });

  if (!roomWithUsers) {
    throw new NotFoundError(`Room with id ${uuid} was not found`);
  }

  return {
    uuid: roomWithUsers.uuid,
    users: roomWithUsers.users,
    totalSlices: roomWithUsers.totalSlices,
  };
};



const addUserToRoom = async (roomId: string, userId: string) => {
  const [existingUser, room] = await Promise.all([
    prisma.users.findUnique({ where: { uuid: userId } }),
    prisma.rooms.findUnique({ where: { uuid: roomId } }),
  ]);

  if (!existingUser) {
    throw new NotFoundError(`User with id ${userId} was not found`);
  }

  if (!room) {
    throw new NotFoundError(`Room with id ${roomId} was not found`);
  }

  const updatedUser = await prisma.users.update({
    where: { uuid: userId },
    data: { roomsUuid: roomId },
  });

  return updatedUser;
};

export { createRoom, deleteRoomById, addUserToRoom, getRoomById };
