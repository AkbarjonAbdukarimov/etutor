import { Request } from "express";
import ILang from "./ILanguage";
import IAdmin from "./IAdmin";
import IUser from "./IUser";
export default interface Req extends Request {
  // headers: {
  //   Authorization: string;
  // };
  body: {
    user: IUser;
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
