import { extendTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";
import { useMemo, useState } from "react";
import { Button, Chip, IconButton } from "@mui/material";
import HomePage from "./Pages/HomePage";

const balancegg = 3500;
const HandleLogout=()=>{
    console.log("Logout Successfully..");
    
}
const LogoutBtn =(
    <Button onClick={HandleLogout} sx={{width:"100%", gap:2}}>
        <LogoutIcon/>LOGOUT
    </Button>
)

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "",
    title: "Home",
    icon: <HomeIcon />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
  //   {
  //     kind: "divider",
  //   },
  //   {
  //     kind: "header",
  //     title: "Analytics",
  //   },
  {
    segment: "account",
    title: "Account",
    icon: <PersonIcon />,
    children: [
      {
        segment: "profile",
        title: "Profile",
        icon: <DescriptionIcon />,
      },
      {
        segment: "#",
        title: "",
        action: LogoutBtn,
      },
    ],
  },
  {
    segment: "#",
    title: <Chip label={balancegg} color="success" size="large" />,
    icon: <AccountBalanceWalletIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = useState(initialPath);

  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled("div")(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function DashboardPage(props) {
  const { window } = props;
  const [loading, setLoading] = useState(null);

  const router = useDemoRouter("/");

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{ logo: "", title: "Danny Software" }}
      router={router}
      theme={demoTheme}
      //   session={{ user? : { email? : string, id?: string, image?: string, name?: string } }}
      window={window}
    >
      <DashboardLayout>
        <PageContainer>
          {loading ? (
            <Grid container spacing={1}>
              <Grid size={12}>
                <Skeleton height={14} />
              </Grid>
              <Grid size={4}>
                <Skeleton height={100} />
              </Grid>
              <Grid size={8}>
                <Skeleton height={100} />
              </Grid>

              <Grid size={12}>
                <Skeleton height={150} />
              </Grid>
              <Grid size={12}>
                <Skeleton height={14} />
              </Grid>

              <Grid size={3}>
                <Skeleton height={100} />
              </Grid>
              <Grid size={3}>
                <Skeleton height={100} />
              </Grid>
              <Grid size={3}>
                <Skeleton height={100} />
              </Grid>
              <Grid size={3}>
                <Skeleton height={100} />
              </Grid>
            </Grid>
          ) : (
            <div>
              <h2>Your Content</h2>
              <p>Content description based on items.</p>
              <HomePage/>
            </div>
          )}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
