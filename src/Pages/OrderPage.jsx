import React, { useEffect, useState } from "react";
import SideNavbar from "../components/Sidebar";
import {
  Box,
  Button,
  Chip,
  Dialog,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../Firebase";
import AllOrders from "../components/AllOrders";
import DashboardFooter from "../components/Footer";

const OrderPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [userOrders, setUserOrders] = useState(null);
  const [user, setUser] = useState("");

  //Testing Starts
  const IsUser = () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log(docSnap.data());

        setUserDetails(docSnap.data());
        let isuser = await userDetails.accessType;
        setUser(isuser);
        // console.log("userDetails.accessType: " + isuser);
      } else {
        console.log("User is not logged in");
      }
    });
  };

  IsUser();
  // Testing Ends

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    // const user = auth.currentUser;
    auth.onAuthStateChanged(async (user) => {
      try {
        const userRef = collection(db, "users");
        const docRef = doc(userRef, user.uid);
        const docSnap = await getDoc(docRef);
        const ordersRef = collection(docRef, "orders");

        if (docSnap.exists()) {
          // setUserDetails(docSnap.data());
          // console.log("userDetails: " + userDetails);
          // let isuser = await userDetails.accessType;
          // setUser(isuser);
          // console.log("is user:" + user);

          //getting orders data
          const orderSnap = await getDocs(ordersRef);
          if (orderSnap) {
            setUserOrders(
              orderSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
            // console.log("userOrders: ");
            // console.log(userOrders);
          } else {
            console.log("No order found of this user");
          }
        } else {
          console.log("User is not logged in");
        }
      } catch (error) {
        console.log(error.message);
      }
    });
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideNavbar />
        <Box sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
          <Box sx={{ minHeight: "75vh" }}>
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
              {user === "admin" ? `All Clients` : `Your Orders`}
            </Typography>

            {user === "admin" ? (
              <>
                {/* All orders table */}
                <AllOrders />
              </>
            ) : (
              <>
                {/* User orders */}
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead style={{ backgroundColor: "#d1d1d1" }}>
                      <TableRow>
                        <TableCell style={{ maxWidth: 180 }} align="center">
                          #
                        </TableCell>
                        <TableCell style={{ minWidth: 120 }} align="center">
                          Date
                        </TableCell>
                        <TableCell style={{ minWidth: 120 }} align="center">
                          OrderValue
                        </TableCell>
                        <TableCell style={{ minWidth: 120 }} align="center">
                          ProductId
                        </TableCell>
                        <TableCell style={{ minWidth: 120 }} align="center">
                          Status
                        </TableCell>
                        <TableCell style={{ minWidth: 180 }} align="center">
                          S Username
                        </TableCell>
                        <TableCell style={{ minWidth: 180 }} align="center">
                          S Password
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    {userOrders !== null ? (
                      <TableBody>
                        {userOrders.map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="center">{row.id}</TableCell>
                            <TableCell align="center">
                              {row.orderDate}
                            </TableCell>
                            <TableCell align="center">
                              {row.orderValue}
                            </TableCell>
                            <TableCell align="center">
                              {row.productId}
                            </TableCell>
                            <TableCell align="center">
                              {row.serverUname === "" ? (
                                <Chip
                                  variant="outlined"
                                  color="error"
                                  size="small"
                                  label="pending"
                                  icon={
                                    <FiberManualRecordIcon fontSize="small" />
                                  }
                                />
                              ) : (
                                <Chip
                                  variant="outlined"
                                  color="success"
                                  size="small"
                                  label="completed"
                                  icon={
                                    <FiberManualRecordIcon fontSize="small" />
                                  }
                                />
                              )}
                            </TableCell>

                            <TableCell align="center">
                              {row.serverUname}
                            </TableCell>
                            <TableCell align="center">
                              {row.serverPassword}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    ) : (
                      <TableBody>No data to show here</TableBody>
                    )}
                  </Table>
                </TableContainer>
              </>
            )}
          </Box>
          <DashboardFooter />
        </Box>
      </Box>
    </>
  );
};

export default OrderPage;
