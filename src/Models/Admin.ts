import { Document, Model, Schema, model } from "mongoose";
import Password from "../utils/Password";
import BadRequestError from "../Classes/Errors/BadRequestError";
import IAdmin from "../Interfaces/IAdmin";
import AdminSchema from "../routes/admins/adminValidation";

interface admin {
  login: string;
  password: string;
}
export interface AdminDoc extends Document, IAdmin {}
interface AdminModel extends Model<AdminDoc> {
  build(attrs: admin): Promise<AdminDoc>;
  loginAdmin(login: string, password: string): Promise<AdminDoc>;
}
const adminSchema = new Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
});
adminSchema.statics.build = async (attrs: admin): Promise<AdminDoc> => {
  await AdminSchema.validateAsync(attrs);
  const hash = await Password.hashPassword(attrs.password);
  const admin = await Admin.create({
    ...attrs,
    password: `${hash.buff}.${hash.salt}`,
  });
  return admin;
};
adminSchema.statics.loginAdmin = async (
  login: string,
  password: string
): Promise<AdminDoc> => {
  await AdminSchema.validateAsync({ login, password });
  const admin = await Admin.findOne({ login });
  const isValidPass =
    admin &&
    (await Password.compare(password, {
      buff: admin.password.split(".")[0],
      salt: admin.password.split(".")[1],
    }));
  if (!admin || !isValidPass) throw new BadRequestError("Invalid Credentials");

  return admin;
};
adminSchema.pre("findOneAndUpdate", async function () {
  const docToUpdate = await this.model.findOne(this.getQuery());
  const hash = await Password.hashPassword(docToUpdate.password);

  const newPass = `${hash.buff}.${hash.salt}`;
  this.set({ password: newPass });
});

const Admin = model<AdminDoc, AdminModel>("Admin", adminSchema);
export default Admin;
