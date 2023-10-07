import { Schema } from "mongoose";

export default interface IUser {
    phone:number;
    name:string,
    email:string

    surname:string
    login:string
    password:string;
    dateOfBirth:Date
    address:{
        street:string;
        city:string;
        country:string
    }
    courses:[]
    basket:[]
}