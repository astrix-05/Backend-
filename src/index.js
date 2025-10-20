// require('dotenv').config({path: `./env});
import dotenv from "dotenv";
import connectDB from "./db/db.js";

dotenv.config({ 
    path: `./.env` 
});

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";



connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at PORT : ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("Error in DB connection !!!!", err);
    throw err;
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