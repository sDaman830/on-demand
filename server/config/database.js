// config/database.js

const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect("", {
      useNewUrlParser: true,
    });
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
};

module.exports = { dbConnect };
