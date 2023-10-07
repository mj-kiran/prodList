import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import categoryRouter from './routes/categoryRoutes.js'
import subcategoryRouter from './routes/subcategoryRoutes.js'
import productRouter from './routes/productRoutes.js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

 mongoose
   .connect(process.env.MONGODB_URL)
   .then(() => {
     console.log("Connected to MongoDB");
   })
   .catch((err) => {
     console.error("Error", err);
   });

   const __dirname=path.resolve()
const app = express()

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/categories", categoryRouter);
app.use("/api/categories/subcategory", subcategoryRouter);

app.use("/api/products", productRouter); 

app.use(express.static(path.join(__dirname, 'frontend','build','index.html')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'/frontend/build/'))
})

app.listen(3300, () => {
    console.log('server started at 3300');
})