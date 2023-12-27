"use client";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import SellIcon from "@mui/icons-material/Sell";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UploadFile from "@mui/icons-material/UploadFile";
import Money from "@mui/icons-material/Money";
import History from "@mui/icons-material/History";
import NotificationAdd from "@mui/icons-material/Notifications";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import "./Drawer.css";
import Link from "next/link";
import Badge from "@mui/material/Badge";
import ViewCompactAltIcon from '@mui/icons-material/ViewCompactAlt';
import { useSession } from "next-auth/react";
import { fetchUserData } from "@/app/helpers/getuser";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
type Anchor = "view_your_code";


const DrawerBar = () => {
  const [state, setState] = useState({
    view_your_code: false,
  });

const session=useSession()
const [userid,setuserid]=useState()
  useEffect(() => {
    fetchUserData(session.data?.user?.email)
      .then((userData) => {
        if (userData) {
          console.log('User Data:', userData);
          // Process the user data as needed
          setuserid(userData._id); // Assuming userData contains the username property
        } else {
          console.log('User not found or error fetching data.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [session.data?.user?.email]);

// **********************************************
 
const drawerData = [
  {
    text: (
      <Link href={"/"} >
        Dashboard{" "}
      </Link>
    ),
    image: <DashboardIcon style={{ color: "white" }} />,
    key:1,
  },

  {
    text: (
      <Link href={"/buyproject"} >
        Buy Project{" "}
      </Link>
    ),
    image: <ShoppingCartIcon style={{ color: "white" }} />,
    key:1,
  },

  {
    text: (
      <Link href={"/upload"} >
        Upload Project
      </Link>
    ),
    image: <UploadFile style={{ color: "white" }}/>,
    key:2 
  },

  {
    text: (
      <Link href={"/sellproject"} >
        Purchased projects{" "}
      </Link>
    ),
    image: <ViewCompactAltIcon style={{ color: "white" }} />,
    key:3

  },
  {
    text: (
      <Link href={`/sellproject/${userid}`} >
        Sell Project{" "}
      </Link>
    ),
    image: <SellIcon style={{ color: "white" }} />,
    key:3

  },
  {
    text: (
      <Link href={"/upload"} >
        Notification
      </Link>
    ),
    image: <NotificationAdd style={{ color: "white"
   }} />,
   key:4
  },
  {
    text: (
      <Link href={"/upload"} >
        Sold Ventures
      </Link>
    ),
    image: <Money style={{ color: "white" }} />,
    key:5
  },
  {
    text: (
      <Link href={"/upload"} >
        Transaction History
      </Link>
    ),
    image: <History style={{ color: "white" }} />,
    key:6

  },
];
const drawerData2 = [
  {
    text: (
      <Link href={"/upload"} >
        Settings
      </Link>
    ),
    image: <Settings style={{ color: "white" }} />,
    key:1
  },
  {
    text: (
      <Link href={"/upload"} key={1}>
        Logout
      </Link>
    ),
    image: <Logout style={{ color: "white" }} />,
  },
];
//*************************************************** */
const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "view_your_code" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {drawerData.map((item, index) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton className=" hover:text-blue-300 rounded transition duration-300 ease-in-out">
              <ListItemIcon>
                { index==5?
                (
                  <Badge badgeContent={2} color="error">
                    {item.image}
                  </Badge>
                ) :

                 index==0?
                (
                  <Badge badgeContent={1} color="error">
                    {item.image}
                  </Badge>

                ) :
                (
                  item.image
                )}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider style={{ color: "white", backgroundColor: "white" }} />
      <List>
        {drawerData2.map((item, index) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton component="a" href={item.text.props.href} className=" hover:bg-purple-600 rounded transition duration-300 ease-in-out"> 
              <ListItemIcon >{item.image}</ListItemIcon>
              <ListItemText primary={item.text}  />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="fixed mt-24">
      {(["view_your_code"] as const).map((anchor) => (
        <div key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <div className="text-4xl">
              <GiHamburgerMenu />
            </div>
            {/* {anchor} */}
          </Button>
          <SwipeableDrawer
            anchor={"left"}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            
          >
            {list(anchor)}
          </SwipeableDrawer>
        </div>
      ))}
    </div>
    // </div>
  );
};

export default DrawerBar;
