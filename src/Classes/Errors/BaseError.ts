import IError from "../../Interfaces/IError";

export default abstract class BaseError extends Error implements IError {
  constructor(public message: string, public statusCode: number = 500) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
