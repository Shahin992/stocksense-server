import mongoose from 'mongoose';

let isConnected = false;
let connectingPromise: Promise<typeof mongoose> | null = null;

const buildMongoUri = () => {
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASS;
  const dbName = process.env.DB_NAME;

  if (!username || !password || !dbName) {
    throw new Error('Missing MongoDB credentials. Set DB_URI or DB_USERNAME/DB_PASS/DB_NAME.');
  }

  return `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@cluster0.c60ctk1.mongodb.net/${encodeURIComponent(dbName)}?retryWrites=true&w=majority&appName=Cluster0`;
};

export const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  if (connectingPromise) {
    await connectingPromise;
    return;
  }

  mongoose.set('strictPopulate', false);
  mongoose.set('autoIndex', true);
  mongoose.set('bufferCommands', false);

  const uri = buildMongoUri();

  connectingPromise = mongoose.connect(uri, {
    serverSelectionTimeoutMS: Number(process.env.DB_SERVER_SELECTION_TIMEOUT_MS || 10000),
    connectTimeoutMS: Number(process.env.DB_CONNECT_TIMEOUT_MS || 10000),
    socketTimeoutMS: Number(process.env.DB_SOCKET_TIMEOUT_MS || 20000),
  });

  try {
    await connectingPromise;
    isConnected = true;
  } finally {
    connectingPromise = null;
  }

  console.log(`====> Connected to DB: ${mongoose.connection.name}`);
};
