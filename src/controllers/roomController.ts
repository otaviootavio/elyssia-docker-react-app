import { PrismaClient } from "@prisma/client";
import { RoomNotFound, UserAlreadyExistsOnRoom } from "../libs/RoomErrors";
import { UserNotFound } from "../libs/UserErrors";

const prisma = new PrismaClient();

const createRoom = async () => {
  const newRoom = await prisma.rooms.create({
    include: {
      users: true
    },
    data: {},
  });
  return newRoom;
};

const deleteRoomById = async (uuid: string) => {
  const room = await prisma.rooms.findUnique({
    where: { uuid },
  });

  if (!room) {
    throw new RoomNotFound(`Room with id ${uuid} was not found`);
  }

  await prisma.rooms.delete({
    where: { uuid },
  });
};

const getRoomById = async (uuid: string) => {
  const roomWithUsers = await prisma.rooms.findUnique({
    where: { uuid },
    include: {
      users: true, // Include the users in each room
    },
  });

  if (!roomWithUsers) {
    throw new RoomNotFound(`Room with id ${uuid} was not found`);
  }

  return {
    uuid: roomWithUsers.uuid,
    users: roomWithUsers.users.map(user => user.uuid),
  };
};

const getAllRooms = async () => {
  return await prisma.rooms.findMany();
};

const addUserToRoom = async (roomId: string, userId: string) => {

  const existingUser = await prisma.users.findFirst({
    where: {
      uuid: userId
    },
  });

  if (!existingUser) {
    throw new UserNotFound(`User with id ${userId} was not found`);
  }

  const room = await prisma.rooms.findUnique({
    where: { uuid: roomId },
  });

  if (!room) {
    throw new RoomNotFound(`Room with id ${roomId} was not found`);
  }

  const existingAssociation = await prisma.users.findFirst({
    where: {
      uuid: userId,
      roomsUuid: roomId,
    },
  });

  if (existingAssociation) {
    throw new UserAlreadyExistsOnRoom("User is already in the room");
  }

  const updatedUser = await prisma.users.update({
    where: { uuid: userId },
    data: { roomsUuid: roomId },
  });

  return updatedUser;

};

export { createRoom, deleteRoomById, addUserToRoom, getRoomById, getAllRooms };
