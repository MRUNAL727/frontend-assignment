import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    // const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Link to='/login'><Button color="inherit">Login</Button></Link>
          <Link to='/logout'><Button color="inherit">Logout</Button></Link>
          <Link to='/register'><Button color="inherit">Register</Button></Link>

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
