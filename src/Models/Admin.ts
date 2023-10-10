import { Document, Model, Models, Schema, model } from "mongoose";
import IUser from "../Interfaces/IUser";
import Password from "../utils/Password";
import BadRequestError from "../Classes/Errors/BadRequestError";
import IAdmin from "../Interfaces/IAdmin";

interface admin  {
  login:string;
  password:string
}
export interface AdminDoc extends Document, IAdmin {}
interface AdminModel extends Model<AdminDoc> {
  build(attrs: admin): AdminDoc;
  loginAdmin(login: string, password: string): AdminDoc;
}
const adminSchema = new Schema({
  login:{type:String, required :true},
  password:{type:String, required:true, }
});
adminSchema.statics.build = (attrs: admin): AdminDoc => {
  return new Admin(attrs);
};
adminSchema.statics.loginUser = async (login: string, password: string): Promise<AdminDoc> => {
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
adminSchema.pre("save", async function (next: Function) {
  const hash = await Password.hashPassword(this.password);
  this.password = `${hash.buff}.${hash.salt}`;
  next();
});
const Admin = model<AdminDoc, AdminModel>("Admin", adminSchema);
export default Admin;
