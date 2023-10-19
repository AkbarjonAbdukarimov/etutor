import { Document, Model, Schema, model } from "mongoose";
import ICategory from "../Interfaces/ICategory";
import languageSchema from "./LanguageSchema";
import ILang from "../Interfaces/ILanguage";
import ICourse from "../Interfaces/ICourse";
import { number } from "joi";

interface course extends ICourse {}
interface CourseDoc extends Document, ICourse {}
export interface CourseModel extends Model<CourseDoc> {
  build(attrs: course): CourseDoc;
}
const videoSchema = new Schema({
  link: { type: String, required: true },
});
const sectioSchema = new Schema(
  {
    order: { type: Number, required: true },
    subtitle: { type: languageSchema, required: true },
    videos: [videoSchema],
  },
  { id: false, _id: false }
);

const courseSchema = new Schema({
  title: { type: languageSchema, required: true },
  description: languageSchema,
  sections: { type: [sectioSchema] },
});

courseSchema.statics.build = (attrs: course): CourseDoc => {
  return new Course(attrs);
};

const Course = model<CourseDoc, CourseModel>("Course", courseSchema);
export default Course;
