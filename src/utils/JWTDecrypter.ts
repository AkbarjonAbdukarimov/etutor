import { Request } from "express";

import jwt from "jsonwebtoken";
import UnauthorizedError from "../Classes/Errors/UnauthorizedError";
import ForbidenError from "../Classes/Errors/ForbiddenError";

export default class JWTDecrypter {
  static decryptUser<T>(req: Request, jwtKey: string): T {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new UnauthorizedError("User Unathorised");
    try {
      const validatedUser = jwt.verify(authHeader, jwtKey) as T;
      return validatedUser;
    } catch (error) {
      console.log(error);
      throw new ForbidenError("Invalid User Signature");
    }
  }
}
