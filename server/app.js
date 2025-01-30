import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import eventRoutes from "./routes/eventRoutes.js"

import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";


const app = express();
dotenv.config({
  path: "./.env",
});

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://vighno-tech-event-management-1fai-1u5kk9m7r.vercel.app",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

connectDB(process.env.MONGO_URI);
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
