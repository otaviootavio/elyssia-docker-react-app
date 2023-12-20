import { PrismaClient } from "@prisma/client";
import { RoomNotFound, UserAlreadyExistsOnRoom } from "../libs/RoomErrors";

const prisma = new PrismaClient();

const createRoom = async () => {
  const newRoom = await prisma.rooms.create({
    data: {
      users: [],
    },
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
  const room = await prisma.rooms.findUnique({
    where: { uuid },
  });

  if (!room) {
    throw new RoomNotFound(`Room with id ${uuid} was not found`);
  }

  return room;
};

const getAllRooms = async () => {
  return await prisma.rooms.findMany();
};

const addUserToRoom = async (uuid: string, user: string) => {
  const room = await prisma.rooms.findUnique({
    where: { uuid },
  });

  if (!room) {
    throw new RoomNotFound(`Room with id ${uuid} was not found`);
  }

  if (room.users.includes(user)) {
    throw new UserAlreadyExistsOnRoom(
      `User ${user} already exists in the room!`
    );
  }

  await prisma.rooms.update({
    where: { uuid: uuid },
    data: {
      users: {
        set: [...room.users, user], // Assuming 'users' is a string array
      },
    },
  });
};

export { createRoom, deleteRoomById, addUserToRoom, getRoomById, getAllRooms };
