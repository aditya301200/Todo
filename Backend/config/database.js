const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log(`Connected to database`);
    })
    .catch((err) => {
      console.log(`Error connecting to database: ${err}`);
      process.exit(1);
    });
};

module.exports = dbConnect;
