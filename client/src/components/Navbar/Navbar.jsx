import React from "react";
import "./Navbar.scss";
import logo from "../../assets/logo.png";
import Typography from "@mui/material/Typography";
const Navbar = () => {
  return (
    <nav className="app__navbar">
      <div className="app__navbar_logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="">
        <Typography variant="h4" color="initial" fontFamily="DM Sans">
          Project Management
        </Typography>
      </div>
    </nav>
  );
};

export default Navbar;
