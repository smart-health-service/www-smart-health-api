const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./server/config/db");
const {
  notFound,
  errorHandler,
} = require("./server/middleware/errorMiddleware");
const userRoutes = require("./server/routes/userRoutes");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//connecting DB
connectDB();

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use(".server/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, console.log(`Server running  on port ${PORT}`.yellow.bold));
