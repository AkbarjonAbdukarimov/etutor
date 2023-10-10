import { Document, Model, Schema, model } from "mongoose";
import ICategory from "../Interfaces/ICategory";
import languageSchema from "./LanguageSchema";
import ILang from "../Interfaces/ILanguage";

interface category {
  name: ILang;
  description?: ILang;
}
interface CategoryDoc extends Document, ICategory {}
export interface CategoryModel extends Model<CategoryDoc> {
  build(attrs: category): CategoryDoc;
}
const categorySchema = new Schema({
  name: { type: languageSchema, required: true },
  description: languageSchema,
});
categorySchema.statics.build = (attrs: category): CategoryDoc => {
  return new Cateory(attrs);
};

const Cateory = model<CategoryDoc, CategoryModel>("Category", categorySchema);
export default Cateory;
