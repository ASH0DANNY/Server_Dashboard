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
import AddIcon from "@mui/icons-material/Add";
import { db } from "../Firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

const ProductsPage = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [user, setUser] = useState("user");
  const [backDtopOpen, setBackDtopOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [inputIndex, setInputIndex] = useState(0);
  const [inputTag, setInputTag] = useState("");
  const [inputRam, setInputRam] = useState("");
  const [inputMemory, setInputMemory] = useState("");
  const [inputValidity, setInputValidity] = useState("");
  const [inputPrice, setInputPrice] = useState(0);
  const productsRef = collection(db, "products");
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

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

  const handleBackdropClick = () => {
    setBackDtopOpen(!backDtopOpen);
  };
  const handleEditProduct = (item) => {
    handleBackdropClick();
    setInputIndex(item.index);
    setInputTag(item.tag);
    setInputRam(item.ram);
    setInputMemory(item.memory);
    setInputValidity(item.validity);
    setInputPrice(item.price);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    handleBackdropClick();
    const newProductData = {
      index: inputIndex,
      tag: inputTag,
      ram: inputRam,
      memory: inputMemory,
      validity: inputValidity,
      price: inputPrice,
      createDate: formattedDate,
    };

    try {
      let response = addDoc(productsRef, newProductData);
      console.log(
        "Data added => response: " + response.then(console.log(response.data()))
      );
      getProducts();
    } catch (e) {
      console.log(e);
    }
  };

  const ViewBlock = () => {
    setUser("admin");
    return (
      <>
        <Box
          sx={{ bgcolor: "#fff", color: "#000", padding: 3, borderRadius: 3 }}
        >
          <Typography>Product Details</Typography>
          <Box sx={{ width: 300, mx: 4 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              autoFocus
              label="Index"
              placeholder="Index.."
              value={inputIndex}
              onChange={(e) => setInputIndex(e.target.value)}
              sx={{ width: "100%", my: 2 }}
            />
            <TextField
              id="outlined"
              label="Tag"
              placeholder="Tag.."
              value={inputTag}
              onChange={(e) => setInputTag(e.target.value)}
              sx={{ width: "100%", my: 2 }}
            />
            <TextField
              id="outlined"
              label="Ram"
              placeholder="Ram.."
              value={inputRam}
              onChange={(e) => setInputRam(e.target.value)}
              sx={{ width: "100%", my: 2 }}
            />
            <TextField
              id="outlined"
              label="Memory"
              placeholder="Memory.."
              value={inputMemory}
              onChange={(e) => setInputMemory(e.target.value)}
              sx={{ width: "100%", my: 2 }}
            />
            <TextField
              id="outlined"
              label="Validity"
              placeholder="Validity.."
              value={inputValidity}
              onChange={(e) => setInputValidity(e.target.value)}
              sx={{ width: "100%", my: 2 }}
            />
            <TextField
              id="outlined"
              label="Price"
              placeholder="Price.."
              value={inputPrice}
              onChange={(e) => setInputPrice(e.target.value)}
              sx={{ width: "100%", my: 2 }}
            />

            {user === "admin" ? (
              <Button variant="contained" onClick={handleAddProduct}>
                Save
              </Button>
            ) : null}
          </Box>
        </Box>
      </>
    );
  };

  const tableHeader = [
    { id: "index", label: "#", minWidth: 90 },
    {
      id: "tag",
      label: "Tag",
      minWidth: 170,
      align: "left",
    },
    {
      id: "ram",
      label: "Ram",
      minWidth: 150,
      align: "left",
    },
    {
      id: "memory",
      label: "Memory",
      minWidth: 150,
      align: "left",
    },
    {
      id: "validity",
      label: "Validity",
      minWidth: 150,
      align: "left",
    },
    {
      id: "price",
      label: "Price",
      minWidth: 150,
      align: "left",
    },
    {
      id: "btn",
      label: "",
      minWidth: 100,
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
          sx={{ mx: 1 }}
          onClick={() => handleEditProduct(item)}
        >
          View
        </Button>
        <Button color="error">
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
          <Typography sx={{ my: 2, p: 2 }}>
            <Button variant="contained" onClick={() => handleBackdropClick()}>
              Add Product
              <AddIcon sx={{ ml: 1 }} />
            </Button>
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
            onClick={handleBackdropClick}
          >
            <ViewBlock />
          </Backdrop>
        </Box>
      </Box>
    </>
  );
};

export default ProductsPage;
