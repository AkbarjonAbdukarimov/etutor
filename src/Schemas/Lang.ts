import Joi from "joi";

const LanguageSchema = Joi.object({
  ru: Joi.string(),
  uz: Joi.string(),
  eng: Joi.string(),
}).min(1);

export default LanguageSchema;
