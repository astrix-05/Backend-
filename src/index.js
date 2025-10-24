// require('dotenv').config({path: `./env});
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

console.log(
  "Cloudinary ENV TEST:",
  process.env.CLOUDINARY_CLOUD_NAME,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET
);


// basic sanity check
if (!process.env.MONGO_URL) {
  console.error("MONGO_URL is not set in .env");
  process.exit(1);
}

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at PORT : ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("Error in DB connection !!!!", err);
    process.exit(1);
  });


// function connectDB(){}

// connectDB();




// import express from "express";
// const app = express();


// ;(async () => {
//     try {
//       await  mongoose.connect(₹${process.env.MONGO_URL}/${DB_NAME});
//       app.on("error", (error) => {
//         console.log("ERR:", error);
//         throw error;
        
//       })
//       app.listen(process.env.PORT, () => {
//         console.log(`Server is running on port ${process.env.PORT}`);
//       })
//         console.log("DB connected");
//     } catch (error) {
//         console.log("Error in DB connection", error);
//         throw error;
//     }
// } )();