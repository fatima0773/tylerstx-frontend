//  React Imports
import { useState } from "react";

// Splide Imports
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

import { Link } from "react-router-dom";
// Material UI Imports
import { Grid } from "@mui/material";

// Component Imports
import BackpackCard from "../../components/BackpackCard/BackpackCard";

// Style Imports
import "./Dashboard.css";

// Dashboard Page
const DashBoard = () => {
  const [backpacks] = useState([
    {
      id: 1,
      url: "https://i.shgcdn.com/c589b6c0-4132-442b-a985-3c16973e3743/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      title: "THE NORTH FACE",
      content: "SURGE BACKPACK",
    },
    {
      id: 2,
      url: "https://i.shgcdn.com/9adfa3fc-4573-4259-832b-05cc6152d598/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      title: "THE NORTH FACE",
      content: "BOREALIS BACKPACK",
    },
    {
      id: 3,
      url: "https://i.shgcdn.com/a30b3aea-9ce2-4f03-8d57-7eff567f7346/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      title: "THE NORTH FACE",
      content: "RECON BACKPACK",
    },
    {
      id: 4,
      url: "https://i.shgcdn.com/9adfa3fc-4573-4259-832b-05cc6152d598/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      title: "PATAGONIA",
      content: "REFUGIO 26L BACKPACK",
    },
    {
      id: 5,
      url: "https://i.shgcdn.com/95a8ec68-6fad-4e68-af94-2eb553f73806/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      title: "PATAGONIA",
      content: "REFUGIO 30L BACKPACK",
    },
    {
      id: 6,
      url: "https://i.shgcdn.com/da645787-b326-4fbf-8981-97bca89f1e9f/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      title: "PATAGONIA",
      content: "MONSTERA MASH SNAPPACK",
    },
    {
      id: 7,
      url: "https://i.shgcdn.com/6d1bd43d-717a-4cee-b7d4-ae4ca2775d4b/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      title: "JANSPORT",
      content: "DOUBLE BREAK BACKPACK",
    },
    {
      id: 8,
      url: "https://i.shgcdn.com/9adfa3fc-4573-4259-832b-05cc6152d598/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      title: "JANSPORT",
      content: "RIGHT PACK BACKPACK",
    },
    {
      id: 9,
      url: "https://i.shgcdn.com/855117d4-8692-48f2-bee7-2cf7f05d97c4/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      title: "The North Face",
      content: "SUPERBREAK PLUS",
    },
    {
      id: 10,
      url: "https://i.shgcdn.com/0ad20d94-db90-4eb4-a4c1-4d736ea1bd6a/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      title: "FJALLRAVEN",
      content: "KENKEN BACKPACK",
    },
    {
      id: 11,
      url: "https://i.shgcdn.com/38f2a091-c374-43ab-b844-f02f3407e101/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      title: "FJALLRAVEN",
      content: "RAINBOW MINI BACKPACK",
    },
    {
      id: 12,
      url: "https://i.shgcdn.com/f1097b42-a55c-49a1-8255-d2405b1bc844/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      title: "FJALLRAVEN",
      content: "KENKEN MINI BACKPACK",
    },
  ]);
  const brandCatalog = [
    {
      url: "https://i.shgcdn.com/c6576db7-e88d-432c-b7db-d1f66e5c6146/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      brand: "texas-hill-country-provisions",
    },
    {
      url: "https://i.shgcdn.com/1e6f5a2d-a90f-445f-989d-1ad0e105642a/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      brand: "z-supply",
    },
    {
      url: "https://i.shgcdn.com/bc9f5acd-00c7-4c16-ae71-825a4a801356/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      brand: "olukai",
    },
    {
      url: "https://i.shgcdn.com/60d7af68-797b-454b-b1a4-c9d3e10513d3/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      brand: "burlebo",
    },
    {
      url: "https://i.shgcdn.com/554c25d8-21e0-49b2-b2a1-718c50050e2b/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      brand: "free-people-movement",
    },
  ];
  const brandTees = [
    {
      brand: "Brand 1",
      imageUrl:
        "https://i.shgcdn.com/2ffd2bab-01b0-4682-acbb-5ea4206955d5/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
    },
    {
      brand: "Brand 2",
      imageUrl:
        "https://i.shgcdn.com/96b9f95b-896c-42a9-a3cd-43e0f77ab5e0/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
    },
    {
      brand: "Brand 3",
      imageUrl:
        "https://i.shgcdn.com/b93914a3-4ea2-4a8a-8576-302a3651661b/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
    },
    {
      brand: "Brand 4",
      imageUrl:
        "https://i.shgcdn.com/05dfcec8-09cb-4f99-826e-9828da8a5e6e/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
    },
    {
      brand: "Brand 5",
      imageUrl:
        "https://i.shgcdn.com/4828fe1d-42a3-4e0f-bd37-9f6fe0663b3b/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
    },
  ];
  return (
    <main className="layout">
      <div>
        <div className="banner-image">
          <div className="banner-heading-container">
            <h1 className="banner-heading">HOKA ONE ONE</h1>
            <h3 className="banner-subheading">
              EXPLORE THE LATEST RUNNING SHOES FROM HOKA INCLUDING THE BEST
              SELLER BONDI 8, CLIFTON 9, AND GAVIOTA 5
            </h3>
            <Link
              className="shop-levis-button"
              to="explore-shop/brand/hoka-one-one"
            >
              <p>SHOP HOKA</p>
            </Link>
          </div>
        </div>
      </div>
      <section className="brands-section">
        <div className="heading-container">
          <h2 className="heading">FEATURED BRANDS</h2>
        </div>
        <div className="brands-card-container">
          <div className="image-row">
            {brandCatalog.map((item, index) => (
              <Link
                key={index}
                to={`/explore-shop/brand/${item.brand}`}
                className="brands-section-card"
              >
                <img
                  className="brands-section-img"
                  alt={`southern shirts ${item.brand}`}
                  src={item.url}
                />
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="brands-card-container">
            <img
              className="sports-card"
              alt="southern shirts"
              src="https://i.shgcdn.com/1ba78f22-aa07-488b-9ea5-ad86b6c47afe/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
            />
            <img
              className="sports-card"
              alt="southern shirts"
              src="https://i.shgcdn.com/d83e22f2-6845-4336-87c3-4cdb15e4fe6d/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
            />
          </div>
        </div>
      </section>
      <section className="brands-section">
        <div className="heading-container">
          <h2 className="heading">FEATURED ACCESSORIES</h2>
        </div>
        <div className="backpack-slider">
          <Splide
            options={{
              type: "slide",
              perPage: 6,
              perMove: 6,
              rewind: true,
              arrows: true,
            }}
          >
            {backpacks.map((backpack) => (
              <SplideSlide key={backpack.id}>
                <BackpackCard
                  title={backpack.title}
                  content={backpack.content}
                  imageUrl={backpack.url}
                />
              </SplideSlide>
            ))}
          </Splide>
        </div>
        <div className="category-container">
          <div className="men-clothing-card" />
          <div className="women-clothing-card" />
          <div className="kids-clothing-card" />
        </div>
      </section>
      <section className="brands-section">
        <div className="heading-container">
          <h2 className="heading">TYLER'S TEES</h2>
        </div>
        <div className="brands-card-container">
          <div className="image-row">
            {brandTees.map((item, index) => (
              <Link
                key={index}
                to={`/explore-shop/category/tees`}
                className="brands-section-card"
              >
                <img
                  className="brands-section-img"
                  alt={`southern shirts ${item.brand}`}
                  src={item.imageUrl}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="about-section">
        <div className="about-card">
          <h3 className="about-heading">OUR PAST</h3>
          <div className="separator" />
          <p>
            We come from humble, hard working beginnings in Tyler, Texas in
            1978. Our first store, Racquet & Jog, was small and had just enough
            space to store and sell a couple of tennis racquets and a few pairs
            of Nike Tennis and Running shoes. Growing popularity with the local
            tennis and racquet ball clubs introduced the first ever "RJ Tee",
            now known by local Texans as "TYLER'S Tees".
          </p>
        </div>
        <div className="about-card">
          <h3 className="about-heading">OUR PRESENT</h3>
          <div className="separator" />
          <p>
            We stand by our heritage and commitment to high quality service
            alongside premium brands. Now carrying over 400 brands across our
            clothing, shoe, and accessory categories, our product selection
            offers a unique and crafted one-stop shopping experience. Visit our
            stores across Texas in Austin, Dallas, Fort Worth, The Woodlands,
            and Tyler and experience the best hospitality in Texas retail today!
          </p>
        </div>
        <div className="about-card">
          <h3 className="about-heading">OUR FUTURE</h3>
          <div className="separator" />
          <p>
            We're so grateful to call Texas home and to have so many supporters
            representing the TYLER'S brand, from wearing their local TYLER'S
            tees to those who have left us reviews and helped tell our story to
            friends and family. As we look forward, we're excited to be opening
            more TYLER'S locations across Texas in the very near future. Keep an
            eye out and stay tuned!
          </p>
        </div>
      </section>
      <section className="brands-section">
        <div className="heading-container">
          <h2 className="heading">TRENDING AT TYLER'S</h2>
        </div>
        <Grid container spacing={2} style={{ width: "90vw" }}>
          <Grid item xs={3}>
            <img
              className="trending-img"
              src="https://i.shgcdn.com/4836bdf5-be3d-460d-89e2-214d8e7d67d9/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
              alt="trending"
            />
          </Grid>
          <Grid item xs={3}>
            <img
              className="trending-img"
              src="https://i.shgcdn.com/949e640f-5008-43d8-9ef7-cd5589e25170/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
              alt="trending"
            />
          </Grid>
          <Grid item xs={3}>
            <img
              className="trending-img"
              src="https://i.shgcdn.com/991acf86-7782-4f7b-b6e9-f42e92629501/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
              alt="trending"
            />
          </Grid>
          <Grid item xs={3}>
            <img
              className="trending-img"
              src="https://i.shgcdn.com/7126f979-c7f9-4bbe-899e-5e0fcaeb3a16/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
              alt="trending"
            />
          </Grid>
          <Grid item xs={3}>
            <img
              className="trending-img"
              src="https://i.shgcdn.com/68c78d6e-7e57-4be5-839a-7ee786a3021b/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
              alt="trending"
            />
          </Grid>
          <Grid item xs={3}>
            <img
              className="trending-img"
              src="https://i.shgcdn.com/039c7597-a005-4822-8ec2-c8ebc6055b90/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
              alt="trending"
            />
          </Grid>
          <Grid item xs={3}>
            <img
              className="trending-img"
              src="https://i.shgcdn.com/69fccb89-5a9b-4221-8682-7511eb21568c/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
              alt="trending"
            />
          </Grid>
          <Grid item xs={3}>
            <img
              className="trending-img"
              src="https://i.shgcdn.com/005fe6d3-8a1c-4a20-b0f3-2e56622a7a19/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
              alt="trending"
            />
          </Grid>
        </Grid>
      </section>
    </main>
  );
};

export default DashBoard;
