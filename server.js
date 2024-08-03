import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';
import process from 'process';

dotenv.config({ path: './config.env' });
const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_LOCAL);
    console.log('Connected successfully');
  } catch (err) {
    console.log('Database connection failed', err.message);
  }
};

const port = process.env.PORT || 3000;
app.listen(port, () => {
  connect();
  console.log(`App running on port ${port}...`);
});
