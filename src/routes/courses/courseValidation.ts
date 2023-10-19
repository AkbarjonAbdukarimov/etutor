import Joi from "joi";
import LanguageSchema from "../../Schemas/Lang";

const CourseSchema = Joi.object({
  name: LanguageSchema.required().label("Category Name"),
});
export default CourseSchema;
