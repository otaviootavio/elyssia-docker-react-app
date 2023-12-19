import { NotFoundError } from "elysia";
import { RoomModel } from "../models/RoomModel";

let roomArray: RoomModel[] = [];

const createRoom = () => {
  const newRoom = new RoomModel();
  roomArray.push(newRoom);
  return newRoom;
};

const deleteRoom = (uuid: string) => {
  const room: RoomModel | undefined = roomArray.find(
    (room) => room.uuid === uuid
  );

  if (!room) {
    throw new NotFoundError(`Room with id ${uuid} was not found`);
  }

  roomArray = roomArray.filter((room) => room.uuid !== uuid);
};

const getRoom = (uuid: string) => {
  const room: RoomModel | undefined = roomArray.find(
    (room) => room.uuid === uuid
  );

  if (!room) {
    throw new NotFoundError(`Room with id ${uuid} was not found`);
  }

  return { uuid: room.uuid, users: room.users };
};

const getRooms = (): RoomModel[] => {
  return roomArray;
};

const addUserToRoom = (uuid: string, user: string) => {
  const room: RoomModel | undefined = roomArray.find(
    (room) => room.uuid === uuid
  );

  if (!room) {
    throw new NotFoundError(`Room with id ${uuid} was not found`);
  }

  room.addUser(user);
};

export { createRoom, deleteRoom, addUserToRoom, getRoom, getRooms };
