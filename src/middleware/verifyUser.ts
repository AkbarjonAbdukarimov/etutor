import { NextFunction, Request, Response } from "express";
import BadRequestError from "../Classes/Errors/BadRequestError";
import OTP from "../Models/OTP";
import JWTDecrypter from "../utils/JWTDecrypter";
const jwtKey = process.env.JWT || "SomeJwT_keY";
interface OTPToken {
  phone: number | string;
  expiresIn: string | number | undefined;
}
export default async function verifyUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const otpToken = JWTDecrypter.decryptUser<OTPToken>(req, jwtKey);

    if (!otpToken.phone)
      throw new BadRequestError("Invalid Verification Credentials");
    const otp = await OTP.findOne({
      phone: otpToken.phone,
      isVerified: true,
    });
    if (!otp) throw new BadRequestError("User is not verified");
    next();
  } catch (error) {
    next(error);
  }
}
