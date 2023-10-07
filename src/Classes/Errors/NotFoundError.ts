import IError from "../../Interfaces/IError";
import BaseError from "./BaseError";

export default class NotFoundError extends BaseError implements IError {
  constructor(public message: string="Not Found!", public statusCode: number = 404) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
