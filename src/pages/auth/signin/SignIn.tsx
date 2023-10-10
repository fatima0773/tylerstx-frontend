// React Imports
import { useEffect, useState } from "react";

// Material UI Imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Styles Imports
import "./SignIn.css";

// Router Dom Imports
import { useNavigate } from "react-router-dom";

// Services Imports
import {
  resetPassword,
  sendResetPassOtp,
  signIn,
} from "../../../services/auth.services";
import { Alert, Snackbar } from "@mui/material";

// Signin Component
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Please fill all the required fields"
  );
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [resetPasswordFields, setResetPasswordFields] = useState(false);
  const [resetPassOtp, setResetPassOtp] = useState("");
  const [showEmailField, setShowEmailField] = useState<boolean>(true);
  const [showResetPassOtpField, setShowResetPassOtpField] =
    useState<boolean>(false);
  const [showNewPassField, setShowNewPassField] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState("");
  const [continueNextStep, setContinueNextStep] = useState<boolean>(false);
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [authError, setAuthError] = useState<boolean>(false);
  const [authErrMsg, setAuthErrMsg] = useState("");
  const [resetPassContinue, setResetPassContinue] = useState<boolean>(false);
  const [resetOtpContinue, setResetOtpContinue] = useState<boolean>(false);
  const [resetPasswordSend, setResetPasswordSend] = useState<boolean>(false);
  const [otpFieldErr, setOtpFieldErr] = useState<boolean>(false);
  const [otpFieldErrMsg, setOtpFieldErrMsg] = useState("");
  useEffect(() => {
    if (resetPasswordFields) {
      setResetPassContinue(false);
      setEmailErr(false);
      setEmailErrMsg("");
      if (email !== "") {
        if (!emailRegex.test(email)) {
          setEmailErr(true);
          setEmailErrMsg("Invalid email format");
        } else {
          setEmailErrMsg("");
          setResetPassContinue(true);
          setEmailErr(false);
        }
      }
    }
    if (showResetPassOtpField === true) {
      setResetOtpContinue(false);
      setPasswordErr(false);
      setPasswordErrMsg("");
      if (resetPassOtp !== "") {
        if (resetPassOtp.length < 4) {
          setOtpFieldErrMsg("OTP should be 4 to 6 digits long");
        } else {
          setOtpFieldErr(true);
          setResetOtpContinue(true);
          setOtpFieldErrMsg("");
        }
      }
    }
    if (showNewPassField === true) {
      setResetPasswordSend(false);
      setPasswordErr(false);
      setPasswordErrMsg("");
      if (newPassword !== "") {
        setErrorMessage("");
        setPasswordErr(true);
        let errorMsg = "";
        if (!/(?=.*\d)/.test(newPassword)) {
          errorMsg += "New password must contain at least one number";
          setPasswordErrMsg(errorMsg);
        } else if (!/(?=.*[A-Z])/.test(newPassword)) {
          errorMsg += "New password must contain at least one uppercase letter";
          setPasswordErrMsg(errorMsg);
        } else if (!/(?=.*[a-z])/.test(newPassword)) {
          errorMsg += "New password must contain at least one lowercase letter";
          setPasswordErrMsg(errorMsg);
        } else if (!/(?=.*[\W_])/.test(newPassword)) {
          errorMsg +=
            "New password must contain at least one special character";
          setPasswordErrMsg(errorMsg);
        } else if (newPassword.length < 8) {
          errorMsg += "New password must be 8 charcters long";
          setPasswordErrMsg(errorMsg);
        } else {
          setResetPasswordSend(true);
          setPasswordErrMsg("");
          setResetOtpContinue(true);
          setPasswordErr(false);
        }
      }
    }
    if (
      showError &&
      showNewPassField === false &&
      showResetPassOtpField === false &&
      resetPasswordFields === false
    ) {
      setAuthErrMsg("");
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
          errorMsg += "Hint: Password must contain at least one number";
        } else if (!/(?=.*[A-Z])/.test(password)) {
          errorMsg +=
            "Hint: Password must contain at least one uppercase letter";
        } else if (!/(?=.*[a-z])/.test(password)) {
          errorMsg +=
            "Hint: Password must contain at least one lowercase letter";
        } else if (!/(?=.*[\W_])/.test(password)) {
          errorMsg +=
            "Hint: Password must contain at least one special character";
        } else if (password.length < 8) {
          errorMsg += "Hint: Password must be 8 charcters long";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    showError,
    setShowError,
    email,
    password,
    resetPasswordFields,
    resetPassOtp,
    newPassword,
    resetPasswordSend,
    showResetPassOtpField,
    showResetPassOtpField,
  ]);

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Send OTP by hitting the API call in services.auth
  const handleSendOtp = async () => {
    try {
      // Send a request to send Reset Password OTP
      const response = sendResetPassOtp({ email: email });

      // Extract message and status from the response
      const message = (await response).data.message;
      const status = (await response).status;

      if (status === 200) {
        // If sending OTP is successful
        setShowError(false);
        setAuthError(false);
        setSuccessMessage(message);
        setShowResetPassOtpField(true); // Show OTP input field
        setShowEmailField(false); // Hide email input field
      } else {
        // If sending OTP is not successful
        setAuthError(true);
        setAuthErrMsg(message);
      }
    } catch (error: any) {
      // Handle errors and set error-related state
      setSuccess(false);
      setAuthError(true);
      setAuthErrMsg(error.response.data.message);
    }
  };

  // Resets Password on valid OTP by hitting the API call in services.auth
  const handleResetPassword = async () => {
    try {
      // Send a request to reset the user's password
      const response = resetPassword({
        email: email,
        newPassword: newPassword,
        resetPassOtp: resetPassOtp,
      });

      // Extract message and status from the response
      const message = (await response).data.message;
      const status = (await response).status;

      if (status === 200) {
        // If password reset is successful
        setShowError(false);
        setSuccess(true);
        setSuccessMessage(message);
        setAuthError(false);

        // Redirect to a different page after a delay
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        // If password reset is not successful
        setAuthError(true);
        setAuthErrMsg(message);

        setShowResetPassOtpField(true);
        setShowNewPassField(false);
      }
    } catch (error: any) {
      // Handle errors and set error-related state
      setSuccess(false);
      setAuthError(true);
      setAuthErrMsg(error.response.data.message);

      setShowResetPassOtpField(true);
      setShowNewPassField(false);
    }
  };

  // Regular expression for password validation
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;

  // Authenticates user by hitting the API call in services.auth
  const handleSignIn = async () => {
    try {
      // Send a request to sign the user in
      const response = await signIn({ email: email, password: password });
      if (response) {
        const message = response.data.message;
        const status = response.status;

        if (status === 200) {
          // If sign in is successful
          setShowError(false);
          setAuthError(false);
          setSuccess(true);
          setSuccessMessage(message);
        } else {
          // If sign in is not successful
          setSuccess(false);
          setAuthError(true);
          setAuthErrMsg(message);
        }
      }
      // Extract message and status from the response
    } catch (error: any) {
      // Handle errors and set error-related state
      setSuccess(false);
      setAuthError(true);
      setAuthErrMsg(error.response.data.message);
    }
  };

  const handleErrorClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAuthError(false);
  };

  const handleSuccessClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
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
          <>
            {!resetPasswordFields ? (
              <Box
                style={{ padding: "10px" }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ fontFamily: "Poppins" }}
                >
                  Sign In
                </Typography>
                {showError === true ? (
                  <span className="error-message">{errorMessage}</span>
                ) : null}
                <Box component="form" noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
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
                    <Grid container justifyContent="flex-end">
                      <div
                        onClick={() => {
                          setEmail("");
                          setResetPasswordFields(true);
                        }}
                        className="link"
                      >
                        Forgot Password?
                      </div>
                    </Grid>
                  </Grid>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!continueNextStep}
                    onClick={handleSignIn}
                    style={{
                      backgroundColor: continueNextStep
                        ? "#c62032"
                        : "lightgrey",
                      fontFamily: "Poppins",
                      color: "white",
                    }}
                  >
                    Sign In
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Reset Password
                </Typography>
                <>
                  <>
                    {showResetPassOtpField === false &&
                    showEmailField === true &&
                    showNewPassField === false ? (
                      <Grid container spacing={2} sx={{ mt: 3 }}>
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
                        <Button
                          sx={{ mt: 3, mb: 2, ml: 2 }}
                          fullWidth
                          variant="contained"
                          onClick={handleSendOtp}
                          style={{
                            backgroundColor: resetPassContinue
                              ? "#c62032"
                              : "lightgrey",
                            fontFamily: "Poppins",
                            color: "white",
                          }}
                        >
                          Verify Email
                        </Button>
                      </Grid>
                    ) : null}
                  </>
                  {showResetPassOtpField === true &&
                  showEmailField === false &&
                  showNewPassField === false ? (
                    <Grid alignItems="center" justifyContent="center" container>
                      <p className="standardText">
                        Please check your email and enter the OTP
                      </p>
                      <Grid item xs={10}>
                        <TextField
                          required
                          fullWidth
                          id="emailOtp"
                          label="OTP"
                          name="OTP"
                          autoComplete="OTP"
                          value={resetPassOtp}
                          onChange={(e) => setResetPassOtp(e.target.value)}
                        />
                        {otpFieldErr ? (
                          <p className="error-message">{otpFieldErrMsg}</p>
                        ) : null}
                      <Button
                        disabled={!resetOtpContinue}
                        onClick={() => {
                          setShowResetPassOtpField(false);
                          setShowNewPassField(true);
                          setShowEmailField(false);
                          setPassword("");
                        }}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2}}
                        style={{
                          backgroundColor: resetOtpContinue
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
                  {showResetPassOtpField === false &&
                  showEmailField === false &&
                  showNewPassField === true ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="New Password"
                          label="New Password"
                          type="password"
                          id="New Password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {passwordErr ? (
                          <p className="error-message">{passwordErrMsg}</p>
                        ) : null}
                      </Grid>
                      <Button
                        onClick={handleResetPassword}
                        fullWidth
                        variant="contained"
                        disabled={!resetPasswordSend}
                        sx={{ mt: 3, mb: 2, ml: 2 }}
                        style={{
                          backgroundColor: resetPasswordSend
                            ? "#c62032"
                            : "lightgrey",
                          fontFamily: "Poppins",
                          color: "white",
                        }}
                      >
                        Reset Password
                      </Button>
                    </Grid>
                  ) : null}
                </>
              </Box>
            )}
          </>
        </div>
    </div>
  );
};

export default SignIn;
