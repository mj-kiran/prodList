import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Categories.css'
import axios from "axios";

function Categories() {
     const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
     useEffect(() => {
       axios
         .get("/api/categories/viewCategories")
         .then((response) => {
           setCategories(response.data.categories);
          //  console.log(response.data.categories);
           setLoading(false);
         })
         .catch((error) => {
           console.error("Error fetching categories:", error);
           setLoading(false);
         });
     }, []);

  return (
    <div className="container">
      <Link to="/create-category" className="btn btn-primary">
        <button>Add Category</button>
      </Link>
      <h2>Categories({categories.length})</h2>
      <ul >
        {categories.map((category) => (
          <li key={category._id}>
            <Link to={`/category/${category._id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
