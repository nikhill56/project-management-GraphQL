import { Stack, Typography } from "@mui/material";
import React from "react";
import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";

const ClientInfo = ({ client }) => {
  return (
    <>
      <Typography
        variant="h4"
        color="initial"
        sx={{ fontFamily: "DM Sans", fontSize: "28px", marginTop: "35px" }}
      >
        Client Information
      </Typography>
      <Stack spacing={2} justifyContent="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <FaIdBadge />
          <Typography
            variant="h6"
            color="initial"
            sx={{ fontFamily: "DM Sans" }}
          >
            {client.name}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <FaEnvelope />
          <Typography
            variant="h6"
            color="initial"
            sx={{ fontFamily: "DM Sans" }}
          >
            {client.email}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <FaPhone />
          <Typography
            variant="h6"
            color="initial"
            sx={{ fontFamily: "DM Sans" }}
          >
            {client.email}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default ClientInfo;
