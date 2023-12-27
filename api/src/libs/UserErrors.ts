class UserNotFound extends Error {
  constructor(public message: string) {
    super(message);
  }
}


export { UserNotFound };
