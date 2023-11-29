const mongoose = require("mongoose");

const connectToDatabase = () => {
  mongoose
    .connect(process.env.URI)
    .then(() => {
      console.log("database connected !");
    })
    .catch(() => {
      console.log("database connection failed !");
    });
};
module.exports = connectToDatabase;
