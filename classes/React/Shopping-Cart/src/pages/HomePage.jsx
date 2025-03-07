import React from "react";
import ProductList from "../components/ProductList";

const HomePage = () => {
  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold p-6">Products</h2>
      <ProductList />
    </div>
  );
};

export default HomePage;
