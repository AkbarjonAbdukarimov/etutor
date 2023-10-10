import Joi from "joi";
import LanguageSchema from "../../Schemas/Lang";

const CategorySchema = Joi.object({
  name: LanguageSchema.required().label("Category Name"),
});
export default CategorySchema;
