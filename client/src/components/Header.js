import React, { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Icon } from '@iconify/react';

import { useNavigate } from "react-router-dom";

import './../components/Styles.css';

import {
  HeaderContainer, HeaderBarDark,
  HeaderLogo, DashboardButtonContainer
} from "./../components/Styles.js";

// Import axios to communicate with backend
import Axios from 'axios';

const Header = () => {

  const [logInStatus, setLogInStatus] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  const open = Boolean(menuOpen);

  // Upon first rendering page, check if user is logged in.
  // Redirect if not, or retrieve session details.
  useEffect(() => {
    Axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn == true){

        // User is logged in, redirect to dashboard
        setLogInStatus(response.data.user[0].username);

      } else {
        navigate('/login');
      }
    })

  }, [])


  const handleClick = (event) => {
    setMenuOpen(event.currentTarget);
  };

  const handleClose = () => {
    setMenuOpen(null);
  };

  const navigate = useNavigate();


  const navigateToDashboard = () => {
    navigate('/dashboard')
  }

  const logOut = () => {
    navigate('/login');
    Axios.post("http://localhost:5000/logout").then((response) => {
      if (response.message== true){

        // User is logged out
        setLogInStatus("");
        navigate('/login');
      }
    })
  }

  return (
    <HeaderContainer>
      <HeaderBarDark>
        <HeaderLogo></HeaderLogo>
        <DashboardButtonContainer>
          <button  
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}> 
            <h4 style={{fontFamily: "Calibri Light", fontSize: "17px", marginLeft: "40px"}}>{logInStatus}</h4>
          </button>
          <Menu
            id="basic-menu"
            anchorEl={menuOpen}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
            <MenuItem onClick={navigateToDashboard}>Dashboard</MenuItem>
            <MenuItem onClick={logOut}>
              <Icon icon="ion:log-out" style={{ fontSize: '22px', marginRight: '5px' }} />
              Logout
            </MenuItem>
          </Menu>
        </DashboardButtonContainer>
      </HeaderBarDark>
    </HeaderContainer>
  )
}

export default Header