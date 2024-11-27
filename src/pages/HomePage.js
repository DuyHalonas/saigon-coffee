import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import ProductList from "../components/ProductList";
import products from "../data/products";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || product.category === selectedCategory)
  );

  return (
    <div className="container mt-4">
      <SearchBar onSearch={setSearchTerm} />
      <Filter onFilter={setSelectedCategory} />
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default HomePage;
