import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import SideNavbar from "../components/Sidebar";

const HomePage = () => {
  const [order, setOrder] = useState([]);
  const [seletedproduct, setSeletedproduct] = useState({});
  const serverSpecification = [
    {
      index: 1,
      tag: "Best Seller",
      ram: "8 GB",
      memory: "256 GB",
      validity: "5 year",
      price: 3500,
    },
    {
      index: 2,
      tag: "Best Value",
      ram: "4 GB",
      memory: "256 GB",
      validity: "5 year",
      price: 4000,
    },
    {
      index: 3,
      tag: "Premium",
      ram: "16 GB",
      memory: "1 TB",
      validity: "10 year",
      price: 8500,
    },
    {
      index: 4,
      tag: "Standard",
      ram: "12 GB",
      memory: "512 GB",
      validity: "10 year",
      price: 6500,
    },
  ];

  function handleBuynowClick(item) {
    setSeletedproduct(item);
    setOrder([...order, seletedproduct]);
    console.log("Order details");
    console.log(item + item.tag);
    console.log("Orders" + order);

    setSeletedproduct({});
    return 0;
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideNavbar />
        <Box sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
          <Typography sx={{ marginBottom: 5 }}>Home Page</Typography>

          {/* Products Specification */}
          <Box
            sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
            gap={3}
          >
            {serverSpecification.map((item) => (
              <Card
                key={item.index}
                sx={{
                  minWidth: 345,
                  minHeight: 400,
                  ":hover": { bgcolor: "#e9f7ff" },
                }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.tag}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", marginTop: 3 }}
                  >
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Ram
                          </TableCell>
                          <TableCell align="right">{item.ram}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Memory
                          </TableCell>
                          <TableCell align="right">{item.memory}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Validity
                          </TableCell>
                          <TableCell align="right">{item.validity}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Price
                          </TableCell>
                          <TableCell align="right">{item.price}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 3 }}
                    onClick={() => handleBuynowClick(item)}
                  >
                    Buy Now
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
