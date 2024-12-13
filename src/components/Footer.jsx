import { Box } from "@mui/material";
import React from "react";

const DashboardFooter = () => {
  return (
    <>
      <Box
        sx={{
          mt: 3,
          width: "100%",
          bgcolor: "#f2f2f2",
          height: 60,
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "small",
          wordSpacing: 2,
          letterSpacing: 2,
        }}
      >
        vpsmaster.in &copy; Allright Reserved 2024
      </Box>
    </>
  );
};

export default DashboardFooter;
