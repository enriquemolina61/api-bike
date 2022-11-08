const mongoose = require('mongoose');

const connectToDatabase = () => {
  mongoose
    .connect(
      'mongodb+srv://apibike:apibike123@apibike.oboy4ou.mongodb.net/?retryWrites=true&w=majority',
    )
    .then(() => console.log('MongoDB Atlas CONNECTED!'))
    .catch((error) => {
      console.log(`Error connecting to MongoDB.\nError: ${error}`);
    });
};

module.exports = connectToDatabase;
