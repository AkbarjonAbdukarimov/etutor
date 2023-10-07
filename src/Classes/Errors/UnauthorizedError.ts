import IError from "../../Interfaces/IError";
import BaseError from "./BaseError";

export default class UnauthorizedError extends BaseError implements IError {
  constructor(public message: string, public statusCode: number = 401) {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
