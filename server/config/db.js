const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Connected to db ${connection.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.log(error.message.red.bold);
  }
};

module.exports = connectDB;
