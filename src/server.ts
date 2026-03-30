import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

import app from './app';
import config from './config';
import { connectDB } from './db/dbConnect';

async function main() {
  try {
    await connectDB();

    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to connect to Database', error);
  }
}

main();
