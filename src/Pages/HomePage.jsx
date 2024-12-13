import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Paper,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useState, useEffect } from "react";
import SideNavbar from "../components/Sidebar";
import DashboardFooter from "../components/Footer";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../Firebase";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../utils/ConfirmAlert";

const HomePage = () => {
  const [seletedproduct, setSeletedproduct] = useState();
  const [serverSpecification, setServerSpecification] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();
  const productsRef = collection(db, "products");
  const userRef = collection(db, "users");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirm = async () => {
    await handleBuynowClick(seletedproduct);
    handleCloseDialog();
  };

  useEffect(() => {
    getProducts();
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("docSnap.data():" + docSnap.data());

        setUserDetails(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };

  const getProducts = async () => {
    const temp = await getDocs(productsRef);
    setServerSpecification(
      temp.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  const handleClientEdit = () => {
    console.log("Client edit click");
  };

  async function handleBuynowClick(item) {
    try {
      const user = auth.currentUser;
      //user >> uid >> orders
      const userDocRef = doc(userRef, user.uid);
      const orderRef = collection(userDocRef, "orders");
      const transRef = collection(userDocRef, "transactions");

      console.log("user:" + user);

      if (user) {
        await addDoc(orderRef, {
          productId: item.index,
          orderDate: formattedDate,
          orderValue: item.price,
          priorbalance: userDetails.balance,
          serverUname: "",
          serverPassword: "",
        });

        await addDoc(transRef, {
          serverSpec: item.index,
          orderDate: formattedDate,
          priorbalance: userDetails.balance,
          orderValue: item.price,
        });

        console.log("Order data added in user doc!!! ");
        navigate("/orders");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideNavbar />
        <Box sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
          <Box sx={{ minHeight: "75vh" }}>
            {/* Confirmation Alert */}
            <ConfirmationDialog
              open={isDialogOpen}
              onClose={handleCloseDialog}
              onConfirm={handleConfirm}
              title="Confirmation"
              message="Are you sure you want to proceed?"
            />
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
            {userDetails.accessType === "admin" ? (
              <>
                {/* Display For Admin */}
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead style={{ backgroundColor: "#d1d1d1" }}>
                      <TableRow>
                        <TableCell style={{ maxWidth: 80 }} align="centre">
                          #
                        </TableCell>
                        <TableCell style={{ minWidth: 200 }} align="left">
                          Tag
                        </TableCell>
                        <TableCell style={{ minWidth: 120 }} align="right">
                          Ram
                        </TableCell>
                        <TableCell style={{ minWidth: 120 }} align="right">
                          Memory
                        </TableCell>
                        <TableCell style={{ minWidth: 120 }} align="right">
                          Valadity
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }} align="right">
                          Price
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {serverSpecification.map((row) => (
                        <TableRow
                          key={row.index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="centre">{row.index}</TableCell>
                          <TableCell align="left">{row.tag}</TableCell>
                          <TableCell align="right">{row.ram}</TableCell>
                          <TableCell align="right">{row.memory}</TableCell>
                          <TableCell align="right">{row.validity}</TableCell>
                          <TableCell align="right">{row.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) : (
              <>
                {/* Display For Users */}
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
                          p: 2,
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
                          sx={{
                            marginTop: 4,
                            color: "#858585",
                            fontSize: "small",
                          }}
                        >
                          Product Id: {item.index}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", marginTop: 2 }}
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
                                <TableCell align="right">
                                  {item.memory}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">
                                  Validity
                                </TableCell>
                                <TableCell align="right">
                                  {item.validity}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">
                                  Price
                                </TableCell>
                                <TableCell align="right">
                                  {item.price}
                                </TableCell>
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
                          onClick={() => {
                            setSeletedproduct(item);
                            item.price >= userDetails.balance
                              ? alert("Can't complete your order!! Low Balance")
                              : handleOpenDialog();
                          }}
                        >
                          Buy Now
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
                </Box>
              </>
            )}
          </Box>
          <DashboardFooter />
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
