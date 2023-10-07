import { Document, Model, Models, Schema, model } from "mongoose";
import IUser from "../Interfaces/IUser";
import Password from "../utils/Password";
import BadRequestError from "../Classes/Errors/BadRequestError";

interface user {
  name: string;
  surname: string;
  phone: number;
  email: string;
  password: string;
  dateOfBirth: Date;
  address: {
    street: string;
    city: string;
    country: string;
  };
  courses?: [];
}
interface UserDoc extends Document, IUser {}
interface UserModel extends Model<UserDoc> {
  build(attrs: user): UserDoc;
  loginUser(phone: number, password: string): UserDoc;
}
const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  address: {
    type: {
      street: String,
      city: String,
      country: String,
    },
    required: true,
  },
  //basket:[{type:Schema.Types.ObjectId, ref:Product}]
});
userSchema.statics.build = (attrs: user): UserDoc => {
  return new User(attrs);
};
userSchema.statics.loginUser = async (phone: number, password: string): UserDoc => {
  const user = await User.findOne({ phone });
  const isValidPass =
    user &&
    (await Password.compare(password, {
      buff: user.password.split(".")[0],
      salt: user.password.split(".")[1],
    }));
  if (!user || !isValidPass) throw new BadRequestError("Invalid Credentials");

  return user;
};
userSchema.pre("save", async function (next: Function) {
  const hash = await Password.hashPassword(this.password);
  this.password = `${hash.buff}.${hash.salt}`;
  next();
});
const User = model<UserDoc, UserModel>("User", userSchema);
export default User;
