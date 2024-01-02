import React, { useEffect } from "react";
import useFetch from "../services/useFetch";
import { IProduct } from "../types/product";
import SortableTable from "../components/SortableTable";
import { Link } from "react-router-dom";

const Products: React.FC = () => {
  const { callFetch, data, error, loading } = useFetch<Array<IProduct>>();
  const { callFetch: deleteFetch } = useFetch<void>();

  useEffect(() => {
    callFetch({
      url: "http://localhost:8001/api/v1/products",
      method: "GET",
    });
  }, []);

  const onDelete = async (pk: string) => {
    const deletion = await deleteFetch({
      url: `http://localhost:8001/api/v1/products/${pk}`,
      method: "DELETE",
    });
    if (deletion) {
      data?.filter((product) => product.pk !== pk);
    }
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
      <h1>Products</h1>
      <Link to="/products/create" className="btn btn-secondary">
        Create Product
      </Link>
      <SortableTable
        data={data}
        columns={["name", "price", "quantity", "pk"]}
        onDelete={onDelete}
      />
    </div>
  );
};

export default Products;
