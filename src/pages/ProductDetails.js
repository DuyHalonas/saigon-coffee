import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import { Button, Form, Modal } from "react-bootstrap";
import { useCart } from "../context/CartContext";

const ProductDetails = ({ cartPosition }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");
  const [showModal, setShowModal] = useState(false);

  const productImageRef = useRef();

  if (!product) return <h2>Product not found!</h2>;

  const calculatePrice = () => {
    const sizeMultiplier = size === "L" ? 1.5 : 1;
    return product.price * sizeMultiplier * quantity;
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity, size, totalPrice: calculatePrice() });
    createFlyingImage();
    setShowModal(true);
  };

  const createFlyingImage = () => {
    const productImage = productImageRef.current.getBoundingClientRect();
    const flyImage = document.createElement("img");
    flyImage.src = product.image; // Đảm bảo bạn có thuộc tính `image`.
    flyImage.className = "flying-image";
    flyImage.style.setProperty("--product-x", `${productImage.left}px`);
    flyImage.style.setProperty("--product-y", `${productImage.top}px`);
    flyImage.style.setProperty("--cart-x", `${cartPosition.x}px`);
    flyImage.style.setProperty("--cart-y", `${cartPosition.y}px`);
    document.body.appendChild(flyImage);

    setTimeout(() => {
      document.body.removeChild(flyImage);
    }, 800); // Thời gian animation
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container mt-4">
      <h2>{product.name}</h2>
      <p>Danh mục: {product.category}</p>
      <p>Giá cơ bản: {product.price.toLocaleString()} VND</p>
      <img
        src={product.image}
        alt={product.name}
        ref={productImageRef}
        style={{ width: "200px", marginBottom: "20px" }}
      />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Số lượng</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            min="1"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Kích cỡ</Form.Label>
          <Form.Select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="M">M (Nhỏ)</option>
            <option value="L">L (Lớn)</option>
          </Form.Select>
        </Form.Group>
      </Form>
      <p>
        Giá tổng: <strong>{calculatePrice().toLocaleString()} VND</strong>
      </p>
      <Button variant="primary" onClick={handleAddToCart}>
        Thêm vào giỏ hàng
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bạn đã thêm <strong>{product.name}</strong> ({size}, {quantity} sản
            phẩm) vào giỏ hàng thành công!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductDetails;
