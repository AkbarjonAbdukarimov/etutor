import { NextFunction, Request, Response } from "express";
import JWTDecrypter from "../utils/JWTDecrypter";
const jwtKey = process.env.ADMIN_JWT || "someKEy";

export default function validateAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  JWTDecrypter.decryptUser(req, jwtKey);
  next();
}
