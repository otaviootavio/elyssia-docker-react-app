import { hash } from "bun";
import { UserAlreadyExistsOnRoom } from "../libs/RoomErrors";

class RoomModel {
  uuid: string;
  users: string[];

  constructor() {
    this.uuid = hash(Date.now().toString()).toString();
    this.users = [];
  }

  addUser = (user: string) => {
    if (this.userExists(user))
      throw new UserAlreadyExistsOnRoom(`User ${user} already exists on room!`);

    this.users.push(user);
  };

  userExists = (user: string): boolean => {
    return this.users.indexOf(user) >= 0;
  };
}

export { RoomModel };
