import { UserAlreadyExistsOnRoom } from "../libs/RoomErrors";

class RoomModel {
  uuid: string;
  users: string[];

  constructor() {
    this.uuid = crypto.randomUUID();
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
