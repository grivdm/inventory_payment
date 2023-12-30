import React from "react";
import useFetch from "../services/useFetch";
import { Order } from "../types/order";
import SortableTable from "../components/SortableTable";

const Orders: React.FC = () => {
  const { data, error, loading } = useFetch<Array<Order>>(
    "http://localhost:8002/api/v1/orders"
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
      <h1>Orders</h1>
      <SortableTable
        data={data}
        columns={["product_id", "price", "quantity", "total", "status"]}
      />
    </div>
  );
};

export default Orders;
