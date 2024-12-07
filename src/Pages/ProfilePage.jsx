import React from "react";
import SideNavbar from "../components/Sidebar";
import { Box, Typography } from "@mui/material";

const ProfilePage = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideNavbar />
        <Box sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
          <Typography sx={{ marginBottom: 5 }}>Profile Page</Typography>
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
