import { Response, Router } from "express";
import "express-async-errors";
import Req from "../../Interfaces/IReq";
import Admin, { AdminDoc } from "../../Models/Admin";
import validateAdmin from "../../middleware/validateAdmin";
const adminRouter = Router();
const jwtKey = process.env.ADMIN_JWT || "someKEy";
import jwt from "jsonwebtoken";
import AdminSchema from "./adminValidation";
import JWTDecrypter from "../../utils/JWTDecrypter";
import NotFoundError from "../../Classes/Errors/NotFoundError";
adminRouter.get("/", validateAdmin, async (req: Req, res: Response) => {
  const admins = await Admin.find({}, { password: 0 });
  res.send(admins || []);
});
adminRouter.post("/new", validateAdmin, async (req: Req, res: Response) => {
  const { _id, login } = await Admin.build(req.body.admin);
  res.send({ _id, login });
});
adminRouter.post("/login", async (req: Req, res: Response) => {
  const { login, password } = req.body.admin;
  const admin = await Admin.loginAdmin(login, password);
  const token = jwt.sign(
    {
      _id: admin._id,
      login: admin.login,
    },
    jwtKey
  );
  res.send({ _id: admin._id, login: admin.login, token });
});
adminRouter.put("/edit", validateAdmin, async (req: Req, res: Response) => {
  await AdminSchema.validateAsync(req.body.admin);
  const { login, password } = req.body.admin;
  const admin = await JWTDecrypter.decryptUser<AdminDoc>(req, jwtKey);
  const updated = await Admin.findByIdAndUpdate(
    admin._id,
    { login, password },
    { new: true }
  );
  if (!updated) throw new NotFoundError("Admin Not Found");
  const token = jwt.sign(
    {
      _id: updated._id,
      login: updated.login,
    },
    jwtKey
  );
  res.send({ _id: updated._id, login: updated.login, token });
});

export default adminRouter;
