import React, { useState } from "react";
import "./CategoryForm.css";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../service/BaseUrl";

const CategoryForm = () => {
 
  const [categoryName, setCategoryName] = useState("");
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${BASE_URL}/api/categories/create-category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: categoryName }),
        }
      );

      if (response.status === 201) {
        alert("Category created successfully");
        setCategoryName("");
        navigate("/");
      } else {
        alert("Category creation failed");
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating category", error);
      alert("Category creation failed");
    }
  };

  return (
    <div className="container mt-3 category-form-container ">
      <h2>Create a Category</h2>
      <form onSubmit={handleSubmit}>
        <label>Category Name:</label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button type="submit">Create Category</button>
        &nbsp; <button onClick={()=>navigate('/')}>Cancel</button>
      </form>
    </div>
  );
};

export default CategoryForm;
