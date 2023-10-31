import { Request, Response, Router } from "express";
//import "express-async-errors";
import OTP from "../../Models/OTP";
import BadRequestError from "../../Classes/Errors/BadRequestError";
import jwt from "jsonwebtoken";
import Req from "../../Interfaces/IReq";
import User from "../../Models/User";
import IUserPayload from "../../Interfaces/IUserPayload";
import verifyUser from "../../middleware/verifyUser";
import JWTDecrypter from "../../utils/JWTDecrypter";
import Password from "../../utils/Password";
import validateUser from "../../middleware/validateUser";
import NotFoundError from "../../Classes/Errors/NotFoundError";
import UserSchema from "./userValidation";
const userRouter = Router();
const expiresAt = parseInt(process.env.EXPIRATION || "5");
const jwtKey = process.env.JWT || "SomeJwT_keY";

userRouter.post("/get-code", async (req: Req, res: Response) => {
  const { phone } = req.body.user;
  var code = "0000" || Math.floor(1000 + Math.random() * 9000).toString();
  const existingUserOPT = await OTP.findOneAndUpdate(
    { phone },
    { code, expiresAt: new Date(Date.now() + expiresAt * 60 * 1000) }
  );
  if (!existingUserOPT) {
    const opt = OTP.build({
      phone,
      code,
      expiresAt: new Date(Date.now() + expiresAt * 60 * 1000),
      isVerified: false,
    });
    //handle opt sending
    await opt.save();
  }
  res.send({ message: `One Time Password was send to ${phone}` });
});
userRouter.put("/verify", async (req: Req, res: Response) => {
  const { phone, code } = req.body.user;
  const opt = await OTP.findOne({ phone, code });
  if (!opt) throw new BadRequestError("Invalid Verification Credentials");

  if (!opt.expiresAt || opt.expiresAt.getTime() < Date.now())
    throw new BadRequestError("Verification Code Expired");
  opt.isVerified = true;
  //@ts-ignore
  opt.expiresAt = null;
  await opt.save();
  const token = jwt.sign(
    {
      phone,
      expiresIn: Date.now() + parseInt(process.env.EXPIRATION || "5") * 60000,
    },
    jwtKey,
    {
      expiresIn: Date.now() + parseInt(process.env.EXPIRATION || "5") * 60000,
    }
  );
  res.send({ message: `User with ${phone} is verified`, token });
});
userRouter.post(
  "/register",

  async (req: Req, res: Response) => {
    const { name, surname, phone, email, password, dateOfBirth, address } =
      req.body.user;
    const author = JWTDecrypter.decryptUser<IUserPayload>(req, jwtKey);

    if (author.expiresIn && author.expiresIn < Date.now())
      throw new BadRequestError("Token expired");
    const otp = await OTP.findOne({
      phone,
      isVerified: true,
    });

    if (!otp) throw new BadRequestError("User is not verified");
    if (password.length < 4)
      throw new BadRequestError("Password Should Contain 8 to 20 Symbols");
    const existingUser = await User.findOne({ phone, email });

    if (existingUser)
      throw new BadRequestError(
        `User with ${phone} and ${email} already exists`
      );

    let user = await User.build({
      name,
      surname,
      phone,
      email,
      password,
      dateOfBirth,
      address,
    });
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        phone: user.phone,
        name: user.name,
        surname: user.surname,
      },
      jwtKey
    );

    res.send({
      _id: user._id,
      phone: user.phone,
      name: user.name,
      surname: user.surname,
      address: user.address,
      email: user.email,
      token,
    });
  }
);

userRouter.post(
  "/login",

  async (req: Req, res: Response) => {
    const { phone, password } = req.body.user;

    const otp = await OTP.findOne({
      phone,
      isVerified: true,
    });

    if (!otp) throw new BadRequestError("User is not verified");
    const user = await User.loginUser(phone, password);

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        surname: user.surname,
        phone: user.phone,
        email: user.email,
      },
      jwtKey
    );
    let u = { ...user.toObject() };
    delete u.password;

    res.send({
      ...u,
      token,
    });
  }
);
userRouter.put(
  "/update",

  verifyUser,

  async (req: Req, res: Response) => {
    const author = JWTDecrypter.decryptUser<IUserPayload>(req, jwtKey);

    if (author.exp && author.exp < Date.now())
      throw new BadRequestError("Token expired");

    let query = {};
    if (author._id) {
      query = { ...query, _id: author._id };
    }
    if (author.phone) {
      query = { ...query, phone: author.phone };
    }

    const user = await User.findOneAndUpdate(query, req.body.user, {
      new: true,
    });
    console.log(user);
    if (!user) throw new NotFoundError("User Not Found");
    res.send(user);
  }
);

userRouter.get(
  "/current",
  validateUser,
  async (req: Request, res: Response) => {
    const author = JWTDecrypter.decryptUser<IUserPayload>(req, jwtKey);
    const user = await User.findById(author._id, { password: 0 });

    // .populate({
    //   path: "basket",
    //   model: "Product",
    //   populate: [
    //     {
    //       path: "category",
    //       model: "Category",
    //       select: "id name",
    //     },
    //     {
    //       path: "subcategory",
    //       model: "Subcategory",
    //       select: "id name",
    //     },
    //     {
    //       path: "vendorId",
    //       model: "Vendor",
    //       select: "id name description contacts",
    //     },
    //   ],
    // });
    res.send(user);
  }
);

export default userRouter;
