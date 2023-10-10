import Joi from "joi";

const UserSchema = Joi.object({
  phone: Joi.string().length(9).required(),
  name: Joi.string().required(),
  email: Joi.string().required(),

  surname: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required().min(8).max(36),
  dateOfBirth: Joi.date(),
  address: {
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
  },
});
export default UserSchema;
