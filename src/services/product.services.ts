import axios from "axios";
import { REACT_APP_API_URL } from "../config/config";

export const getAllProducts = async () => {
  try {
    // Send a GET request to retrieve all products
    const response = await axios.get(`${REACT_APP_API_URL}product/getAllProducts`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductsByCategory = async (category: string) => {
  const url = `${REACT_APP_API_URL}product/category/${category}/products`
  try {
    const response = await axios.get(url);
    return response.data;
    
  } catch (error) {
    console.log(error);
  }
}

export const getProductsByBrand = async (brand: string) => {
  const url = `${REACT_APP_API_URL}product/brand/${brand}/products`
  try {
    const response = await axios.get(url);
    return response.data;
    
  } catch (error) {
    console.log(error);
  }
}

export const getProducts = async (cateogry: string, categorizeBy: string) => {
  const url = `${REACT_APP_API_URL}product/${categorizeBy}/${cateogry}/products`
  try {
    const response = await axios.get(url);
    return response.data;
    
  } catch (error) {
    console.log(error);
  }
}

export const getProductById = async (id: string) => {
  const url = `${REACT_APP_API_URL}product/${id}`
  try {
    const response = await axios.get(url);
    return response.data;
    
  } catch (error) {
    console.log(error);
  }
}


