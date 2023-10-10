import { Document, Model, Schema, model } from "mongoose";
const languageSchema=new Schema({
    ru:String,
    eng:String,
    uz:String
},{ id: false, _id: false })
export default languageSchema