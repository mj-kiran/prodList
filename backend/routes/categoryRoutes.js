import express from "express";
const router = express.Router();
import {
  categorydetail,
  createCategory,
  listCategories,
  
} from "../controllers/categoryController.js";


router.post('/create-Category', createCategory);
router.get("/viewCategories", listCategories);

// router.get("/category/:id/subcategories", listSubcategories);

router.get("/:id",categorydetail);

export default router;
