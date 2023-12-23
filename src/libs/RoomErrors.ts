class UserAlreadyExistsOnRoom extends Error {
  constructor(public message: string) {
    super(message);
  }
}

class RoomNotFound extends Error {
  constructor(public message: string) {
    super(message);
  }
}


export { UserAlreadyExistsOnRoom, RoomNotFound };
