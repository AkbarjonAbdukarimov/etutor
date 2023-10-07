import { Request } from "express";
export default interface Req extends Request {
    body: {
        code:number
        name: string;
        surname: string;
        phone:number;
        email:string;
        password: string;
        dateOfBirth: Date;
        address: {
          street: string;
          city: string;
          country: string;
        };
        

    };
  }