// React Imports
import { useEffect, useState } from "react";

// Material UI Imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Router Dom Imports
import { useNavigate } from "react-router-dom";

// Component Imports
import "./SignUp.css";

// Services Imports
import { registerUser, sendOtp } from "../../../services/auth.services";
import { Alert, Snackbar } from "@mui/material";

// Signup component
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState<boolean>(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Please fill all the required fields"
  );
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [userFieldStep, setUserFieldStep] = useState<boolean>(false);
  const [continueNextStep, setContinueNextStep] = useState<boolean>(false);
  const [continueToOTP, setContinueToOTP] = useState<boolean>(false);
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [authError, setAuthError] = useState<boolean>(false);
  const [authErrMsg, setAuthErrMsg] = useState("");
  const [signupOtpContinue, setSignupOtpContinue] = useState<boolean>(false);
  const [otpFieldErrMsg, setOtpFieldErrMsg] = useState("");
  const [otpFieldErr, setOtpFieldErr] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showError) {
      setErrorMessage("");
      setContinueNextStep(false);
      if (!emailRegex.test(email)) {
        setEmailErr(true);
        setEmailErrMsg("Invalid email format");
      } else if (!passwordRegex.test(password)) {
        setErrorMessage("");
        setEmailErr(false);
        setPasswordErr(true);
        let errorMsg = "";
        if (!/(?=.*\d)/.test(password)) {
          errorMsg += "Password must contain at least one number";
        } else if (!/(?=.*[A-Z])/.test(password)) {
          errorMsg += "Password must contain at least one uppercase letter";
        } else if (!/(?=.*[a-z])/.test(password)) {
          errorMsg += "Password must contain at least one lowercase letter";
        } else if (!/(?=.*[\W_])/.test(password)) {
          errorMsg += "Password must contain at least one special character";
        } else if (password.length < 8) {
          errorMsg += "Password must be 8 charcters long";
        }
        setPasswordErrMsg(errorMsg);
      } else {
        setPasswordErrMsg("");
        setContinueNextStep(true);
        setShowError(false);
      }
    }
    if (email !== "") {
      setShowError(true);
    }

    if (userFieldStep) {
      if (firstName === "" || lastName === "") {
        setContinueToOTP(false);
        setShowError(true);
      } else {
        if (firstName !== "") {
          if (firstName.length < 3) {
            setShowError(true);
            setContinueToOTP(false);
            setErrorMessage("First name should be at least 3 characters");
          } else if (lastName !== "") {
            if (lastName.length < 3) {
              setShowError(true);
              setContinueToOTP(false);
              setErrorMessage("Last name should be at least 3 characters");
            }
          }
        }
        if (lastName.length >= 3 && firstName.length >= 3) {
          setContinueToOTP(true);
          setShowError(false);
          setErrorMessage("");
        }
      }
    }

    if (continueToOTP) {
      setSignupOtpContinue(false);
      setPasswordErr(false);
      setPasswordErrMsg("");
      if (emailOtp !== "") {
        if (emailOtp.length < 4) {
          setOtpFieldErrMsg("OTP should be 4 to 6 digits long");
        } else {
          setOtpFieldErr(true);
          setSignupOtpContinue(true);
          setOtpFieldErrMsg("");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    showError,
    setShowError,
    email,
    password,
    firstName,
    lastName,
    setAuthError,
    authError,
    emailOtp,
  ]);

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Regular expression for password validation
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;

  // Validates email, password, firstname and lastname
  const signUpValidations = () => {
    if (email === "") {
      setShowError(true);
      setErrorMessage("Please provide an email");
    } else if (password === "") {
      setShowError(true);
      setErrorMessage("Please provide a password");
    } else if (firstName === "") {
      setShowError(true);
      setErrorMessage("Please provide your first name");
    } else if (lastName === "") {
      setShowError(true);
      setErrorMessage("Please provide your last");
    } else if (!emailRegex.test(email)) {
      setShowError(true);
      setErrorMessage("Invalid email");
      return false;
    } else if (firstName.length < 3) {
      setShowError(true);
      setErrorMessage("First name should be at least 3 characters");
    } else if (lastName.length < 3) {
      setShowError(true);
      setErrorMessage("Last name should be at least 3 characters");
    } else if (!passwordRegex.test(password)) {
      setShowError(true);
      setErrorMessage(
        "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character"
      );
      return false;
    } else {
      handleSendOtp();
    }
  };

  // Sends OTP for user registration by hitting the API call in services.auth
  const handleSendOtp = async () => {
    try {
      // Send a request to send OTP
      const response = await sendOtp({ email: email });

      // Extract message and status from the response
      const message = response.data.message;
      const status = response.status;

      if (status === 200) {
        // If sending OTP is successful
        setShowError(false);
        setAuthError(false);
        setSuccessMessage(message);
        setShowOtpField(true); // Show OTP input field
      } else {
        // If sending OTP is not successful
        setSuccess(false);
        setAuthError(true);
        setAuthErrMsg(message);
      }
    } catch (error: any) {
      // Handle errors and set error-related state
      setSuccess(false);

      // Extract error message from the error response
      setAuthError(true);
      setAuthErrMsg(error.response.data.message);
      setShowOtpField(false); // Hide OTP input field
    }
  };

  // Registers user on valid OTP by hitting the API call in services.auth
  const handleRegisterUser = async () => {
    try {
      // Send a request to register the user
      const response = await registerUser({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        emailOtp: emailOtp,
      });

      // Extract message and status from the response
      const message = response.data.message;
      const status = response.status;

      if (status === 200) {
        // If user registration is successful
        setShowError(false);
        setAuthError(false);
        setSuccess(true);
        setSuccessMessage(message);

        // Redirect to a different page after a delay
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else if (status === 500) {
        // If user registration encounters a server error
        setSuccess(false);
        setAuthError(true);
        setAuthErrMsg(message);
      }
    } catch (error: any) {
      // Handle errors and set error-related state
      setSuccess(false);
      setAuthError(true);
      setAuthErrMsg(error.response.data.message);
      setContinueNextStep(false);
      setContinueToOTP(false);
      setShowOtpField(false);
      setUserFieldStep(false);
    }
  };

  const handleErrorClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAuthError(false);
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
    <div className="auth-container">
      <Snackbar
        open={authError}
        autoHideDuration={3000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error">{authErrMsg}</Alert>
      </Snackbar>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <>
            <Typography
              component="h1"
              variant="h5"
              style={{ fontFamily: "Poppins", marginBottom: "20px" }}
            >
              Sign Up
            </Typography>
            {showError === true ? (
              <div className="error-message-container">
                <p className="error-message">{errorMessage}</p>
              </div>
            ) : null}
          </>
          <>
            {showOtpField === false ? (
              <Grid container spacing={2}>
                {userFieldStep === true ? (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Grid>
                    <Button
                      fullWidth
                      disabled={!continueToOTP}
                      variant="contained"
                      sx={{ mt: 3, mb: 2, ml: 2 }}
                      onClick={signUpValidations}
                      style={{
                        backgroundColor: continueToOTP
                          ? "#c62032"
                          : "lightgrey",
                        fontFamily: "Poppins",
                        color: "white",
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {emailErr ? (
                        <p className="error-message">{emailErrMsg}</p>
                      ) : null}
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {passwordErr ? (
                        <p className="error-message">{passwordErrMsg}</p>
                      ) : null}
                    </Grid>
                    <Button
                      onClick={() => setUserFieldStep(true)}
                      fullWidth
                      variant="contained"
                      disabled={!continueNextStep}
                      sx={{ mt: 3, mb: 2, ml: 2 }}
                      style={{
                        backgroundColor: continueNextStep
                          ? "#c62032"
                          : "lightgrey",
                        fontFamily: "Poppins",
                        color: "white",
                      }}
                    >
                      Continue
                    </Button>
                  </>
                )}
              </Grid>
            ) : null}
          </>
          <>
            {showOtpField === true ? (
              <Grid container spacing={2}>
                <p className="standardText">
                  Please check your email and enter the OTP
                </p>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="emailOtp"
                    label="OTP"
                    name="OTP"
                    autoComplete="OTP"
                    value={emailOtp}
                    onChange={(e) => setEmailOtp(e.target.value)}
                  />
                  {otpFieldErr ? (
                    <p className="error-message">{otpFieldErrMsg}</p>
                  ) : null}
                <Button
                  onClick={handleRegisterUser}
                  disabled={!signupOtpContinue}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{
                    backgroundColor: signupOtpContinue
                      ? "#c62032"
                      : "lightgrey",
                    fontFamily: "Poppins",
                    color: "white",
                  }}
                >
                  Confirm otp
                </Button>
                </Grid>
              </Grid>
            ) : null}
          </>
        </Box>
      </div>
    </div>
  );
};

export default SignUp;
