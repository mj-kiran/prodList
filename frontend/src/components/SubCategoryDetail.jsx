import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

function SubCategoryDetail() {
  const [subcategory, setSubcategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId, subcategoryId } = useParams();
  // console.log(categoryId, subcategoryId);

  useEffect(() => {
    axios
      .get(`/api/categories/subcategory/subcategories/${subcategoryId}`)
      .then((response) => {
        setSubcategory(response.data.subcategory);
        console.log(response.data.subcategory);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching subcategory:", error);
        setLoading(false);
      });
    //   products
    axios
      .get(`/api/products/get-products-by-subcategory/${subcategoryId}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [subcategoryId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!subcategory) {
    return <div>SubCategory not found</div>;
  }

  return (
    <div className="container">
      <div className="buttons_top ">
        <Link to={`/category/${categoryId}`} className="btn btn-primary">
          <button className="back_b">Back</button>
        </Link>
        &nbsp;
        <Link
          to={`/category/${categoryId}/${subcategoryId}/add-product`}
          className="btn btn-primary"
        >
          <button>Add Products</button>
        </Link>
      </div>
      <h2>{subcategory.name} </h2>
      <h3>Products({subcategory.products.length})</h3>
      <ul className="subCat">
        {subcategory.products.map((product) => (
          
            <li key={product._id}>{product.name}</li>
          
        ))}
      </ul>
    </div>
  );
}

export default SubCategoryDetail;