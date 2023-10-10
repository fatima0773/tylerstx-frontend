/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import "./PaymentForm.css";
import { Alert, Button, Snackbar } from "@mui/material";
import Cookies from "js-cookie";
import { ICart } from "../OrderSummary/OrderSummary";
import { fetchCart } from "../../services/cart.services";
import { REACT_APP_API_URL } from "../../config/config";

export interface IOrderedItem extends Document {
  productId: string;
  quantity: number;
}

export interface IOrder extends Document {
  amount: string;
  date: string;
  items: IOrderedItem[];
}

export interface ICartItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cartData, setCartData] = useState<ICart>();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const userId = Cookies.get("userId");
  const getCart = async () => {
    if (userId) {
      const result = await fetchCart(userId);
      if (result) {
        setCartData(result.data.data);
      }
    }
  };
  useEffect(() => {
    getCart();
  }, [cartData]);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Wait for it to load.
      return;
    }

    // Handle the payment logic here using Stripe methods
    try {
      // Create a payment method using the card element
      const cardElement = elements.getElement(CardNumberElement);

      if (!cardElement) {
        setError(true);
        setErrMsg('Please fill all payment fields')
        return;
      }

      const paymentMethodResult = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (paymentMethodResult.error) {
        console.error(
          "Payment method error:",
          paymentMethodResult.error.message
        );
        setError(true);
        setErrMsg(paymentMethodResult.error.message || 'Please fill all payment fields')
        return;
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // Extract the required attributes from cartData items and create an array of IOrderedItem
    if (cartData && cartData.items) {
      // Extract the required attributes from cartData items and create an array of IOrderedItem
      const orderedItems= cartData.items.map(
        (cartItem: ICartItem) => ({
          productId: cartItem.productId,
          quantity: cartItem.quantity,}
        )
      );
      // Payment was successful, now make a request to the second API to create or update the order
      const orderResponse = await fetch(
        `${REACT_APP_API_URL}order/process-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            amount: cartData?.totalAmount,
            date: new Date(),
            items: orderedItems,
          }),
        }
      );

      if (!orderResponse.ok) {
        // Handle order creation/update failure
        console.error("Order creation/update failed.");
        return;
      }
    }

    try {
      fetch( `${REACT_APP_API_URL}cart/empty-cart/${userId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          setSuccess(true);
          setSuccessMsg('Cart emptied successfully');
        })
        .catch((error) => {
          // Handle errors
          setError(true);
          setErrMsg('Error emptying the cart')
        });
    } catch (error) {
      
    }
  };

  const handleErrorClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
  };

  const handleSuccessClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error">{errMsg}</Alert>
      </Snackbar>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">{successMsg}</Alert>
      </Snackbar>
      <div className="input-group">
        <label className="label">
          Card Number
          <CardNumberElement className="input" />
        </label>
      </div>
      <div className="input-group">
        <label className="label">
          Expiration Date
          <CardExpiryElement className="input" />
        </label>
        <label className="label">
          CVV
          <CardCvcElement className="input" />
        </label>
      </div>
      <div className="checkout-btn-container">
        <Button
          type="submit"
          style={{
            fontFamily: "Rubik",
            marginTop: "10px",
            backgroundColor: "#2753f4",
            width: "50%",
            padding: "10px",
            color: "white",
          }}
          variant="contained"
        >
          PAY
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
