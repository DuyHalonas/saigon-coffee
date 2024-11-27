import React from "react";
import { Form } from "react-bootstrap";

const Filter = ({ onFilter }) => {
  return (
    <Form.Select onChange={(e) => onFilter(e.target.value)} className="mt-3">
      <option value="">Tất cả danh mục</option>
      <option value="Cà phê đen">Cà phê đen</option>
      <option value="Cà phê sữa">Cà phê sữa</option>
      <option value="Trà">Trà</option>
      <option value="Bánh ngọt">Bánh ngọt</option>
    </Form.Select>
  );
};

export default Filter;
