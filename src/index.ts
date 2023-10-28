import dotenv from "dotenv";
import app from "./app";
import mongoose from "mongoose";

dotenv.config();
const port = process.env.PORT || 3000;
const mongo = process.env.MONGO;
const mongoCloud = process.env.MONGO_CLOUD;
function startServer() {
  try {
    mongoose.connect(mongoCloud!).then(() => {
      console.log("Database connected");

      app.listen(port, () => {
        console.log(`Running on port ${port}`);
      });
    });
  } catch (error) {
    console.log(error);
  }
}
startServer();
