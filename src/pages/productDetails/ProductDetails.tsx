import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Alert, Button, Snackbar } from "@mui/material";
import { getProductById } from "../../services/product.services";
import Cookies from "js-cookie";
import axios from "axios";
import { addProductToCart } from "../../services/cart.services";
import { REACT_APP_API_URL } from "../../config/config";

interface IProduct {
  tags: any;
  _id: string;
  name: string;
  brand: {
    id: string;
    name: string;
  };
  variants: {
    value: string;
    variantName: string;
    description: string;
    price: {
      price: number;
      currency: string;
      discountPercentage: number;
      discountedPrice: number;
    };
    stock: number;
    image: string[];
    reviews: {
      userId: string;
      comment: string;
      rating: number;
    };
    averageRating: number;
    tags: string[];
  }[];
}

const ProductDetails = () => {
  const [product, setProduct] = useState<IProduct>();
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const authState = Cookies.get("authState");
  const userId = Cookies.get("userId");
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const getProductData = async () => {
    try {
      if (productId) {
        const result = await getProductById(productId);
        setProduct(result);
      }
    } catch (error) {
      console.error("Error retrieving products:", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      if (userId && product && productId) {
        const response = await axios.post(
          'http://localhost:3000/cart/add',
          {
            userId,
            items: [
              {
                productId,
                productName: product.name,
                price: product.variants[0].price.price,
                quantity,
                image: product.variants[0].image[0],
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (response){
          if (response.status === 200) {
            setSuccess(true);
            setSuccessMsg('Product successfully added to the cart')
          } else {
            setShowError(true);
            setErrorMessage('There was an error adding the product to the cart')
          }

        } 

      } else {
        setShowError(true);
        setErrorMessage("Authentication or product data missing");
      }
    } catch (error) {
      setShowError(true);
            setErrorMessage('There was an error adding the product to the cart')
    }
  };

  getProductData();
  useEffect(() => {
    if (selectedImage === "" && product && product.variants[0].image[0]) {
      setSelectedImage(product.variants[0].image[0]);
    }
  }, [product]);


  const handleErrorClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setShowError(false);
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
    <div className="product-details">
     <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">{successMsg}</Alert>
      </Snackbar>
      <div className="image-section">
        {product ? (
          <div className="img-container">
            <div className="big-image">
              <img src={selectedImage} alt="Selected" />
            </div>
            <div className="small-images">
              {product.variants[0].image.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`product ${index}`}
                  className={selectedImage === image ? "active" : ""}
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {product ? (
        <div className="product-info-section">
          <p className="standard-text">${product.variants[0].price.price}</p>
          <h2 className="standard-text">{product.name}</h2>
          <p className="brand">{product.brand.name}</p>
          <p className="sub-text">Tags</p>
          <div className="variant-container">
            {product.tags.map((tag: string, index: number) => {
              return (
                <div className="variant-box" key={index}>
                  <p className="variant-text">{tag}</p>
                </div>
              );
            })}
          </div>
          {product.variants.length > 1 ? (
            <p className="sub-text">{product.variants[0].value}</p>
          ) : null}
          <p className="sub-text">{product.variants[0].value}</p>
          {product.variants.length > 1 ? (
            <div className="variant-container">
              {product.variants.map((variant, index) => (
                <div className="variant-box" key={index}>
                  <p className="variant-text">{variant.variantName}</p>
                </div>
              ))}
            </div>
          ) : null}
          <div className="separator" />
          <div className="row">
            <p style={{ margin: "10px" }}>Quantity</p>
            <div className="quantity-selector">
              <button className="quantity-btn" onClick={handleDecrement}>
                <BsChevronDown />
              </button>
              <span className="quantity-value">{quantity}</span>
              <button className="quantity-btn" onClick={handleIncrement}>
                <BsChevronUp />
              </button>
            </div>
          </div>
          <div className="separator" />
          <Button
            onClick={handleAddToCart}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{
              backgroundColor: "#c62032",
              color: "white",
            }}
          >
            ADD TO CART
          </Button>
          <p className="description-heading">Description</p>
          <p className="description-text">{product.variants[0].description}</p>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
