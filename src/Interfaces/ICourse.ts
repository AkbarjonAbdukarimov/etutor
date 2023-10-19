import ILang from "./ILanguage";

export default interface ICourse {
  title: ILang;
  decription: ILang;
  sections: ISection[];
  price: number;
}
interface ISection {
  order: number;
  subtitle: ILang;
  videos: IVideo[];
}
interface IVideo {
  _id: string;
  link: string;
}
