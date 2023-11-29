const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./src/config/database.config");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// database connection
connectToDatabase();
app.get("/", (req, res) => {
  res.send("dream car is running !");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
