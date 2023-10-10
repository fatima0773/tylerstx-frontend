/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Alert, Button, Radio, Snackbar, TextField, TextareaAutosize } from "@mui/material";
import "./CheckoutContainer.css";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../PaymentForm/PaymentForm";
import STRIPE_API_KEY from "../../config/stripe";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios"; // Add this import
import Cookies from "js-cookie";

interface IShippingDetails {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress: string;
  apartment: string;
  country: string;
  city: string;
  zip: string;
  state: string;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: "100%",
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const CheckoutContainer = () => {
  const userId = Cookies.get("userId");
  const [shippingDetails, setShippingDetails] = useState<IShippingDetails>();
  const [isLoadingShippingDetails, setIsLoadingShippingDetails] =
    useState(true);
  const [progress, setProgress] = useState(17);
  const [isShipping, setIsShipping] = useState<boolean>(true);
  const [isDelivery, setIsDelivery] = useState<boolean>(false);
  const [isPayment, setIsPayment] = useState<boolean>(true);
  const [shippingEmail, setShippingEmail] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [shippingFirstName, setShippingFirstName] = useState("");
  const [shippingLastName, setShippingLastName] = useState("");
  const [shippingCompanyName, setShippingCompanyName] = useState("");
  const [shippingStreetAddress, setShippingStreetAddress] = useState("");
  const [shippingApartment, setShippingApartment] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingZip, setShippingZip] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingEmailError, setShippingEmailError] = useState(false);
  const [shippingPhoneError, setShippingPhoneError] = useState(false);
  const [shippingFirstNameError, setShippingFirstNameError] = useState(false);
  const [shippingLastNameError, setShippingLastNameError] = useState(false);
  const [shippingCompanyNameError, setShippingCompanyNameError] =
    useState(false);
  const [shippingStreetAddressError, setShippingStreetAddressError] =
    useState(false);
  const [shippingApartmentError, setShippingApartmentError] = useState(false);
  const [shippingCountryError, setShippingCountryError] = useState(false);
  const [shippingZipError, setShippingZipError] = useState(false);
  const [shippingCityError, setShippingCityError] = useState(false);
  const [shippingStateError, setShippingStateError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/order/shipping/${userId}`)
      .then((response) => {
        setShippingDetails(response.data.data);
        setShippingEmail(shippingDetails?.email || '');
        setShippingPhone(shippingDetails?.phone || '');
        setShippingFirstName(shippingDetails?.firstName || '');
        setShippingLastName(shippingDetails?.lastName || '');
        setShippingCompanyName(shippingDetails?.companyName || '');
        setShippingStreetAddress(shippingDetails?.streetAddress || '');
        setShippingApartment(shippingDetails?.apartment || '');
        setShippingCountry(shippingDetails?.country || '');
        setShippingZip(shippingDetails?.zip || '');
        setShippingCity(shippingDetails?.city || '');
        setShippingState(shippingDetails?.state || '');
        setIsLoadingShippingDetails(false);
        setLoading(false);
      })
      .catch((error) => {
        setIsLoadingShippingDetails(false);
        // Handle any error (e.g., show an error message)
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleShippingClick = () => {
    setProgress(45);
    setIsShipping(false);
    setIsDelivery(true);
  };


  const handleDeliveryClick = () => {
    setProgress(95);
    setIsShipping(false);
    setIsDelivery(false);
    setIsPayment(true);
  };

  const validateShippingStep = () => {
    let isValid = true
    if (!shippingEmail) {
      isValid = false
      setShippingEmailError(true);
    } else {
      
      setShippingEmailError(false);
    }

    if (!shippingPhone) {
      isValid = false
      setShippingPhoneError(true);
    } else {
      isValid = true
      setShippingPhoneError(false);
    }

    if (!shippingFirstName) {
      isValid = false
      setShippingFirstNameError(true);
    } else {
      isValid = true
      setShippingFirstNameError(false);
    }

    if (!shippingLastName) {
      isValid = false
      setShippingLastNameError(true);
    } else {
      isValid = true
      setShippingLastNameError(false);
    }

    if (!shippingCompanyName) {
      isValid = false
      setShippingCompanyNameError(true);
    } else {
      isValid = true
      setShippingCompanyNameError(false);
    }

    if (!shippingStreetAddress) {
      isValid = false
      setShippingStreetAddressError(true);
    } else {
      isValid = true
      setShippingStreetAddressError(false);
    }

    if (!shippingApartment) {
      isValid = false
      setShippingApartmentError(true);
    } else {
      isValid = true
      setShippingApartmentError(false);
    }

    if (!shippingCountry) {
      isValid = false
      setShippingCountryError(true);
    } else {
      isValid = true
      setShippingCountryError(false);
    }

    if (!shippingZip) {
      isValid = false
      setShippingZipError(true);
    } else {
      isValid = true
      setShippingZipError(false);
    }

    if (!shippingCity) {
      isValid = false
      setShippingCityError(true);
    } else {
      isValid = true
      setShippingCityError(false);
    }

    if (!shippingState) {
      isValid = false
      setShippingStateError(true);
    } else {
      isValid = true
      setShippingStateError(false);
    }

    if (shippingDetails?.email !== shippingEmail || shippingDetails?.phone !== shippingPhone || shippingDetails?.firstName !== shippingFirstName || shippingDetails.lastName !== shippingLastName || shippingDetails.companyName !== shippingCompanyName || shippingDetails.streetAddress !== shippingStreetAddress || shippingDetails.apartment !== shippingApartment || shippingDetails.country !== shippingCountry || shippingDetails.city !== shippingCity || shippingDetails.zip !== shippingZip  ) {
      axios.post('http://localhost:3000/order/add-shipping-details', {
        userId,
        email: shippingEmail,
        phone: shippingPhone,
        firstName: shippingFirstName,
        lastName: shippingLastName,
        companyName: shippingCompanyName,
        streetAddress: shippingStreetAddress,
        apartment: shippingApartment,
        country: shippingCountry,
        city: shippingCity,
        zip: shippingZip,
        state: shippingState,
      })
        .then((response) => {
          // Handle the successful update (e.g., show a success message)
        })
        .catch((error) => {
          // Handle any error (e.g., show an error message)
        });
    }

    if (isValid) {

      handleShippingClick();
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

  const stripePromise = loadStripe(STRIPE_API_KEY);
  return (
    <div>
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
      <img
        className="logo"
        alt="logo"
        src="https://img.bolt.com/x76/merchants/TYLER_S_logo_1643649722235826072.png"
      />
      <div className="checkout-steps-info">
        <p>1. Shipping</p>
        <p>2. Delivery</p>
        <p>3. Payment</p>
      </div>
      <BorderLinearProgress variant="determinate" value={progress} />
      {isShipping ? (
        <>
          <div>
            <div className="checkout-fields-container">
              <TextField
                placeholder="Email address"
                size="medium"
                id="outlined-select-currency"
                style={{ width: "48%", fontFamily: "Rubik" }}
                value={shippingEmail}
                onChange={(e) => {
                  setShippingEmail(e.target.value);
                  setShippingEmailError(false);
                }}
                error={shippingEmailError}
                helperText={shippingEmailError && "Email address is required"}
              />
              <TextField
                placeholder="Phone number"
                size="medium"
                id="outlined-select-currency"
                style={{ width: "48%", fontFamily: "Rubik" }}
                value={shippingPhone}
                onChange={(e) => {
                  setShippingPhone(e.target.value);
                  setShippingPhoneError(false);
                }}
                error={shippingEmailError}
                helperText={shippingPhoneError && "Phone number is required"}
              />
            </div>
            <div className="checkout-fields-container">
              <TextField
                placeholder="First name"
                size="medium"
                id="outlined-select-currency"
                style={{ width: "48%", fontFamily: "Rubik" }}
                value={shippingFirstName}
                onChange={(e) => {
                  setShippingFirstName(e.target.value);
                  setShippingFirstNameError(false);
                }}
                error={shippingFirstNameError}
                helperText={shippingFirstNameError && "First name is required"}
              />
              <TextField
                placeholder="Last name"
                size="medium"
                id="outlined-select-currency"
                style={{ width: "48%", fontFamily: "Rubik" }}
                value={shippingLastName}
                onChange={(e) => {
                  setShippingLastName(e.target.value);
                  setShippingLastNameError(false);
                }}
                error={shippingLastNameError}
                helperText={shippingLastNameError && "Last name is required"}
              />
            </div>
            <TextField
              fullWidth
              placeholder="Company name (optional)"
              size="medium"
              id="outlined-select-currency"
              style={{ fontFamily: "Rubik" }}
              value={shippingCompanyName}
              onChange={(e) => {
                setShippingCompanyName(e.target.value);
              }}
            />
            <div className="checkout-fields-container">
              <TextField
                placeholder="Street Address"
                size="medium"
                id="outlined-select-currency"
                style={{ width: "60%", fontFamily: "Rubik" }}
                value={shippingStreetAddress}
                onChange={(e) => {
                  setShippingStreetAddress(e.target.value);
                  setShippingStreetAddressError(false);
                }}
                error={shippingStreetAddressError}
                helperText={
                  shippingStreetAddressError && "Street address is required"
                }
              />
              <TextField
                placeholder="Country"
                size="medium"
                id="outlined-select-currency"
                style={{ width: "36%", fontFamily: "Rubik" }}
                value={shippingCountry}
                onChange={(e) => {
                  setShippingCountry(e.target.value);
                  setShippingCountryError(false);
                }}
                error={shippingCountryError}
                helperText={shippingCountryError && "Country is required"}
              />
            </div>
            <TextField
              fullWidth
              placeholder="Apartment, building, floor (optional)"
              size="medium"
              id="outlined-select-currency"
              style={{ fontFamily: "Rubik" }}
              value={shippingApartment}
              onChange={(e) => {
                setShippingApartment(e.target.value);
              }}
            />
            <div className="checkout-fields-container">
              <TextField
                placeholder="Zip"
                size="medium"
                id="outlined-select-currency"
                style={{ width: "32%", fontFamily: "Rubik" }}
                value={shippingZip}
                onChange={(e) => {
                  setShippingZip(e.target.value);
                  setShippingZipError(false);
                }}
                error={shippingZipError}
                helperText={shippingZipError && "Zip is required"}
              />
              <TextField
                placeholder="City"
                size="medium"
                id="outlined-select-currency"
                style={{ width: "32%", fontFamily: "Rubik" }}
                value={shippingCity}
                onChange={(e) => {
                  setShippingCity(e.target.value);
                  setShippingCityError(false);
                }}
                error={shippingCityError}
                helperText={shippingCityError && "City is required"}
              />
              <TextField
                placeholder="State"
                size="medium"
                id="outlined-select-currency"
                style={{ width: "32%", fontFamily: "Rubik" }}
                value={shippingState}
                onChange={(e) => {
                  setShippingState(e.target.value);
                  setShippingStateError(false);
                }}
                error={shippingStateError}
                helperText={shippingStateError && "State is required"}
              />
            </div>
          </div>
          <div className="checkout-btn-container">
            <Button
              onClick={validateShippingStep}
              style={{
                fontFamily: "Rubik",
                marginTop: "10px",
                backgroundColor: "#2753f4",
                width: "50%",
                padding: "10px",
              }}
              variant="contained"
            >
              CONTINUE
            </Button>
          </div>
        </>
      ) : null}
      {isDelivery ? (
        <>
          <div className="shipping-field-container">
            <div className="checkout-fields-container">
              <Radio
                value="b"
                name="radio-buttons"
                inputProps={{ "aria-label": "B" }}
              />
              <p>
                UPS Standard Ground (3-5 Business Days Delivery After Order
                Processing)
              </p>
            </div>
            <div className="checkout-fields-container">
              <Radio
                value="b"
                name="radio-buttons"
                inputProps={{ "aria-label": "B" }}
              />
              <p>
                UPS Economy Shipping (5-10 Day Delivery After Order Processing)
              </p>
            </div>
            <div className="checkout-fields-container">
              <Radio
                value="b"
                name="radio-buttons"
                inputProps={{ "aria-label": "B" }}
              />
              <p>
                UPS Expedited Shipping (1-3 Business Day Delivery After Order
                Processing)
              </p>
            </div>
            <TextareaAutosize
              placeholder="Order notes (optional)"
              style={{ width: "90%", padding: "20px" }}
            />
          </div>
          <div className="checkout-btn-container">
            <Button
              onClick={handleDeliveryClick}
              style={{
                fontFamily: "Rubik",
                marginTop: "10px",
                backgroundColor: "#2753f4",
                width: "50%",
                padding: "10px",
              }}
              variant="contained"
            >
      
              CONTINUE
            </Button>
          </div>
        </>
      ) : null}
      {isPayment && !isDelivery && !isShipping ? (
        <>
          <div className="shipping-field-container">
            <div className="checkout-fields-container">
              <Elements stripe={stripePromise}>
                <PaymentForm />
              </Elements>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CheckoutContainer;
