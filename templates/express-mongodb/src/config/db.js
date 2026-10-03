import mongoose from 'mongoose';

let connected = false;
export async function connectDb() {
  if (connected) return;
  await mongoose.connect(process.env.MONGODB_URI);
  connected = true;
}
export function dbState() { return mongoose.connection.readyState; }
