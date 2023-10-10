import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Modal,
  Box,
} from "@mui/material";
import "./Cart.css";
import { useEffect, useState } from "react";
import { HiLightningBolt } from "react-icons/hi";
import paymentMethoOptions from "../../assets/images/Screenshot 2023-08-31 at 4.11.23 PM.png";
import Cookies from "js-cookie";
import { fetchCart, removeItemFromCart } from "../../services/cart.services";
import CheckoutContainer from "../../components/CheckoutContainer/CheckoutContainer";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import { AiOutlineDelete } from "react-icons/ai";

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
  image: string;
}

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
  width: "900px",
};

const Cart = () => {
  const [cartData, setCartData] = useState<ICart>();
  const [isSizeDialogOpen, setIsSizeDialogOpen] = useState(false);
  const [isShippingInfo, setIsShippingInfo] = useState(false);
  const [isCoupon, setIsCoupon] = useState(false);
  const countries = ["Pakistan", "United States"];
  const [country, setCountry] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [suburbCity, setSuburbCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [countryError, setCountryError] = useState(false);
  const [stateProvinceError, setStateProvinceError] = useState(false);
  const [suburbCityError, setSuburbCityError] = useState(false);
  const [zipCodeError, setZipCodeError] = useState(false);
  const userId = Cookies.get("userId");
  const [openCheckout, setOpenCheckout] = useState(false);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData]);
  // Handlers
  const handleShippingInfoSubmit = () => {
    // Validate the fields
    let isValid = true;
    if (!country) {
      setCountryError(true);
      isValid = false;
    }
    if (!stateProvince) {
      setStateProvinceError(true);
      isValid = false;
    }
    if (!suburbCity) {
      setSuburbCityError(true);
      isValid = false;
    }
    if (!zipCode) {
      setZipCodeError(true);
      isValid = false;
    }

    if (isValid) {
      // Perform any further actions or navigate to the next step
      // For example: setIsShippingInfo(false);
    }
  };


  const handleSizeChange = () => {
    setIsSizeDialogOpen(true);
  };

  const handleCloseSizeDialog = () => {
    setIsSizeDialogOpen(false);
  };

  const handleisShippingFields = () => {
    setIsShippingInfo(!isShippingInfo);
  };

  const handleisCouponFields = () => {
    setIsCoupon(!isCoupon);
  };

  const removeCartItem = async (productId: string) => {
    if (userId) {
      const result = await removeItemFromCart(userId, productId);
      if (result) {
        setCartData(result.data.data);
        console.log(cartData);
      }
    }
  };

  return (
    <div className="main-cart">
      {cartData ? (
        <h4 className="your-cart-text">
          Your Cart ({cartData.items.length} items)
        </h4>
      ) : (
        <h4 className="your-cart-text">Your Cart is Empty</h4>
      )}

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <p className="standard-cart-text">Item</p>
        </Grid>
        <Grid item xs={3}>
          <p className="standard-cart-text">Price</p>
        </Grid>
        <Grid item xs={3}>
          <p className="standard-cart-text">Quantity</p>
        </Grid>
        <Grid item xs={2}>
          <p className="standard-cart-text">Total</p>
        </Grid>
      </Grid>
      <div className="cart-separator" />

      {cartData &&
        cartData.items.map((product, index) => (
          <>
            <Grid container spacing={2} style={{ paddingTop: "30px" }}>
              <Grid item xs={4}>
                <div className="item-container">
                  <img
                    src={product.image}
                    alt="item"
                    className="cart-item-img"
                  />
                  <div>
                    <p className="grey-text">{product.productName}</p>
                    <p className="blue-text">
                      Size:
                      <p className="black-text">XS</p>
                    </p>
                    <p className="blue-text">
                      Tags:
                      <p className="black-text">Shoes</p>
                    </p>
                    <p className="change-btn" onClick={handleSizeChange}>
                      Change
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className="product-info-container">
                  <p className="black-text" style={{ fontWeight: "bold" }}>
                    $ {product.price}
                  </p>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className="product-info-container">
                  <span className="black-text" style={{ fontWeight: "bold" }}>
                    {product.quantity}
                  </span>
                </div>
              </Grid>
              <Grid item xs={2}>
                <div className="product-info-container">
                  <p className="black-text" style={{ fontWeight: "bold" }}>
                    $ {product.price * product.quantity}
                  </p>
                  <AiOutlineDelete
                    className="delete-icon"
                    onClick={() => removeCartItem(product.productId)}
                  />
                </div>
              </Grid>
            </Grid>

            <Dialog open={isSizeDialogOpen} onClose={handleCloseSizeDialog}>
              <DialogTitle>Select Size</DialogTitle>
              <DialogContent>
                {/* Add your size selection options here */}
                <p className="size-option" onClick={handleCloseSizeDialog}>
                  XS
                </p>
                <p className="size-option" onClick={handleCloseSizeDialog}>
                  S
                </p>
                <p className="size-option" onClick={handleCloseSizeDialog}>
                  M
                </p>
                {/* Add more size options as needed */}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseSizeDialog} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ))}
      <div className="cart-separator" />
      <div className="checkout-container">
        <div className="checkout-info-container">
          <p className="blue-text" style={{ fontWeight: "bold" }}>
            {" "}
            Subtotal:{" "}
          </p>
          <p className="black-text" style={{ fontWeight: "bold" }}>
            $ {cartData?.totalAmount}
          </p>
        </div>
        <div className="cart-separator" />
        <div className="checkout-info-container">
          <p className="blue-text" style={{ fontWeight: "bold" }}>
            {" "}
            Shipping:{" "}
          </p>
          {isShippingInfo ? (
            <p className="cancel-btn" onClick={handleisShippingFields}>
              {" "}
              Cancel
            </p>
          ) : (
            <p className="change-btn" onClick={handleisShippingFields}>
              Add Info
            </p>
          )}
        </div>
        {isShippingInfo ? (
          <div className="shipping-info-container">
            <div className="checkout-info-container">
              <p
                className="grey-text"
                style={{ fontWeight: "bold", fontSize: "15px" }}
              >
                Country
              </p>
              <TextField
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setCountryError(false);
                }}
                error={countryError}
                helperText={countryError && "Country is required"}
                placeholder="country"
                size="small"
                id="outlined-select-currency"
                select
                style={{ width: "60%", fontFamily: "Rubik" }}
              >
                {countries.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="checkout-info-container">
              <p
                className="grey-text"
                style={{ fontWeight: "bold", fontSize: "15px" }}
              >
                State/province
              </p>
              <TextField
                value={stateProvince}
                onChange={(e) => {
                  setStateProvince(e.target.value);
                  setStateProvinceError(false);
                }}
                error={stateProvinceError}
                helperText={stateProvinceError && "State/Province is required"}
                style={{ width: "60%", fontFamily: "Rubik" }}
                id="outlined-size-small"
                placeholder="State/province"
                size="small"
              />
            </div>
            <div className="checkout-info-container">
              <p
                className="grey-text"
                style={{ fontWeight: "bold", fontSize: "15px" }}
              >
                Suburb/city
              </p>
              <TextField
                value={suburbCity}
                onChange={(e) => {
                  setSuburbCity(e.target.value);
                  setSuburbCityError(false);
                }}
                error={suburbCityError}
                helperText={suburbCityError && "Suburb/City is required"}
                style={{ width: "60%" }}
                id="outlined-size-small"
                placeholder="Suburb/city"
                size="small"
              />
            </div>
            <div className="checkout-info-container">
              <div className="btn-container-label">
                <p
                  className="grey-text"
                  style={{ fontWeight: "bold", fontSize: "15px" }}
                >
                  Zip/postcode
                </p>
              </div>
              <div className="btn-container">
                <TextField
                  value={zipCode}
                  onChange={(e) => {
                    setZipCode(e.target.value);
                    setZipCodeError(false);
                  }}
                  error={zipCodeError}
                  helperText={zipCodeError && "Zip/Postcode is required"}
                  style={{ width: "100%" }}
                  id="outlined-size-small"
                  placeholder="Zip/postcode"
                  size="small"
                />
                <Button
                  onClick={handleShippingInfoSubmit}
                  fullWidth
                  style={{
                    backgroundColor: "#c62032",
                    fontFamily: "Rubik",
                    alignSelf: "flex-end",
                    marginTop: "10px",
                  }}
                  variant="contained"
                >
                  ESTIMATE SHIPPING
                </Button>
              </div>
            </div>
          </div>
        ) : null}
        <div className="cart-separator" />
        <div className="checkout-info-container">
          <p className="blue-text" style={{ fontWeight: "bold" }}>
            CouponCode:
          </p>
          {isCoupon ? (
            <p className="cancel-btn" onClick={handleisCouponFields}>
              {" "}
              Cancel
            </p>
          ) : (
            <p className="change-btn" onClick={handleisCouponFields}>
              Add Coupon
            </p>
          )}
        </div>
        {isCoupon ? (
          <div className="shipping-info-container">
            <div className="checkout-info-container">
              <TextField
                style={{ width: "80%", fontFamily: "Rubik" }}
                id="outlined-size-small"
                placeholder="Enter Your Coupon Code"
                size="small"
              />
              <Button
                size="large"
                style={{
                  backgroundColor: "#c62032",
                  fontFamily: "Rubik",
                  alignSelf: "flex-end",
                }}
                variant="contained"
              >
                Apply
              </Button>
            </div>
          </div>
        ) : null}
        <div className="cart-separator" />
        <div className="checkout-info-container">
          <p className="blue-text" style={{ fontWeight: "bold" }}>
            {" "}
            Grand Total:
          </p>
          <h3
            className="black-text"
            style={{ fontSize: "19px", fontWeight: "bold" }}
          >
            $ {cartData?.totalAmount}
          </h3>
        </div>
        <div className="cart-checkout-btn-container">
          <div className="checkout-btn" style={{ width: "60%" }}>
            <HiLightningBolt className="cart-icon" />
            <p className="continue-to-paym-title" onClick={handleCheckoutOpen}>
              Continue to Payment
            </p>
          </div>
          <div className="full-width-container">
            <img
              src={paymentMethoOptions}
              alt="Payment methods available"
              className="display-available-paym-methods"
            />
          </div>
        </div>
      </div>
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
  );
};

export default Cart;
