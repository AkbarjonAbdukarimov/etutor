import express, { NextFunction, Response } from "express";
import "express-async-errors";
import cors from "cors";
const app = express();
app.use(cors({ origin: "*" }));
import userRouter from "./routes/users/userRoute";
import NotFoundError from "./Classes/Errors/NotFoundError";
import IError from "./Interfaces/IError";
import categoryRouter from "./routes/categories/categoryRoute";
import adminRouter from "./routes/admins/adminRoutes";
import Req from "./Interfaces/IReq";
import courseRoute from "./routes/courses/courseRoute";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use("/api/users", userRouter);
app.use("/api/admins", adminRouter);
app.use("/api/courses", courseRoute);
app.use("/api/categories", categoryRouter);
app.all("*", (req, res) => {
  throw new NotFoundError("Page Not Found");
});
app.use((err: IError, req: Req, res: Response, next: NextFunction): void => {
  console.log(err);
  console.log(err.stack);
  console.log("---------------------");
  res.status(err.statusCode || 500).send({ message: err.message });
});

export default app;
