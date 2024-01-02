import React, { useState } from "react";
import { IProductCreate, IProduct } from "../types/product";
import useFetch from "../services/useFetch";
import { useNavigate } from "react-router-dom";

const ProductCreate: React.FC = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProductCreate>({
    name: "",
    price: 0,
    quantity: 0,
  });

  const { callFetch, error, loading } = useFetch<IProduct>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(product);
    await callFetch({
      url: "http://localhost:8001/api/v1/products",
      method: "POST",
      body: product,
    }).then(() => {
      navigate(-1);
    });
  };

  if (loading) {
    return <p>Submitting...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Create a New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
