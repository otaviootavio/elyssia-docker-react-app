class UserAlreadyExistsOnRoom extends Error {
  constructor(public message: string) {
    super(message);
  }
}

export { UserAlreadyExistsOnRoom };
