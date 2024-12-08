import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
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
            Products
          </Typography>

          {/* Products Specification */}
          <Box
            sx={{
              marginTop: 6,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }} 
            gap={3}
          >
            {serverSpecification.map((item, index) => (
              <Card
                key={item.index}
                sx={[
                  {
                    minWidth: 345,
                    minHeight: 400,
                    ":hover": { bgcolor: "#e9d6ff" },
                  },
                ]}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <Chip
                      variant="outlined"
                      color="info"
                      icon={<BookmarkIcon />}
                      label={item.tag}
                    />
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
