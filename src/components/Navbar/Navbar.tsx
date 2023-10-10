// React Imports
import { useEffect, useRef, useState } from "react";

// Material UI Imports
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import FastForwardSharpIcon from "@mui/icons-material/FastForwardSharp";
import LocalShippingSharpIcon from "@mui/icons-material/LocalShippingSharp";
import ShoppingBagSharpIcon from "@mui/icons-material/ShoppingBagSharp";

import { Button, Link, Typography } from "@mui/material";
import Cookies from "js-cookie";
import SignUp from "../../pages/auth/signup/SignUp";
import SignIn from "../../pages/auth/signin/SignIn";

import "./Navbar.css";
import Modal from "@mui/material/Modal";
import CartView from "../CartView/CartView";

// Search Component
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 10,
  backgroundColor: "white",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  color: "gray",
  borderColor: "#000",
}));

// Search Icon Wrapper
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#000",
}));

// Styled Input Base
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#000",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

// Navbar Styles
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  boxShadow: 24,
  borderRadius: 3,
  // p: 4,
  flexDirection: "row",
  display: "flex",
  alignItems: "center",
  width: "55%",
};

// Navbar Component
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [womenAnchorEl, setWomenAnchorEl] = useState(null);
  const authState = Cookies.get("authState");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const [tylerAnchorEl, setTylerAnchorEl] = useState(null);
  const [menAnchorEl, setMenAnchorEl] = useState(null);
  const [youthAnchorEl, setYouthAnchorEl] = useState(null);
  const [shoesAnchorEl, setShoesAnchorEl] = useState(null);
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showSignUpPopup, setShowSignUpPopUp] = useState(false);
  const [showSignInPopup, setShowSignInPopUp] = useState(false);
  const [cartPopoverAnchorEl, setCartPopoverAnchorEl] = useState(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [openCheckout, setOpenCheckout] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCheckoutOpen = () => setOpenCheckout(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCheckoutClose = () => {
    setOpenCheckout(false);
  };
  const [cartMenuOpen, setCartMenuOpen] = useState(false);

  const toggleCartMenu = (event: any) => {
    setCartMenuOpen(!cartMenuOpen);
    setCartPopoverAnchorEl(event.currentTarget);
  };

  const handleCartPopoverOpen = (event: any) => {
    setCartPopoverAnchorEl(event.currentTarget);
  };

  const handleCartPopoverClose = () => {
    setCartPopoverAnchorEl(null);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setShowSignInPopUp(false);
    setShowSignUpPopUp(false);
    setOpen(false);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleTylerMenuClose = () => {
    setTylerAnchorEl(null);
  };
  const handleTylerMenuOpen = (event: any) => {
    setTylerAnchorEl(event.currentTarget);
  };

  const handleWomenMenuClose = () => {
    setWomenAnchorEl(null);
  };
  const handleWomenMenuOpen = (event: any) => {
    setWomenAnchorEl(event.currentTarget);
  };

  const handleMenMenuClose = () => {
    setMenAnchorEl(null);
  };
  const handleMenMenuOpen = (event: any) => {
    setMenAnchorEl(event.currentTarget);
  };

  const handleYouthMenuClose = () => {
    setYouthAnchorEl(null);
  };
  const handleYouthMenuOpen = (event: any) => {
    setYouthAnchorEl(event.currentTarget);
  };

  const handleShoesMenuClose = () => {
    setShoesAnchorEl(null);
  };

  const handleShoesMenuOpen = (event: any) => {
    setShoesAnchorEl(event.currentTarget);
  };

  const handleSearchMenuClose = () => {
    setSearchAnchorEl(null);
  };

  const handleSearchMenuOpen = (event: any) => {
    setSearchAnchorEl(event.currentTarget);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const textStyle = {
    color: isHovered ? "red" : "#000",
    paddingLeft: "10px",
    transition: "color 0.3s ease-in-out",
    textDecoration: "none",
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const signUpPopupRef = useRef<HTMLDivElement | null>(null);
  const signInPopupRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleSignUpClickOutside);
    document.addEventListener("mousedown", handleSignInClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleSignUpClickOutside);
      document.removeEventListener("mousedown", handleSignInClickOutside);
    };
  }, []);

  const handleSignUpClickOutside = (event: MouseEvent) => {
    // If the clicked element is outside of the signup popup, close the popup
    if (
      signUpPopupRef.current &&
      !signUpPopupRef.current.contains(event.target as Node)
    ) {
      setShowSignUpPopUp(false);
    }
  };

  const handleSignInClickOutside = (event: MouseEvent) => {
    // If the clicked element is outside of the signup popup, close the popup
    if (
      signInPopupRef.current &&
      !signInPopupRef.current.contains(event.target as Node)
    ) {
      setShowSignInPopUp(false);
    }
  };

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {authState === "signedIn" ? (
        <MenuItem
          style={{ fontFamily: "Poppins", color: "#c62032" }}
          onClick={handleMenuClose}
        >
          <Button
            onClick={() => {
              Cookies.set("authState", "signedOut");
            }}
            style={{
              color: "#c62032",
              fontFamily: "Poppins",
              fontSize: 15,
              textDecoration: "none",
            }}
          >
            Sign Out
          </Button>
        </MenuItem>
      ) : (
        <>
          <MenuItem
            style={{ fontFamily: "Poppins", color: "#c62032" }}
            onClick={handleMenuClose}
          >
            <Link
              style={{
                color: "#c62032",
                fontFamily: "Poppins",
                fontSize: 15,
                textDecoration: "none",
              }}
              href="/sign-up"
            >
              Sign Up
            </Link>
          </MenuItem>
          <MenuItem
            style={{ fontFamily: "Poppins", color: "#c62032" }}
            onClick={handleMenuClose}
          >
            <Link
              style={{
                color: "#c62032",
                fontFamily: "Poppins",
                fontSize: 15,
                textDecoration: "none",
              }}
              href="/sign-in"
            >
              Sign In
            </Link>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem style={{ color: "#c62032" }}>
        <IconButton
          size="large"
          style={{ color: "#c62032" }}
          onClick={handleCartPopoverOpen}
        >
          <Badge>
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
        <p style={{ fontFamily: "Poppins", color: "#c62032" }}>Shopping Cart</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          style={{ color: "#c62032" }}
        >
          <AccountCircle />
        </IconButton>
        <p style={{ fontFamily: "Poppins", color: "#c62032" }}>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <AppBar
        position="static"
        style={{
          backgroundColor: "white",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Toolbar style={{ width: "100%", borderBottom: "0.3px solid grey" }}>
          <Box style={{ marginLeft: "190px", flex: 1 }}>
            <Typography
              style={textStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              512-407-9926 | Free Shipping on Orders $75+
            </Typography>
          </Box>
          <Box
            sx={{ display: { xs: "none", md: "flex" } }}
            style={{
              flex: 1,
              justifyContent: "flex-end",
              paddingRight: "190px",
            }}
          >
            {authState === "signedIn" ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                style={{ color: "#c62032" }}
              >
                <AccountCircle />
              </IconButton>
            ) : (
              <Toolbar>
                <Button
                  onClick={() => {
                    handleOpen();
                    setShowSignUpPopUp(true);
                  }}
                >
                  <p style={textStyle}>Create Account</p>
                </Button>
                <span> | </span>
                <Button
                  style={textStyle}
                  onClick={() => {
                    handleOpen();
                    setShowSignInPopUp(true);
                  }}
                >
                  <p style={textStyle}>Sign In</p>
                </Button>
              </Toolbar>
            )}
          </Box>
        </Toolbar>
        <Toolbar style={{ width: "80%", padding: "10px" }}>
          <Link
            sx={{
              display: { xs: "none", sm: "block" },
              mx: 0,
              margin: 0,
              padding: 0,
            }}
            href="/"
          >
            <img
              alt="logo"
              src="https://cdn11.bigcommerce.com/s-ppsyskcavg/images/stencil/250x50/tylers-250x50_1681740713__21362.original.png"
            />
          </Link>
          <Toolbar>
            <Typography
              variant="h6"
              style={{ cursor: "pointer", color: "black" }}
              onMouseEnter={handleTylerMenuOpen}
            >
              Tylers
            </Typography>
            <Menu
              anchorEl={tylerAnchorEl}
              open={Boolean(tylerAnchorEl)}
              onClose={handleTylerMenuClose}
              PaperProps={{
                style: {
                  width: "100%",
                },
              }}
              onMouseLeave={handleTylerMenuClose}
            >
              <MenuItem sx={{ p: 2 }}>
                <Link
                  href="/explore-shop/brand/texas-hill-country-provisions"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Texas Hill Country
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  href=""
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Tee Shirts
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  href=""
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Hats
                </Link>
              </MenuItem>
            </Menu>
          </Toolbar>
          <Toolbar>
            <Typography
              variant="h6"
              style={{ cursor: "pointer", color: "black" }}
              onMouseEnter={handleWomenMenuOpen}
            >
              Women
            </Typography>
            <Menu
              anchorEl={womenAnchorEl}
              open={Boolean(womenAnchorEl)}
              onClose={handleWomenMenuClose}
              PaperProps={{
                style: {
                  width: "100%",
                },
              }}
              onMouseLeave={handleWomenMenuClose}
            >
              <MenuItem sx={{ p: 2 }}>
                <Link
                  href="/explore-shop/category/women"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Women
                </Link>
              </MenuItem>
            </Menu>
          </Toolbar>
          <Toolbar>
            <Typography
              variant="h6"
              style={{ cursor: "pointer", color: "black" }}
              onMouseEnter={handleMenMenuOpen}
            >
              Men
            </Typography>
            <Menu
              anchorEl={menAnchorEl}
              open={Boolean(menAnchorEl)}
              onClose={handleMenMenuClose}
              PaperProps={{
                style: {
                  width: "100%",
                  flexDirection: "row",
                },
              }}
              onMouseLeave={handleMenMenuClose}
            >
              <MenuItem sx={{ p: 2 }}>
                <Link
                  href="/explore-shop/category/men"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Men
                </Link>
              </MenuItem>
            </Menu>
          </Toolbar>
          <Toolbar>
            <Typography
              variant="h6"
              style={{ cursor: "pointer", color: "black" }}
              onMouseEnter={handleYouthMenuOpen}
            >
              Youth
            </Typography>
            <Menu
              anchorEl={youthAnchorEl}
              open={Boolean(youthAnchorEl)}
              onClose={handleYouthMenuClose}
              PaperProps={{
                style: {
                  width: "100%",
                },
              }}
              onMouseLeave={handleYouthMenuClose}
            >
              <MenuItem sx={{ p: 2 }}>
                <Link
                  href="/explore-shop/category/youth"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Youth
                </Link>
              </MenuItem>
            </Menu>
          </Toolbar>
          <Toolbar>
            <Typography
              variant="h6"
              style={{ cursor: "pointer", color: "black" }}
              onMouseEnter={handleShoesMenuOpen}
            >
              Shoes
            </Typography>
            <Menu
              anchorEl={shoesAnchorEl}
              open={Boolean(shoesAnchorEl)}
              onClose={handleShoesMenuClose}
              PaperProps={{
                style: {
                  width: "100%",
                },
              }}
              onMouseLeave={handleShoesMenuClose}
            >
              <MenuItem sx={{ p: 2 }}>
                <Link
                  href="/explore-shop/category/shoes"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Shoes
                </Link>
              </MenuItem>
            </Menu>
          </Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={handleSearchMenuOpen}>
            <Badge style={{ color: "#000" }}>
              <SearchIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={searchAnchorEl}
            open={Boolean(searchAnchorEl)}
            onClose={handleSearchMenuClose}
            PaperProps={{
              style: {
                width: "100%",
              },
            }}
            onMouseLeave={handleSearchMenuClose}
          >
            <Search
              style={{
                width: "90%",
                backgroundColor: "white",
                boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.1)",
                border: "0.5px solid #000",
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search the store"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Menu>
          <IconButton size="large" color="inherit" onClick={toggleCartMenu}>
            <Badge style={{ color: "#000" }}>
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
          <Menu
            style={{ width: "30%" }}
            anchorEl={cartPopoverAnchorEl}
            open={Boolean(cartPopoverAnchorEl)}
            onDoubleClick={handleCartPopoverClose}
          >
            <CartView />
          </Menu>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            style={{ color: "#000" }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              style={{ color: "#c62032" }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div style={{ marginTop: "50px" }}>
          <img
            src="https://cdn11.bigcommerce.com/s-ppsyskcavg/images/stencil/250x50/tylers-250x50_1681740713__21362.original.png"
            alt="logo"
          />
        </div>
        <List
          style={{
            paddingRight: "150px",
            paddingLeft: "20px",
            marginTop: "20px",
          }}
        >
          <ListItem
            onClick={() => {
              setIsDrawerOpen(false);
            }}
          >
            <Link
              style={{
                color: "#c62032",
                fontFamily: "Poppins",
                fontSize: 15,
                textDecoration: "none",
              }}
              href="/explore-shop"
            >
              TYLER'S
            </Link>
          </ListItem>
          <ListItem
            onClick={() => {
              setIsDrawerOpen(false);
            }}
          >
            <Link
              style={{
                color: "#c62032",
                fontFamily: "Poppins",
                fontSize: 15,
                textDecoration: "none",
              }}
              href="/women"
            >
              WOMEN
            </Link>
          </ListItem>
          <ListItem
            onClick={() => {
              setIsDrawerOpen(false);
              // Handle the click action for the menu item
            }}
          >
            <Link
              style={{
                color: "#c62032",
                fontFamily: "Poppins",
                fontSize: 15,
                textDecoration: "none",
              }}
              href="/men"
            >
              MEN
            </Link>
          </ListItem>
          <ListItem
            onClick={() => {
              setIsDrawerOpen(false);
            }}
          >
            <Link
              style={{
                color: "#c62032",
                fontFamily: "Poppins",
                fontSize: 15,
                textDecoration: "none",
              }}
              href="/youth"
            >
              YOUTH
            </Link>
          </ListItem>
          <ListItem
            onClick={() => {
              setIsDrawerOpen(false);
              // Handle the click action for the menu item
            }}
          >
            <Link
              style={{
                color: "#c62032",
                fontFamily: "Poppins",
                fontSize: 15,
                textDecoration: "none",
              }}
              href="/shoes"
            >
              SHOES
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List></List>
      </Drawer>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="info-container">
              <img
                className="logo"
                alt="logo"
                src="https://img.bolt.com/x76/merchants/TYLER_S_logo_1643649722235826072.png"
              />
              <br /> <br /> <br /> <br />
              <div className="col">
                <FastForwardSharpIcon style={{ padding: "20px" }} />
                <div>
                  <p>
                    <strong>Check out faster with saved info</strong>
                  </p>
                  <p>
                    Get a one-click, passwordless experience that <br /> allows
                    you to effortlessly complete your purchase.
                  </p>
                </div>
              </div>
              <div className="col">
                <LocalShippingSharpIcon style={{ padding: "20px" }} />
                <div>
                  <p>
                    <strong>Track your orders easily</strong>
                  </p>

                  <p>
                    Get peace of mind with real-time delivery <br /> status
                    updates and comprehensive tracking details.
                  </p>
                </div>
              </div>
              <div className="col">
                <ShoppingBagSharpIcon style={{ padding: "20px" }} />
                <div>
                  <p>
                    <strong>Enjoy a personalized shopping experience</strong>
                  </p>
                  <p>
                    Explore curated product recommendations <br /> that match
                    your style.
                  </p>
                </div>
              </div>
            </div>
            {showSignUpPopup ? <SignUp /> : null}
            {showSignInPopup ? <SignIn /> : null}
          </Box>
        </Modal>
      </div>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Navbar;
