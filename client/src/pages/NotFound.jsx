import { Button, Typography } from "@mui/material";
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "200px",
      }}
    >
      <FaExclamationTriangle size="5em" color="red" />
      <Typography variant="h2">404</Typography>
      <Typography variant="subtitle1" color="initial">
        Sorry this page does not exist
      </Typography>

      <Button component={Link} to="/" sx={{ border: "1px solid #313bac",marginTop:"10px" }}>
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;
