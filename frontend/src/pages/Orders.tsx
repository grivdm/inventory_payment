import React, { useEffect } from "react";
import useFetch from "../services/useFetch";
import { IOrder } from "../types/order";
import SortableTable from "../components/SortableTable";
import { Link } from "react-router-dom";

const Orders: React.FC = () => {
  const { callFetch, data, error, loading } = useFetch<Array<IOrder>>();
  const { callFetch: deleteFetch } = useFetch<void>();

  useEffect(() => {
    callFetch({
      url: "http://localhost:8002/api/v1/orders",
      method: "GET",
    });
  }, []);

  const onDelete = async (pk: string) => {
    await deleteFetch({
      url: `http://localhost:8002/api/v1/orders/${pk}`,
      method: "DELETE",
    });
    callFetch({
      url: "http://localhost:8002/api/v1/orders",
      method: "GET",
    });
  };

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
      <Link to="/orders/create" className="btn btn-secondary">
        Create Order
      </Link>
      <SortableTable
        data={data}
        columns={["product_id", "price", "quantity", "total", "status"]}
        onDelete={onDelete}
      />
    </div>
  );
};

export default Orders;
