import IError from "../../Interfaces/IError";
import BaseError from "./BaseError";

export default class ForbidenError extends BaseError implements IError {
  constructor(public message: string="Access Denied!", public statusCode: number = 403) {
    super(message);
    Object.setPrototypeOf(this, ForbidenError.prototype);
  }
}
