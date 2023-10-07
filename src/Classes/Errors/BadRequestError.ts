import IError from "../../Interfaces/IError";
import BaseError from "./BaseError";

export default class BadRequestError extends BaseError implements IError {
  constructor(public message: string, public statusCode: number = 400) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
