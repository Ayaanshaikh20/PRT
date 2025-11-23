const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/feedbackdb");
    console.log('MongoDB connected successfully!!');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};

module.exports = dbConnect;