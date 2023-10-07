import Subcategory from "../models/subcategoryModel.js";
import Category from "../models/categoryModel.js";
import Product from '../models/productModel.js'

export const createSubcategory = async (req, res) => {
  const { name, parentCategory } = req.body;
  try {
    const subcategory = new Subcategory({ name, category: parentCategory });
    const newSubcategory = await subcategory.save();

    if (parentCategory) {
      const parent = await Category.findById(parentCategory);
      if (parent) {
        parent.subcategories.push(newSubcategory);
        await parent.save();
      }
    }

    res.status(201).json(newSubcategory);
  } catch (error) {
    res.status(500).json({ error: "Error creating subcategory" });
  }
};

export const subCategoryDetail = async (req, res) => {
  const subcategoryId = req.params.id;

  try {
    const subcategory = await Subcategory.findById(subcategoryId)
      .populate({
        path: "products",
        select: "name",
      })
      .select("name products");

    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    const products = await Product.find({ subcategory: subcategoryId });

    res.status(200).json({ subcategory, products });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching subcategory detail and products" });
  }
};