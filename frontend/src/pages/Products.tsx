import React from "react";
import useFetch from "../services/useFetch";
import { Product } from "../types/product";
import SortableTable from "../components/SortableTable";

const Products: React.FC = () => {
  const { data, error, loading } = useFetch<Array<Product>>(
    "http://localhost:8001/api/v1/products"
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!Array.isArray(data)) {
    return <p>Error: Data is not valid</p>;
  }

  return (
    <div>
      <h1>Products</h1>
      <SortableTable data={data} columns={["name", "price", "quantity"]} />
    </div>
  );
};

export default Products;
