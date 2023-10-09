import  Category  from "../models/categoryModel.js"; 

// Create  category
export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = new Category({ name });
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Error creating category" });
  }
};


export const listCategories = async (req, res) => {
  try {

    const categories = await Category.find().populate("subcategories");
    

    res.status(200).json({ categories});
  } catch (error) {
    res.status(500).json({ error: "Error listing categories and products" });
  }
};

export const categorydetail = async (req, res) => {
  const category = await Category.findById(req.params.id)
    .populate({
      path: "subcategories",
      select: "name",
    })
    .select("name subcategories");

  if (!category) {
    res
      .status(500)
      .json({ message: "The category with the given ID was not found." });
  }
  res.status(200).send(category);
};
