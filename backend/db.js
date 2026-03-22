const mongoose = require("mongoose");

const DB_URL = require("./config");

async function connectDB() {
  try {
    await mongoose.connect(DB_URL);
    console.log(`MongoDB connected successfully`);
  } catch (err) {
    console.log(`MongoDB connectioin error ${err}`);
  }
}
connectDB();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
