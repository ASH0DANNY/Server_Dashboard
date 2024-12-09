import React, { useEffect, useState } from "react";
import SideNavbar from "../components/Sidebar";
import {
  Backdrop,
  Box,
  Button,
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
import DeleteIcon from "@mui/icons-material/Delete";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";

const ProductsPage = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [user, setUser] = useState("user");
  const [backDtopOpen, setBackDtopOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const productsRef = collection(db, "products");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const temp = await getDocs(productsRef);
    setProducts(temp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleBackdropClose = () => {
    setBackDtopOpen(!backDtopOpen);
  };

  const ViewBlock = ({ index, tag, ram, memory, validity, price }) => {
    setUser("admin");
    return (
      <>
        <Box
          sx={{ bgcolor: "#fff", color: "#000", padding: 3, borderRadius: 3 }}
        >
          <Typography>Product Details</Typography>
          <Box sx={{ width: 300, mx: 4 }}>
            <TextField
              id="outlined"
              label="Index"
              placeholder="Index.."
              value={index}
              sx={{ width: "100%", my: 2 }}
            />
            <TextField
              id="outlined"
              label="Tag"
              placeholder="Tag.."
              value={tag}
              sx={{ width: "100%", my: 2 }}
            />
            <TextField
              id="outlined"
              label="Ram"
              placeholder="Ram.."
              value={ram}
              sx={{ width: "100%", my: 2 }}
            />
            <TextField
              id="outlined"
              label="Memory"
              placeholder="Memory.."
              value={memory}
              sx={{ width: "100%", my: 2 }}
            />
            <TextField
              id="outlined"
              label="Validity"
              placeholder="Validity.."
              value={validity}
              sx={{ width: "100%", my: 2 }}
            />
            <TextField
              id="outlined"
              label="Price"
              placeholder="Price.."
              value={price}
              sx={{ width: "100%", my: 2 }}
            />

            {user === "admin" ? (
              <Button variant="contained">Save</Button>
            ) : null}
          </Box>
        </Box>
      </>
    );
  };

  const tableHeader = [
    { id: "index", label: "#", minWidth: 100 },
    {
      id: "tag",
      label: "Tag",
      minWidth: 170,
      align: "left",
    },
    {
      id: "ram",
      label: "Ram",
      minWidth: 120,
      align: "left",
    },
    {
      id: "memory",
      label: "Memory",
      minWidth: 170,
      align: "left",
    },
    {
      id: "validity",
      label: "Validity",
      minWidth: 100,
      align: "left",
    },
    {
      id: "price",
      label: "Price",
      minWidth: 100,
      align: "left",
    },
    {
      id: "Btn",
      label: "Edit",
      minWidth: 170,
      align: "right",
    },
  ];

  function createData(item) {
    let index = item.index;
    let tag = item.tag;
    let ram = item.ram;
    let memory = item.memory;
    let validity = item.validity;
    let price = item.price;

    const btn = (
      <>
        <Button
          variant="contained"
          onClick={() =>
            handleBackdropClose({ index, tag, ram, memory, validity, price })
          }
        >
          View
        </Button>
        <Button>
          <DeleteIcon />
        </Button>
      </>
    );

    return { index, tag, ram, memory, validity, price, btn };
  }

  useEffect(() => {
    setRows(
      products.map((item) => {
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
            Products Page
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

export default ProductsPage;
