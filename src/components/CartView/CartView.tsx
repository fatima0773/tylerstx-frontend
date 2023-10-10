import { Link } from "react-router-dom";
import "./CartView.css";
// HiLightningBolt
import { HiLightningBolt } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import OrderSummary from "../OrderSummary/OrderSummary";
import CheckoutContainer from "../CheckoutContainer/CheckoutContainer";
import Cookies from "js-cookie";
import { fetchCart } from "../../services/cart.services";

// Modal Styles
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
  flexDirection: "row",
  display: "flex",
  alignItems: "center",
  width: '800px',
};

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



const CartView = () => {
  const [openCheckout, setOpenCheckout] = useState(false);
  const [cartData, setCartData] = useState<ICart>();
  const userId = Cookies.get("userId");
  const handleCheckoutOpen = () => setOpenCheckout(true);
  const handleCheckoutClose = () => {
    setOpenCheckout(false);
  };

  const getCart = async () => {
    try {
      if (userId) {
        console.log(userId);
        const result = await fetchCart(userId);
        if (result) {
          setCartData(result.data.data);
        }
      }
    } catch (error) {
      
    }
    
  };
  useEffect(() => {
    getCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData]);

  return (
    <div className="cart-view-container">
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
      <div className="cart-info-container">
      </div>
      <div className="cart-btn-container">
        <div className="checkout-btn">
          <HiLightningBolt className="cart-icon" />
          <p className="continue-to-paym-title" onClick={handleCheckoutOpen}>
            Continue to Payment
          </p>
        </div>
        <div className="view-cart-btn">
          <Link to="/view-cart" className="view-cart-title">
            View Cart
          </Link>
        </div>
      </div>
      <div>
        <Modal
          open={openCheckout}
          onClose={handleCheckoutClose}
          aria-labelledby="checkout container"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            
            <div className="modal-items">
              <CheckoutContainer />
            </div>
            <div>
              <OrderSummary />
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default CartView;
