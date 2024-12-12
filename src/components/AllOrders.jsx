import {
  Dialog,
  Typography,
  Box,
  Button,
  Chip,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  TableCell,
  TableBody,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase";

const AllOrders = () => {
  const [usersWithOrders, setUsersWithOrders] = useState([]);
  const [user, setUser] = useState("");
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dilogBoxOpen, setDilogBoxOpen] = useState(false);
  const [serverSpec, setServerSpec] = useState({});
  const [serverData, setserverData] = useState({
    serverUname: "",
    serverPassword: "",
  });
  const [preBalance, setPreBalance] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  const handleBackdropClose = (serverSpecs, serverCred, preBalance) => {
    setDilogBoxOpen(!dilogBoxOpen);
    setServerSpec(serverSpecs);
    setserverData({
      serverUname: serverCred.serverUname,
      serverPassword: serverCred.serverPassword,
    });
    setPreBalance(preBalance);
  };

  const ViewBlock = () => {
    return (
      <>
        <Box
          sx={{ bgcolor: "#fff", color: "#000", padding: 3, borderRadius: 3 }}
        >
          <Typography>Server Details</Typography>
          <Box sx={{ width: 300, height: 400, mx: 4 }}>
            <TextField
              id="outlined"
              label="Username"
              placeholder="Username.."
              value={serverData.serverUname}
              sx={{ width: "100%", my: 2 }}
            />
            <TextField
              id="outlined"
              label="Password"
              placeholder="Password.."
              value={serverData.serverPassword}
              sx={{ width: "100%", my: 2 }}
            />
            <Typography>Prior Balance: {preBalance}</Typography>

            <Button variant="contained">Save</Button>
          </Box>
        </Box>
      </>
    );
  };

  //   const AllOrders= usersWithOrders.map((item)=>(
  //     {
  //         client:item.name,

  //     }
  //   )) ;

  const AllOrderDetails = [
    {
      orderId: "21",
      client: "John Wick",
      orderDate: "15/11/2024",
      priorBalance: 10000,
      orderedServerSpec: {
        index: 4,
        tag: "Standard",
        ram: "12 GB",
        memory: "512 GB",
        validity: "10 year",
        price: 6500,
      },
      orders: {
        serverUname: "",
        serverPassword: "",
      },
    },
    {
      orderId: "17",
      client: "Harry Potter",
      orderDate: "2/12/2024",
      priorBalance: 10000,
      orderedServerSpec: {
        index: 4,
        tag: "Standard",
        ram: "12 GB",
        memory: "512 GB",
        validity: "10 year",
        price: 6500,
      },
      orders: {
        serverUname: "",
        serverPassword: "",
      },
    },
    {
      orderId: "05",
      client: "Spider Man",
      orderDate: "18/12/2024",
      priorBalance: 8000,
      orderedServerSpec: {
        index: 2,
        tag: "Best Value",
        ram: "4 GB",
        memory: "256 GB",
        validity: "5 year",
        price: 4000,
      },
      orders: {
        serverUname: "",
        serverPassword: "",
      },
    },

    {
      orderId: "11",
      client: "Iron Man",
      orderDate: "03/11/2024",
      priorBalance: 10000,
      orderedServerSpec: {
        index: 3,
        tag: "Premium",
        ram: "16 GB",
        memory: "1 TB",
        validity: "10 year",
        price: 8500,
      },
      orders: {
        serverUname: "IronMan123",
        serverPassword: "IM123456",
      },
    },
  ];

  const tableHeader = [
    { id: "id", label: "Id", minWidth: 50 },
    {
      id: "client",
      label: "Name",
      minWidth: 170,
      align: "left",
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: 120,
      align: "left",
    },
    {
      id: "date",
      label: "Date",
      minWidth: 170,
      align: "left",
    },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
      align: "left",
    },
    {
      id: "viewBtn",
      label: "View",
      minWidth: 170,
      align: "right",
    },
  ];

  function createData(item) {
    let id = item.orderId;
    let client = item.client;
    let amount = item.orderedServerSpec.price;
    let date = item.orderDate;
    const status =
      item.orders.serverUname === "" ? (
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
          label="compleated"
          icon={<FiberManualRecordIcon fontSize="small" />}
        />
      );
    const viewBtn = (
      <Button
        variant="contained"
        onClick={() =>
          handleBackdropClose(
            item.orderedServerSpec,
            item.orders,
            item.priorBalance
          )
        }
      >
        View
      </Button>
    );

    return { id, client, amount, date, status, viewBtn };
  }

  useEffect(() => {
    setRows(
      AllOrderDetails.map((item) => {
        const temp = createData(item);

        return temp;
      })
    );
  }, [createData]);

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead style={{ backgroundColor: "#d1d1d1" }}>
              <TableRow>
                {tableHeader.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {tableHeader.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Box>
        {usersWithOrders.map((item) => (
          <>
            <Typography>userid: {item.userId}</Typography>
            <Typography>name: {item.name}</Typography>
            <Typography>email: {item.email}</Typography>
            <Typography>balance: {item.balance}</Typography>
            <Box>
              orders count:{" "}
              {item.orders.map((val) => (
                <Typography>orderId: {val.orderId}</Typography>
              ))}
            </Box>
          </>
        ))}
      </Box>
      {/* server username and  password */}
      <Dialog
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={dilogBoxOpen}
        onClick={handleBackdropClose}
      >
        <ViewBlock />
      </Dialog>
    </>
  );
};

export default AllOrders;
