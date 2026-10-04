import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

async function wipeDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Atlas. Wiping collections...");
    
    try {
      await mongoose.connection.db.dropCollection("users");
      console.log("users dropped.");
    } catch (e) {
      console.log("users collection doesn't exist or already dropped.");
    }

    try {
      await mongoose.connection.db.dropCollection("crops");
      console.log("crops dropped.");
    } catch (e) {
      console.log("crops collection doesn't exist or already dropped.");
    }

    try {
      await mongoose.connection.db.dropCollection("marketrecords");
      console.log("marketrecords dropped.");
    } catch (e) {
      console.log("marketrecords collection doesn't exist or already dropped.");
    }

    console.log("DB Wiped successfully.");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

wipeDB();
