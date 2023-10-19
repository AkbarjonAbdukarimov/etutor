import { Response, Router } from "express";
import "express-async-errors";
import Req from "../../Interfaces/IReq";
import Cateory from "../../Models/Category";
import CategorySchema from "./categoryValidation";
import NotFoundError from "../../Classes/Errors/NotFoundError";
import validateAdmin from "../../middleware/validateAdmin";
const categoryRouter = Router();

categoryRouter.get("/", async (req: Req, res: Response) => {
  const cats = await Cateory.find();
  res.send(cats);
});
categoryRouter.post("/new", validateAdmin, async (req: Req, res: Response) => {
  await CategorySchema.validateAsync(req.body.category);
  const cat = Cateory.build(req.body.category);
  await cat.save();
  res.send(cat);
});
categoryRouter.get("/:id", async (req: Req, res: Response) => {
  const cat = await Cateory.findById(req.params.id);
  if (!cat) throw new NotFoundError("Category Not Found!");
  res.send(cat);
});
categoryRouter.put("/:id", validateAdmin, async (req: Req, res: Response) => {
  await CategorySchema.validateAsync(req.body.category);
  const cat = await Cateory.findByIdAndUpdate(
    req.params.id,
    req.body.category,
    { new: true }
  );
  if (!cat) throw new NotFoundError("Category Not Found!");
  res.send(cat);
});
categoryRouter.delete(
  "/:id",
  validateAdmin,
  async (req: Req, res: Response) => {
    const cat = await Cateory.findByIdAndDelete(req.params.id);
    if (!cat) throw new NotFoundError("Category Not Found!");
    res.send(cat);
  }
);
export default categoryRouter;
