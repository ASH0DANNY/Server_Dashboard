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
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import SideNavbar from "../components/Sidebar";
import styled from "@emotion/styled";

const HomePage = () => {
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

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideNavbar />
        <Box sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
          <Typography sx={{ marginBottom: 5 }}>Home Page</Typography>

          {/* Products Specification */}
          <Box sx={{ display: "flex", flexWrap: "wrap" }} gap={3}>
            {serverSpecification.map((item) => (
              <Card key={item.index} sx={{ minWidth: 345, minHeight: 400 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.tag}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", marginTop:3 }}>
                    <Table >
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
                <CardActions>
                  <Button size="small" sx={{ alignSelf: "center" }}>
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
