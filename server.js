import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//connecting DB
connectDB();

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, console.log(`Server running  on port ${PORT}`.yellow.bold));
