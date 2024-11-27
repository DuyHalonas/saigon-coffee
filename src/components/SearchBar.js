import React from "react";
import { Form } from "react-bootstrap";

const SearchBar = ({ onSearch }) => {
  return (
    <Form.Control
      type="text"
      placeholder="Tìm kiếm sản phẩm..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
