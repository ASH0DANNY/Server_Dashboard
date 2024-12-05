import { Box, Card, CardContent } from "@mui/material";
import React from "react";

const HomePage = () => {
  const serverSpecification = [
    { index: 1, ram: 8, memory: 256, validity: "5 year", price: 3500 },
    { index: 2, ram: 8, memory: 512, validity: "5 year", price: 4000 },
    { index: 3, ram: 8, memory: 512, validity: "10 year", price: 6500 },
    { index: 4, ram: 16, memory: 512, validity: "10 year", price: 8500 },
  ];
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }} gap={3}>
      {serverSpecification.map((item) => (
        <Card key={item.index} sx={{ minWidth: 300 }}>
          <CardContent>
            <h2>{item.index}</h2>
            <p>{item.ram}</p>
            <p>{item.memory}</p>
            <p>{item.validity}</p>
            <p>{item.price}</p>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default HomePage;
