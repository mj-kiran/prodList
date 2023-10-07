import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Categories.css'
import axios from "axios";
import Table from "react-bootstrap/Table";
import {Button}from'react-bootstrap'

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
        Add Category
      </Link>
      
      <Table striped>
        <thead>
          <tr>
            
            <th>Categories({categories.length})</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>
                <Link
                  to={`/category/${category._id}`}
                  className="btn btn-primary"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Categories;
