import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import process from 'process';
import Tour from '../models/tourModel.js';
import { dirname } from 'dirname-filename-esm';

dotenv.config({ path: './config.env' });

const DBString = process.env.DATABASE_LOCAL;
const connectToDB = async () => {
  try {
    await mongoose.connect(DBString);
    console.log('Connected successfully');
  } catch (error) {
    console.log(error);
  }
};

connectToDB();

// Read from the json file
const tours = JSON.parse(
  fs.readFileSync(`${dirname}/../dev-data/data/tours-simple.json`, 'utf-8'),
);
// console.log(tours);

// Import data
const importData = async () => {
  try {
    await Tour.deleteMany();
    console.log('All data deleted');
    await Tour.create(tours);
    console.log('Data successfully loaded');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

importData();
