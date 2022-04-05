import mongoose from 'mongoose';

let uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (process.env.NODE_ENV === 'production') {
    if (cached.conn) {
      return cached.conn;
    }
  }

  if (process.env.NODE_ENV === 'development' || (process.env.NODE_ENV === 'production' && !cached.promise)) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(uri, options).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default function mongodb() {
  mongoose.connection.on('disconnected', connectToDatabase);
}
