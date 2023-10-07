import express from "express";
import { createSubcategory, subCategoryDetail } from "../controllers/subCategoryController.js";
const router = express.Router();

router.post("/create-subcategories", createSubcategory);
router.get("/subcategories/:id", subCategoryDetail);

export default router;