import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./CategoryForm.css";
const SubCategoryForm = () => {
    const [subCategory, setSubCategory] = useState("");
    const { categoryId } = useParams();
const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "/api/categories/subcategory/create-subcategories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: subCategory,
            parentCategory: categoryId,
          }),
        }
      );

      if (response.status === 201) {
        alert("SubCategory created successfully");
          setSubCategory("");
          navigate(`/category/${categoryId}`);
      } else {
        alert("SubCategory creation failed");
      }
    } catch (error) {
      console.error("Error creating Subcategory", error);
      alert("SubCategory creation failed");
    }
  };

  return (
    <div className="container mt-3 category-form-container ">
      <h2>Create SubCategory</h2>
      <form onSubmit={handleSubmit}>
        <label>SubCategory Name:</label>
        <input
          type="text"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
        />
        <button type="submit">Create </button>
        &nbsp;{" "}
        <button onClick={() => navigate(`/category/${categoryId}`)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default SubCategoryForm;
