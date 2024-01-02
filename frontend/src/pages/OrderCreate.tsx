import React, { useState } from "react";
import { IOrderCreate, IOrder } from "../types/order";
import useFetch from "../services/useFetch";
import { useNavigate } from "react-router-dom";

const OrderCreate: React.FC = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<IOrderCreate>({
    product_id: "",
    quantity: 0,
  });

  const { callFetch, error, loading } = useFetch<IOrder>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(order);
    await callFetch({
      url: "http://localhost:8002/api/v1/orders",
      method: "POST",
      body: order,
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
      <h1>Create Order</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="product_id">Product ID</label>
          <input
            type="text"
            name="product_id"
            value={order.product_id}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={order.quantity}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Order
        </button>
      </form>
    </div>
  );
};

export default OrderCreate;
