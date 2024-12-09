import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React from "react";

const SignUpPage = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            width: "25%",
            bgcolor: "slategray",
            p: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%", height: "100%", p: 2 }}>
            <Typography variant="h5">Already have an account</Typography>
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Button variant="outlined">Login</Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "80%", display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: "50%",
              minWidth: "450px",
              minHeight: "500px",
              height: "auto",
              bgcolor: "ivory",
            }}
          >
            Form Displays here
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignUpPage;
