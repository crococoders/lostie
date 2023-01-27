interface Error {
  message: string;
}

export abstract class UseCaseError implements Error {
  public readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}
