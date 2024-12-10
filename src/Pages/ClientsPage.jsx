import { Box, Typography } from "@mui/material";
import React from "react";
import SideNavbar from "../components/Sidebar";

const ClientsPage = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideNavbar />
        <Box sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
          <Typography
            variant="h6"
            sx={{
              marginBottom: 5,
              bgcolor: "#59a1ff",
              py: 1,
              px: 4,
              borderRadius: 3,
            }}
          >
            All Clients
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ClientsPage;
