import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Subcategory from "../models/subcategoryModel.js";

export const addProduct = async (req, res) => {
  const { name, category, subcategory } = req.body;
  try {
    const product = new Product({ name, category, subcategory });
    const newProduct = await product.save();
    if (subcategory) {
      const updatedSubcategory = await Subcategory.findByIdAndUpdate(
        subcategory,
        { $push: { products: newProduct._id } },
        { new: true }
      );
    }

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error adding product" });
  }
};
export const getProductList = async (req, res) => {
  const productList = await Product.find()
    .populate("category")
    .populate("subcategory");
  if (!productList) {
    res.status(404).json({error:"no products"})
  }
  res.status(201).json(productList)
}
export const getProductsBySubcategory = async (req, res) => {
  const subcategoryId = req.params.id;
  try {
    const products = await Product.find({ subcategory: subcategoryId })
      .populate("category")
      .populate("subcategory");

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ error: "No products found for the given subcategory" });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};
export const getProductsByCategory = async (req, res) => {
  const categoryId = req.params.id;

  if (!categoryId) {
    return res
      .status(400)
      .json({ error: "Category ID is required " });
  }

  try {
    const productList = await Product.find({ category: categoryId })
      .populate("category")
      .populate("subcategory");

    if (!productList || productList.length === 0) {
      return res
        .status(404)
        .json({ error: "No products found for the given category" });
    }

    res.status(200).json(productList);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products by category" });
  }
};