import { Request } from "express";
import ILang from "./ILanguage";
import IAdmin from "./IAdmin";
export default interface Req extends Request {
  // headers: {
  //   Authorization: string;
  // };
  body: {
    user: {
      code: number;
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
    };
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
