import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

 mongoose
   .connect(process.env.MONGODB_URL)
   .then(() => {
     console.log("Connected to MongoDB");
   })
   .catch((err) => {
     console.error("Error", err);
   });

const app = express()

app.listen(3300, () => {
    console.log('server started at 3300');
})