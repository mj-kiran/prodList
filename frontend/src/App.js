import './App.css';
import Categories from './components/Categories';
import CategoryDetail from './components/CategoryDetail';
import CategoryForm from './components/CategoryForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubCategoryForm from './components/SubCategoryForm';
import SubCategoryDetail from './components/SubCategoryDetail';
import AddProduct from './components/AddProduct';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/create-category" element={<CategoryForm />} />
          <Route path="/" element={<Categories />} />
          <Route path="/category/:categoryId" element={<CategoryDetail />} />
          <Route
            path="/category/:categoryId/create-SubCategory"
            element={<SubCategoryForm />}
          />
          <Route
            path="/category/:categoryId/:subcategoryId"
            element={<SubCategoryDetail />}
          />
          <Route
            path="/category/:categoryId/:subcategoryId/add-product"
            element={<AddProduct />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
