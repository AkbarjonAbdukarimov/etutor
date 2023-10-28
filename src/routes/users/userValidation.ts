import Joi from "joi";
import IUser from "../../Interfaces/IUser";

const UserSchema = Joi.object({
  phone: Joi.string().length(12).required(),
  name: Joi.string().required(),
  email: Joi.string().required(),

  surname: Joi.string().required(),
  //login: Joi.string().required(),
  password: Joi.string().required().min(8).max(36),
  dateOfBirth: Joi.date(),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
});
export default UserSchema;
