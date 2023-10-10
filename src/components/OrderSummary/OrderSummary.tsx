import { Link } from "react-router-dom";
import "./OrderSummary.css";
// HiLightningBolt
import { HiLightningBolt } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Box, Menu, Modal } from "@mui/material";
import { fetchCart } from "../../services/cart.services";
import Cookies from "js-cookie";

export interface ICart extends Document {
  userId: string;
  items: ICartItem[];
  totalAmount: number;
}

export interface ICartItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string
}

const OrderSummary = () => {
  const [openCheckout, setOpenCheckout] = useState(false);
  const [cartData, setCartData] = useState<ICart>();
  const userId = Cookies.get("userId");
  const handleCheckoutOpen = () => setOpenCheckout(true);
  const handleCheckoutClose = () => {
    setOpenCheckout(false);
  };
  const getCart = async () => {
    if (userId) {
      const result = await fetchCart(userId);
      if (result) {
        setCartData(result.data.data);
        console.log(cartData);
      }
    }
  };
  useEffect(() => {
    getCart();
  }, [cartData]);
  return (
    <div className="cart-view-container">
      <p className="order-summary-text">Order summary</p>
      {cartData && cartData.items.map((item, index) => (
        <>
          <div className="cart-info-container">
          <img
            src={item.image}
            alt={item.image}
            className="cart-item-img"
          />
          <div>
            <p className="item-standard-text">
              {item.productName}
            </p>
            <p className="item-highlight-text">{item.quantity} x $ {item.price}</p>
          </div>
        </div>
        <div className="cart-separator" />
        </>
      
      ))}
      <div className="order-summary-row-container">
        <p className="order-summary-bill">Subtotal</p>
        <p className="order-summary-bill">$ {cartData?.totalAmount}</p>
      </div>
      <div className="order-summary-row-container">
        <p className="order-summary-bill">Delivery</p>
        <p className="order-summary-bill"> - </p>
      </div>
      <div className="order-summary-row-container">
        <p className="order-summary-bill">Taxes</p>
        <p className="order-summary-bill"> - </p>
      </div>
      <div className="cart-separator" />
      <div className="order-summary-row-container">
        <p className="order-total">Subtotal</p>
        <p className="order-total">$ {cartData?.totalAmount}</p>
      </div>
    </div>
  );
};

export default OrderSummary;
