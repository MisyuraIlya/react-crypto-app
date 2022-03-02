import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import HomeIcon from '@mui/icons-material/Home';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const  Navbar = () =>  {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



        return (
          <AppBar position="static"sx={{bgcolor:'#121858'}} >
          <Container maxWidth="xl" >
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              >
                LOGO
              </Typography>
    
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                <MenuItem  onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Home</Typography>
                    </MenuItem>
                    <MenuItem  onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">News</Typography>
                    </MenuItem>
                    <MenuItem  onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">aa</Typography>
                </MenuItem>
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              >
                LOGO
              </Typography>
              <Box sx={{ ml:10, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, ml:2,  color: 'white' }}
                    startIcon={<HomeIcon />}
                  >
                     <Link href="/" color="inherit" underline="none">Home</Link>
                  </Button>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2,ml:2, color: 'white' }}
                    startIcon={<AccountBalanceIcon />}
                  >
                    <Link href="/cryptocurrencies" color="inherit" underline="none">Cryptocurrencies</Link>
                  </Button>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2,ml:2, color: 'white' }}
                    startIcon={<NewspaperIcon />}
                  >
                     <Link href="/news" color="inherit" underline="none">News</Link>
                  </Button>

              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        );
    }


export default Navbar;