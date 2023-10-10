import Joi from "joi";

const AdminSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required().min(8).max(36),
});
export default AdminSchema;
