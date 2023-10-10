import { Request } from "express";
import ILang from "./ILanguage";
export default interface Req extends Request {
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
    category: {
      name: ILang;
      description?: ILang;
    };
  };
  params: {
    id: string;
  };
}
