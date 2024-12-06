import React from "react";
import SideNavbar from "../components/Sidebar";
import { Box, Typography } from "@mui/material";

const OrderPage = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideNavbar />
        <Box sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
          <Typography sx={{ marginBottom: 5 }}>Orders Page</Typography>
        </Box>
      </Box>
    </>
  );
};

export default OrderPage;
