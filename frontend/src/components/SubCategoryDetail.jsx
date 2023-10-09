import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import BASE_URL from "../service/BaseUrl";
function SubCategoryDetail() {
  const [subcategory, setSubcategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId, subcategoryId } = useParams();
  // console.log(categoryId, subcategoryId);

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/api/categories/subcategory/subcategories/${subcategoryId}`
      )
      .then((response) => {
        setSubcategory(response.data.subcategory);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching subcategory:", error);
        setLoading(false);
      });
    //   products
    axios
      .get(
        `${BASE_URL}/api/products/get-products-by-subcategory/${subcategoryId}`
      )
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
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
        <Link to={`/category/${categoryId}`} className="btn btn-dark">
          Back
        </Link>
        &nbsp;
        <Link
          to={`/category/${categoryId}/${subcategoryId}/add-product`}
          className="btn btn-secondary"
        >
          Add Products
        </Link>
      </div>
      <br/>
      <h1>{subcategory.name} </h1>
      

      <Table striped>
        <thead>
          <tr>
            <th>Products({subcategory.products.length})</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default SubCategoryDetail;