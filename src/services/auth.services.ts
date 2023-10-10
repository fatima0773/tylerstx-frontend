// Axois Import
import axios from "axios";

// Cookies Import
import Cookies from "js-cookie";
import { REACT_APP_API_URL } from "../config/config";

/**
 * Sends OTP to user's email before registering a user
 * @param email - The user's email address
 * @returns Response from the server
 */
export const sendOtp = async ({ email }: { email: string }) => {
  try {
    // Send a POST request to send OTP
    const response = await axios.post(`${REACT_APP_API_URL}user/send-signup-otp`, { email });

    // Set the token cookie with a 7-day expiry
    Cookies.set('token', response.data.result.token, { expires: 7 });
    return response
  } catch (error) {
    throw error
  }
}

/**
 * Registers a user on providing valid OTP
 * @param email - The user's email address
 * @param password - The user's password
 * @param firstName - The user's first name
 * @param lastName - The user's last name
 * @param emailOtp - The OTP received on the user's email
 * @returns Response from the server
 */
export const registerUser = async ({
  email, password, firstName, lastName, emailOtp
}: {
  email: string,
  password: string,
  firstName: string, 
  lastName: string,
  emailOtp: string}) => {
  try {
    // Send a POST request to register the user
    const response = await axios.post(`${REACT_APP_API_URL}user/signup`, {
      email,
      password,
      firstName,
      lastName,
      otp: emailOtp,
    });
    console.log(response.data.userId)
    // Cookies.set('token', response.data.result.token, { expires: 7 });
    Cookies.set('authState', 'signedIn');
    Cookies.set('userId', response.data.userId);
    return response;
  } catch (error) {
    throw error;
  } 
}

/**
 * Signs the user in using email and password with a valid token
 * @param email - The user's email address
 * @param password - The user's password
 * @returns Response from the server
 */
export const signIn = async ({ email, password }: {email: string, password: string}) => {
  try {
    // Get the user's token from the cookie
    const userToken = Cookies.get('token');

    // Send a POST request to sign the user in
    const response = await axios.post(`${REACT_APP_API_URL}user/signin`, {
      email,
      password,
      token: userToken
    });
    Cookies.set('authState', 'signedIn');
    Cookies.set('userId', response.data.userId);
    return response
  } catch (error) {
    throw error
  }
}

/**
 * Sends Reset Password OTP to the user's email
 * @param email - The user's email address
 * @returns Response from the server
 */
export const sendResetPassOtp = async ({ email }: { email: string }) => {
  try {
    // Get the user's token from the cookie
    const userToken = Cookies.get('token');

    // Send a POST request to send Reset Password OTP
    const response = await axios.post(`${REACT_APP_API_URL}user/reset-password-otp`, { 
      email,
      token: userToken
    });
    return response
  } catch (error) {
    throw error
  }
}

/**
 * Resets the user's password on providing a valid OTP and token
 * @param email - The user's email address
 * @param newPassword - The new password to be set
 * @param resetPassOtp - The OTP received for resetting password
 * @returns Response from the server
 */
export const resetPassword = async ({ email, newPassword, resetPassOtp }: { email: string, newPassword: string, resetPassOtp: string }) => {
  try {
    // Get the user's token from the cookie
    const userToken = Cookies.get('token');
    // Send a POST request to reset the password
    const response = await axios.post(`${REACT_APP_API_URL}user/reset-password`, {
      email,
      newPassword,
      otp: resetPassOtp,
      token: userToken
    });

    Cookies.set('authState', 'signedIn');
    return response
  } catch (error) {
    throw error
  }
}