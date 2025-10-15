import express, {
  type Application,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import mongoose, { model, Schema } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT: string = process.env.PORT || "3005";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/DBSpotify";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

const formSchema = new mongoose.Schema({
  name: { type: String, require: true },
  phone: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  comment: { type: String, require: true },
});

const Form = mongoose.model("Form", formSchema);
