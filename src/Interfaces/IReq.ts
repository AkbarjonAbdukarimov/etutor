import { Request } from "express";
import ILang from "./ILanguage";
import IAdmin from "./IAdmin";
import IUser from "./IUser";
interface Iuser extends IUser {
  code: string;
}
export default interface Req extends Request {
  // headers: {
  //   Authorization: string;
  // };
  body: {
    user: Iuser;
    admin: IAdmin;
    category: {
      name: ILang;
      description?: ILang;
    };
  };
  params: {
    id: string;
  };
}
