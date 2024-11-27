import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Card className="product-card mb-4">
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>Giá: {product.price.toLocaleString()} VND</Card.Text>
        <Button as={Link} to={`/product/${product.id}`} variant="primary">
          Xem chi tiết
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
