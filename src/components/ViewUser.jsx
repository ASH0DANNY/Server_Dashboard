import {
  Box,
  Button,
  Grid2,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  Chip,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

const ViewUser = ({ closeEvent, userData, userOrders }) => {
  const [openServerEdit, setOpenServerEdit] = useState(false);
  const [openBalanceEdit, setOpenBalanceEdit] = useState(false);
  const [inputBalance, setInputBalance] = useState(0);
  const [inputServerUname, setInputServerUname] = useState(null);
  const [inputServerPassword, setInputServerPassword] = useState(null);
  const [editOrder, setEditOrder] = useState(null);

  const handleUpdateBalance = async () => {
    try {
      const userRef = collection(db, "users");
      const docRef = doc(userRef, userData.userId);
      const docSnap = await updateDoc(docRef, {
        balance: inputBalance,
      });
      setOpenBalanceEdit(false);
      alert("Balance Updated");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdateServer = async () => {
    try {
      const orderColl = collection(db, "users", userData.userId, "orders");
      const orderRef = await doc(orderColl, editOrder.orderId);
      const docSnap = await updateDoc(orderRef, {
        serverUname: inputServerUname,
        serverPassword: inputServerPassword,
      });
      setOpenServerEdit(false);
      alert("Server Data Updated");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getStatus = (uname) => {
    const status =
      uname === "" ? (
        <Chip
          variant="outlined"
          color="error"
          size="small"
          label="pending"
          icon={<FiberManualRecordIcon fontSize="small" />}
        />
      ) : (
        <Chip
          variant="outlined"
          color="success"
          size="small"
          label="completed"
          icon={<FiberManualRecordIcon fontSize="small" />}
        />
      );

    return status;
  };

  return (
    <>
      <Box sx={{ m: 2 }}>
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0, bgcolor: "#91c1ff" }}
          onClick={closeEvent}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            marginBottom: 3,
            bgcolor: "#59a1ff",
            py: 1,
            px: 2,
            borderRadius: 3,
          }}
        >
          User Details
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={4}>Name: {userData.name}</Grid2>
          <Grid2 size={4}>Email: {userData.email}</Grid2>
          <Grid2 size={4}>Contact: {userData.contact}</Grid2>
          <Grid2 size={4}>
            Balance: {userData.balance}{" "}
            {
              <IconButton
                sx={{ bgcolor: "#59a1ff", mx: 2 }}
                onClick={() => {
                  setInputBalance(userData.balance);
                  setOpenBalanceEdit(true);
                }}
              >
                <EditIcon />
              </IconButton>
            }
          </Grid2>
          {openBalanceEdit ? (
            <Grid2 size={4}>
              <TextField
                size="small"
                variant="outlined"
                value={inputBalance}
                onChange={(e) => setInputBalance(e.target.value)}
                sx={{ mx: 3 }}
              />
              <Button
                variant="outlined"
                color="error"
                sx={{ mx: 2 }}
                onClick={() => setOpenBalanceEdit(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleUpdateBalance();
                }}
              >
                Update
              </Button>
            </Grid2>
          ) : null}
        </Grid2>

        <Typography
          variant="h6"
          sx={{
            mt: 5,
            marginBottom: 3,
            bgcolor: "#59a1ff",
            py: 1,
            px: 2,
            borderRadius: 3,
          }}
        >
          Order Details
        </Typography>
        <TableContainer component={Paper} sx={{ my: 3 }}>
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
                  Prior Balance
                </TableCell>
                <TableCell style={{ minWidth: 120 }} align="center">
                  OrderValue
                </TableCell>
                <TableCell style={{ minWidth: 80 }} align="center">
                  ProductId
                </TableCell>
                <TableCell style={{ minWidth: 80 }} align="center">
                  Status
                </TableCell>
                <TableCell style={{ minWidth: 180 }} align="center">
                  S Username
                </TableCell>
                <TableCell style={{ minWidth: 180 }} align="center">
                  S Password
                </TableCell>
                <TableCell style={{ minWidth: 80 }} align="center">
                  Edit
                </TableCell>
              </TableRow>
            </TableHead>
            {userOrders !== null ? (
              <TableBody>
                {userOrders.map((order) => (
                  <TableRow
                    key={order.orderId}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{order.orderId}</TableCell>
                    <TableCell align="center">{order.orderDate}</TableCell>
                    <TableCell align="center">{order.priorbalance}</TableCell>
                    <TableCell align="center">{order.orderValue}</TableCell>
                    <TableCell align="center">{order.productId}</TableCell>
                    <TableCell align="center">
                      {getStatus(order.serverUname)}
                    </TableCell>
                    <TableCell align="center">{order.serverUname}</TableCell>
                    <TableCell align="center">{order.serverPassword}</TableCell>
                    <TableCell align="center">
                      {
                        <IconButton
                          sx={{ bgcolor: "#59a1ff" }}
                          onClick={() => {
                            setEditOrder(order);
                            setInputServerUname(order.serverUname);
                            setInputServerPassword(order.serverPassword);
                            setOpenServerEdit(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableCell align="center">No data to show here</TableCell>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {openServerEdit ? (
          <Grid2 container spacing={2}>
            <Grid2 size={4}>
              <TextField
                size="small"
                label="UserName"
                variant="outlined"
                value={inputServerUname}
                onChange={(e) => setInputServerUname(e.target.value)}
              />
            </Grid2>
            <Grid2 size={4}>
              <TextField
                size="small"
                label="Password"
                variant="outlined"
                value={inputServerPassword}
                onChange={(e) => setInputServerPassword(e.target.value)}
              />
            </Grid2>
            <Grid2 size={4}>
              <Button
                variant="outlined"
                color="error"
                sx={{ mx: 2 }}
                onClick={() => setOpenServerEdit(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleUpdateServer();
                }}
              >
                Save
              </Button>
            </Grid2>
          </Grid2>
        ) : null}
      </Box>
    </>
  );
};

export default ViewUser;
