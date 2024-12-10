import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import CategoryIcon from "@mui/icons-material/Category";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Collapse, Tooltip } from "@mui/material";
import { auth, db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";

const drawerWidth = 240;

const MenuItems = [
  { title: "Home", icon: HomeIcon, link: "/dashboard", access: "user" },
  { title: "Orders", icon: ShoppingCartIcon, link: "/orders", access: "user" },
  { title: "Products", icon: CategoryIcon, link: "/products", access: "admin" },
  { title: "Clients", icon: CategoryIcon, link: "/clients", access: "admin" },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function SideNavbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState("");
  const [open, setOpen] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);

  const handleLogoutClick = async () => {
    await auth.signOut();
    navigate("/");
  };

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const fetchUserData = () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = await doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("docSnap.data():" + docSnap.data());

        setUserDetails(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
    setCurrentLocation(location.pathname.toString());
  }, [location.pathname]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: "100%", bgcolor: "#000", color: "#fff" }}
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{ marginRight: 2 }}
          >
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            VPS Master
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <List sx={{ marginTop: 8 }}>
          {MenuItems.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: "block" }}>
              <Tooltip title={item.title} placement="right">
                <ListItemButton
                  sx={[
                    {
                      minHeight: 48,
                      px: 2.5,
                    },
                    open
                      ? { justifyContent: "initial" }
                      : { justifyContent: "center" },

                    currentLocation === item.link ? { bgcolor: "#59a1ff" } : {},
                  ]}
                  onClick={() => {
                    navigate(item.link);
                  }}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: "center",
                      },
                      open
                        ? {
                            mr: 3,
                          }
                        : {
                            mr: "auto",
                          },
                    ]}
                  >
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
        <Divider />

        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <Tooltip
              title={`Balance - ₹ ${userDetails ? userDetails.balance : 0}`}
              placement="right"
            >
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? { justifyContent: "initial", bgcolor: "#b1ff9a" }
                    : { justifyContent: "center" },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                          color: "#b1ff9a",
                        },
                  ]}
                >
                  <AccountBalanceWalletIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText
                  primary={`₹ ${userDetails ? userDetails.balance : 0}`}
                  sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }}>
            <Tooltip title="Account" placement="right">
              <ListItemButton
                sx={[
                  {
                    minHeight: 60,
                    px: 2.5,
                  },
                  open
                    ? { justifyContent: "initial" }
                    : { justifyContent: "center" },
                ]}
                onClick={() => {
                  setAccountOpen(!accountOpen);
                }}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  <AccountCircleIcon fontSize="medium" />
                </ListItemIcon>

                <ListItemText
                  sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                  primary={userDetails ? userDetails.name : "username"}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary", display: "inline" }}
                      >
                        {userDetails ? userDetails.email : "user@gmail.com"}
                      </Typography>
                    </>
                  }
                />
                {accountOpen ? (
                  <ExpandLessIcon
                    sx={[open ? { display: "bolck" } : { display: "none" }]}
                  />
                ) : (
                  <ExpandMoreIcon
                    sx={[open ? { display: "bolck" } : { display: "none" }]}
                  />
                )}
              </ListItemButton>
            </Tooltip>

            <Collapse in={accountOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Tooltip title="Logout" placement="right">
                  <ListItemButton
                    sx={[
                      { pl: 4 },
                      open
                        ? { bgcolor: "#ff8181", ":hover": { color: "#ff8181" } }
                        : { bgcolor: "none" },
                    ]}
                    onClick={handleLogoutClick}
                  >
                    <ListItemIcon>
                      <LogoutIcon
                        sx={[
                          open
                            ? {}
                            : { color: "#ff8181", ":hover": { color: "" } },
                        ]}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </Tooltip>
              </List>
            </Collapse>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
