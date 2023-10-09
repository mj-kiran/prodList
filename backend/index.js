
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import categoryRouter from "./routes/categoryRoutes.js";
import subcategoryRouter from "./routes/subcategoryRoutes.js";
import productRouter from "./routes/productRoutes.js";



dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error", err);
  });


const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/categories", categoryRouter);
app.use("/api/categories/subcategory", subcategoryRouter);

app.use("/api/products", productRouter);



app.listen(3300, () => {
  console.log("server started at 3300");
});
