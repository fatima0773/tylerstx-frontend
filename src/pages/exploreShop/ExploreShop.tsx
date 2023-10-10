import { useState } from "react";
import { Box, Grid } from "@mui/material";
import "./ExploreShop.css";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../../services/product.services";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

interface Product {
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

const ExploreShop = () => {
  const { categoryName, categorizeBy } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  const getProductData = async () => {
    try {
      if (categoryName && categorizeBy) {
        const result = await getProducts(categoryName, categorizeBy);
        setProducts(result.data);
      }
    } catch (error) {
      console.error("Error retrieving products:", error);
    }
  };

  getProductData();

  const ProductCard = ({ product }: { product: Product }) => {
    const { name, variants, _id } = product;
    const firstVariant = variants[0];

    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Link to={`/product/${_id}`} className="product-card-link">
          <Box className="product-card">
            <img
              className="product-image"
              src={firstVariant.image[0]}
              alt={name}
            />
            <div className="product-details-container">
              <p className="brand-name"> {product.brand.name}</p>
              <p className="product-info">{name}</p>
              <p>
                {firstVariant.price.price} {firstVariant.price.currency}
              </p>
            </div>
          </Box>
        </Link>
      </Grid>
    );
  };

  return (
    <div className="page-layout">
      <Box sx={{ flexGrow: 1, p: 0 }}>
        <div className="refine-by-container">
          <h3 className="refine-by-heading">Refine By</h3>
          <div className="separator" />
          <p>No filters applied</p>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Collections" />
            <FormControlLabel control={<Checkbox />} label="Men" />
            <FormControlLabel control={<Checkbox />} label="More" />
            <FormControlLabel control={<Checkbox />} label="Youth" />
          </FormGroup>
        </div>
      </Box>
      <main>
        <Box
          sx={{ px: 7 }}
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p> {products[0]?.brand?.name}</p>
          {/* <select onChange={(e) => {}}>
            <option value="">Sort by</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select> */}
        </Box>
        <Box sx={{ p: 7 }}>
          <Grid container spacing={5}>
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default ExploreShop;
