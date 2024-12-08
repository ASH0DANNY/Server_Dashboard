import React, { useEffect, useState } from "react";
import SideNavbar from "../components/Sidebar";
import {
  Backdrop,
  Box,
  Button,
  Chip,
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
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";

const OrderPage = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [backDtopOpen, setBackDtopOpen] = useState(false);
  const [serverSpec, setServerSpec] = useState({});
  const [serverData, setserverData] = useState({
    serverUname: "",
    serverPassword: "",
  });
  const [preBalance, setPreBalance] = useState(0);
  const [user, setUser] = useState("user");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
      orderDelevery: {
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
      orderDelevery: {
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
      orderDelevery: {
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
      orderDelevery: {
        serverUname: "IronMan123",
        serverPassword: "IM123456",
      },
    },
  ];

  const handleBackdropClose = (serverSpecs, serverCred, preBalance) => {
    setBackDtopOpen(!backDtopOpen);
    setServerSpec(serverSpecs);
    setserverData({
      serverUname: serverCred.serverUname,
      serverPassword: serverCred.serverPassword,
    });
    setPreBalance(preBalance);
  };

  const ViewBlock = () => {
    setUser("admin");
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

            {user === "admin" ? (
              <Button variant="contained">Save</Button>
            ) : null}
          </Box>
        </Box>
      </>
    );
  };

  const tableHeader = [
    { id: "id", label: "Id", minWidth: 100 },
    {
      id: "client",
      label: "Client",
      minWidth: 170,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: 120,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
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
      item.orderDelevery.serverUname === "" ? (
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
            item.orderDelevery,
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
            All Orders
          </Typography>

          {/* All orders table */}
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead sx={{ bgcolor: "#000", color: "#fff" }}>
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

          {/* server username and  password */}
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={backDtopOpen}
            onClick={handleBackdropClose}
          >
            <ViewBlock />
          </Backdrop>
        </Box>
      </Box>
    </>
  );
};

export default OrderPage;
