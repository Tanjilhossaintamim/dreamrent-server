const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./src/config/database.config");
const authRouter = require("./src/routes/auth/auth");
const carRouter = require("./src/routes/car/car");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.json());

// database connection
connectToDatabase();

// routes
app.use("/auth", authRouter);
app.use("/cars", carRouter);

app.get("/", (req, res) => {
  res.send("dream car is running !");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
