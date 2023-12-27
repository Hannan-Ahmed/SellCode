"use client"
import React, { useState } from "react";
import logo from "../../Images/logo-modified.png";
import Image from "next/image";
import "./Navbar.css";
import { MdOutlineAccountCircle } from "react-icons/md";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
////


import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "@mui/material";


const Navbar = () => {
const session=useSession()
const profilepic=session.data?.user?.image||logo
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div className="flex items-center justify-between p-2 nav fixed w-full z-10">
        <div>
          <Image src={logo} alt="logo" className="w-16 h-16 "  />
        </div>
        <div className="text-2xl  text-white ml-36  nav_tag">
        {"</>"} Where code meets commerce $
        </div>
        <div className="text-white">
          <div className="flex items-center justify-between">
            <div className="relative w-full right-2">
              
              <input
                type="search"
                id="search-dropdown"
                className="block px-28 p-2 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="Search code"
                required
              />
              <button
                type="submit"
                className=" absolute top-0 end-0 p-2.5 text-sm font-medium  h-full text-white bg-blue-900 rounded-lg border border-blue-900 hover:bg-purple-400 focus:ring-4 focus:outline-none focus:ring-purple-400 dark:bg-purple-400 dark:hover:bg-purple-600 dark:focus:ring-purple-500"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>

            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {/* <AccountCircle  style={{fontSize:'2.9rem'}} /> */}
                <Avatar alt="Your Image" src={profilepic} sx={{ width: 39, height: 39 }}>
      <AccountCircle style={{ fontSize: '2.9rem' }} />
    </Avatar>
              </IconButton>
              <Menu
          
               className="mt-16 ml-2"
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Account</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={()=>signOut()}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
