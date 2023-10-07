import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../App.css'
import {Link} from 'react-router-dom'

function CategoryDetail() {
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryId } = useParams();

  useEffect(() => {
    axios
      .get(`/api/categories/${categoryId}`)
      .then((response) => {
        // console.log(categoryId);
          setCategory(response.data);
          console.log(response.data);
        setLoading(false);
      }) 
      .catch((error) => {
        console.error("Error fetching category:", error);
        setLoading(false);
      });
    //   products
      axios
        .get(`/api/products/get-products-by-category/${categoryId}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
  
  }, [categoryId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="container">
      <div className="buttons_top ">
        <Link to={`/`} className="btn btn-primary">
          <button className="home_b">home</button>
        </Link>
        &nbsp;
        <Link
          to={`/category/${categoryId}/create-Subcategory`}
          className="btn btn-primary"
        >
          <button>Add SubCategory</button>
        </Link>
      </div>
      <h2>{category.name}</h2>
      <h3>Subcategories({category.subcategories.length})</h3>
      <ul className="subcat_list">
        {category.subcategories.map((subcategory) => (
          <Link to={`/category/${categoryId}/${subcategory._id}`}>
            <li key={subcategory._id}>{subcategory.name}</li>
          </Link>
        ))}
      </ul>
      <h3>Products</h3>
      <table>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryDetail;
