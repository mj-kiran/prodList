import express from "express";
const router = express.Router();
import { addProduct,      getProductList, getProductsByCategory, getProductsBySubcategory} from "../controllers/productController.js";


router.post("/addproduct", addProduct);
router.get("/getproductList", getProductList);
router.get('/get-products-by-subcategory/:id', getProductsBySubcategory);
router.get('/get-products-by-category/:id', getProductsByCategory);


export default router;