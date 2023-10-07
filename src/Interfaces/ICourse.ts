export default interface ICourse {
  title: string;
  decription: string;
  sections: ISection[];
  price:number
}
interface ISection {
  order: number;
  videos: IVideo[];
}
interface IVideo {
  id: string;
  link:string;
}
