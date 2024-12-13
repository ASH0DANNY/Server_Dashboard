import {
  Dialog,
  Typography,
  Box,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import ViewUser from "./ViewUser";

const AllOrders = () => {
  const [usersWithOrders, setUsersWithOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [usersData, setUsersData] = useState(null);
  const [inputBalance, setInputBalance] = useState(null);
  const [serverUname, setServerUname] = useState(null);
  const [serverPassword, setServerPassword] = useState(null);
  const [userOrders, setUserOrders] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [inputServerData, setInputServerData] = useState({
    serverUname: "",
    serverPassword: "",
  });

  async function getAllOrdersDetails() {
    try {
      const userRef = collection(db, "users");
      const usersSnapshot = await getDocs(userRef);
      const usersData = [];

      // For each user, fetch their orders from the 'orders' subcollection
      for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;
        const userData = userDoc.data();
        console.log("userData: " + userData);

        // Reference to the 'orders' subcollection under this user
        const ordersCollection = collection(db, "users", userId, "orders");
        const ordersSnapshot = await getDocs(ordersCollection);

        const ordersData = ordersSnapshot.docs.map((orderDoc) => ({
          orderId: orderDoc.id,
          ...orderDoc.data(),
        }));

        usersData.push({
          userId: userId,
          ...userData,
          orders: ordersData,
        });
      }

      setUsersWithOrders(usersData);
      console.log("usersWithOrders:");
      console.log(usersWithOrders);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAllOrdersDetails();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    getAllOrdersDetails();
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // const MoreDetails = async () => {
  //   return (
  //     <Paper sx={{ p: 3, bgcolor: "ivory", width: "100%" }}>
  //       <Typography>Balance: {await usersData.balance}</Typography>
  //       <TextField type="text" label="Name" />
  //       <TableContainer>
  //         <Table stickyHeader aria-label="sticky table">
  //           <TableHead style={{ backgroundColor: "#d1d1d1" }}>
  //             <TableRow>
  //               <TableCell style={{ maxWidth: 180 }} align="center">
  //                 #
  //               </TableCell>
  //               <TableCell style={{ minWidth: 120 }} align="center">
  //                 Date
  //               </TableCell>
  //               <TableCell style={{ minWidth: 120 }} align="right">
  //                 OrderValue
  //               </TableCell>
  //               <TableCell style={{ minWidth: 120 }} align="right">
  //                 ProductId
  //               </TableCell>
  //               <TableCell style={{ minWidth: 120 }} align="right">
  //                 Status
  //               </TableCell>
  //               <TableCell style={{ minWidth: 180 }} align="right">
  //                 S Username
  //               </TableCell>
  //               <TableCell style={{ minWidth: 180 }} align="right">
  //                 S Password
  //               </TableCell>
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             {await userOrders.map((order) => (
  //               <>
  //                 <TableRow
  //                   hover
  //                   role="checkbox"
  //                   tabIndex={-1}
  //                   key={order.orderId}
  //                 >
  //                   <TableCell align="center">{order.orderId}</TableCell>
  //                   <TableCell align="center">{order.orderDate}</TableCell>
  //                   <TableCell align="center">{order.orderDate}</TableCell>
  //                   <TableCell align="center">{order.orderDate}</TableCell>
  //                   <TableCell align="center">{order.orderDate}</TableCell>
  //                   <TableCell align="center">{order.orderValue}</TableCell>
  //                   <TableCell align="center">{order.orderValue}</TableCell>
  //                 </TableRow>
  //               </>
  //             ))}
  //           </TableBody>
  //         </Table>
  //       </TableContainer>
  //       <Button variant="contained" onClick={handleDialogBoxClose}>
  //         Close
  //       </Button>
  //     </Paper>
  //   );
  // };

  const GetOrdersCount = (orders) => {
    let count = 0;
    orders.map(() => count++);
    return count;
  };

  return (
    <>
      <div>
        <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ViewUser
              closeEvent={handleClose}
              userData={usersData}
              userOrders={userOrders}
            />
          </Box>
        </Modal>
      </div>
      {/* MainBody */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead style={{ backgroundColor: "#d1d1d1" }}>
              <TableRow>
                <TableCell style={{ minWidth: 180 }} align="center">
                  #
                </TableCell>
                <TableCell style={{ minWidth: 120 }} align="left">
                  Client
                </TableCell>
                <TableCell style={{ minWidth: 120 }} align="left">
                  Contact
                </TableCell>
                <TableCell style={{ minWidth: 120 }} align="left">
                  Email
                </TableCell>
                <TableCell style={{ minWidth: 120 }} align="right">
                  Balance
                </TableCell>
                <TableCell style={{ minWidth: 80 }} align="right">
                  Orders#
                </TableCell>
                <TableCell style={{ minWidth: 120 }} align="center">
                  View
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersWithOrders.map((user) =>
                user.accessType !== "admin" ? (
                  <>
                    <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                      <TableCell align="center">{user.userId}</TableCell>
                      <TableCell align="left">{user.name}</TableCell>
                      <TableCell align="left">{user.contact}</TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="right">{user.balance}</TableCell>
                      <TableCell align="right">
                        {GetOrdersCount(user.orders)}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          onClick={() => {
                            setUsersData(user);
                            setUserOrders(user.orders);
                            handleOpen();
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  </>
                ) : null
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default AllOrders;
