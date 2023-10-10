import axios from "axios";
import { REACT_APP_API_URL } from "../config/config";

export const fetchCart = async (userId: string) => {
  console.log(userId);
  try {
    // Send a GET request to retrieve all products
    const response = await axios.get(
      `${REACT_APP_API_URL}cart/get-cart/${userId}`
    );
    // console.log(response.data.data);
    return response
  } catch (error) {
    throw error;
  }
};

export const addProductToCart = async (
  productId: string,
  productName: string,
  price: number,
  quantity: number,
  image: string,
  userId: string
) => {
  try {
    if (userId) {
      const response = await axios.post(
        `${REACT_APP_API_URL}cart/add`,
        {
          userId,
          items: [
            {
              productId,
              productName,
              price,
              quantity,
              image,
            },
          ],
        }
      );
      return response;
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};


export const removeItemFromCart = async (userId: string, productId: string) => {
  try {
    if (userId) {
      const response = await axios.delete(
        `${REACT_APP_API_URL}cart/remove-item/${userId}/${productId}`
      );
      return response;
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
}