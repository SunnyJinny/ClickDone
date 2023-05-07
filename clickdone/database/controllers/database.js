import Mongoose from "mongoose";
import { config } from '../config/config.js';

export async function connectDB() {
  return Mongoose.connect(config.db.host);
}
