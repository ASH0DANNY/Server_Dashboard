import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { collection, doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const SignUpPage = () => {
  const [signup, setSignup] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userContact, setUserContact] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [warningAlert, setWarningAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const userRef = collection(db, "users");

  const openSignup = () => {
    setSignup(!signup);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    let signupData = { name: "", email: "", contact: "", password: "" };
    if (userName && userEmail && userContact && userPassword !== "") {
      signupData = {
        name: userName,
        email: userEmail,
        contact: userContact,
        accessType: "user",
        balance: 0,
        date: formattedDate,
      };
      try {
        await createUserWithEmailAndPassword(auth, userEmail, userPassword);
        const user = auth.currentUser;
        console.log("user:" + user);

        if (user) {
          await setDoc(doc(userRef, user.uid), signupData);
        }
        console.log("Data added: ");
      } catch (error) {
        console.log(error.message);
        setAlertMessage(error.message);
        setWarningAlert(true);
        setTimeout(() => {
          setWarningAlert(false);
        }, 2000);
      }

      setAlertMessage("Signup Successfully");
      setSuccessAlert(true);

      setTimeout(() => {
        setSuccessAlert(false);

        setUserName("");
        setUserEmail("");
        setUserContact("");
        setUserPassword("");

        //Navigate to dashboard
        navigate("/dashboard");
      }, 2000);
    } else {
      setAlertMessage("All fields are manditory!!");
      setWarningAlert(true);
      setTimeout(() => {
        setWarningAlert(false);
      }, 2000);
    }
  };
  const handleSigninSubmit = async (e) => {
    e.preventDefault();

    if (userEmail && userPassword !== "") {
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          userEmail,
          userPassword
        );
        console.log("Login response:" + response);

        //Navigate to dashboard
        navigate("/dashboard");
      } catch (error) {
        console.log(error.message);
        setAlertMessage(error.message);
        setWarningAlert(true);
        setTimeout(() => {
          setWarningAlert(false);
        }, 2000);
      }
    } else {
      setAlertMessage("All fields are mandatory!!");
      setWarningAlert(true);
      setTimeout(() => {
        setWarningAlert(false);
      }, 2000);
    }
  };
  return (
    <>
      <Box
        sx={[
          {
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            transition: "ease-in-out",
          },
          signup ? { flexDirection: "row-reverse" } : {},
        ]}
      >
        <Box
          sx={{
            width: "50%",
            bgcolor: "slategray",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container maxWidth="xs">
            {signup ? (
              <>
                <Typography variant="h4" sx={{ textAlign: "center" }}>
                  Already have an account
                </Typography>
                <Typography
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button variant="outlined" onClick={openSignup}>
                    Sign In
                  </Button>
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h4" sx={{ textAlign: "center" }}>
                  Do not have an account
                </Typography>
                <Typography
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button variant="outlined" onClick={openSignup}>
                    Sign up
                  </Button>
                </Typography>
              </>
            )}
          </Container>
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!signup ? (
            <Container maxWidth="xs">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Sign In
                </Typography>
                <Box component="signinform" noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSigninSubmit}
                  >
                    Sign In
                  </Button>
                  <Box sx={{ mt: 2 }}>
                    {successAlert ? (
                      <Alert severity="success">{alertMessage}</Alert>
                    ) : (
                      ""
                    )}
                    {warningAlert ? (
                      <Alert severity="warning">{alertMessage}</Alert>
                    ) : (
                      ""
                    )}
                  </Box>
                </Box>
              </Box>
            </Container>
          ) : (
            <Container maxWidth="xs">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Sign Up
                </Typography>
                <Box component="signupform" noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="Name"
                    type="text"
                    id="name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="contact"
                    label="Contact Number"
                    type="text"
                    id="contact"
                    value={userContact}
                    onChange={(e) => setUserContact(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSignupSubmit}
                  >
                    Sign Up
                  </Button>
                  <Box sx={{ mt: 2 }}>
                    {successAlert ? (
                      <Alert severity="success">{alertMessage}</Alert>
                    ) : (
                      ""
                    )}
                    {warningAlert ? (
                      <Alert severity="warning">{alertMessage}</Alert>
                    ) : (
                      ""
                    )}
                  </Box>
                </Box>
              </Box>
            </Container>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SignUpPage;
