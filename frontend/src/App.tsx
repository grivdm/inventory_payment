import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Sidebar from "./components/Sidebar";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import ProductCreate from "./pages/ProductCreate";
import OrderCreate from "./pages/OrderCreate";

const App: React.FC = () => {
  return (
    <Router>
      <nav className="navbar navbar-dark sticky-top bg-dark d-flex justify-content-center align-items-center">
        <Link className="navbar-brand" to="/">
          Inventory Payment App
        </Link>
      </nav>
      <div className="app container-fluid">
        <div className="row">
          <div className="sidebar col-md-2 d-md-block bg-light collapse position-fixed h-100">
            <Sidebar />
          </div>
          <main className="col-md-10 ml-sm-auto col-lg-10 pt-4 px-4">
            <div className="w-75">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<Products />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/products/create" element={<ProductCreate />} />
                <Route path="/orders/create" element={<OrderCreate />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
