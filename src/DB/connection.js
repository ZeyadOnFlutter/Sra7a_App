import mongoose, { Mongoose } from 'mongoose';
import { DB_URI } from '../../Config/config.service.js';

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('MongoDb Connected Successfully');
    });
    mongoose.connect(DB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    console.log('Error Connecting MongoDb', error);
  }
};

export default connectDB;
