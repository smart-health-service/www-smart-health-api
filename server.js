const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
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
