import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Button, Modal, Table } from "react-bootstrap";

const CheckoutPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]); // Lưu trữ thông tin đơn hàng khi thanh toán
  const [totalAmount, setTotalAmount] = useState(0); // Lưu tổng tiền khi thanh toán

  // Tính tổng tiền từ giỏ hàng
  const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Giỏ hàng trống! Hãy thêm sản phẩm trước khi thanh toán.");
      return;
    }
    // Lưu trữ thông tin đơn hàng và tổng thanh toán trước khi xóa giỏ hàng
    setOrderDetails([...cart]);
    setTotalAmount(total); // Lưu tổng tiền cho thanh toán
    setShowModal(true);
    clearCart(); // Xóa giỏ hàng sau khi lưu thông tin
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container mt-4">
      <h2>Giỏ hàng</h2>
      {cart.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Kích cỡ</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.size}</td>
                  <td>{item.quantity}</td>
                  <td>{item.totalPrice.toLocaleString()} VND</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4>Tổng cộng: {total.toLocaleString()} VND</h4>
          <Button variant="success" onClick={handleCheckout}>
            Thanh toán
          </Button>
        </>
      ) : (
        <p>Giỏ hàng của bạn đang trống.</p>
      )}

      {/* Modal thông báo thanh toán */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thanh toán thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Cảm ơn bạn đã mua hàng tại SAIGON COFFEE!</h5>
          <p>Chi tiết đơn hàng của bạn:</p>
          <Table bordered>
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Kích cỡ</th>
                <th>Số lượng</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.size}</td>
                  <td>{item.quantity}</td>
                  <td>{item.totalPrice.toLocaleString()} VND</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h5>Tổng thanh toán: {totalAmount.toLocaleString()} VND</h5>
          <p>Hẹn gặp lại bạn lần sau!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
