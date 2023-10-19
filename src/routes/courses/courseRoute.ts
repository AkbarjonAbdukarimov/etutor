import { Router } from "express";
import NotFoundError from "../../Classes/Errors/NotFoundError";
const courseRoute = Router();

courseRoute.get("/", (req, res) => {
  throw new NotFoundError("Test not found");
});
export default courseRoute;
