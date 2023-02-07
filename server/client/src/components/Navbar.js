import React, { useEffect } from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isLoggedOut = useSelector((state) => state.user.isLoggedOut);
  const dispatch = useDispatch()

  const handleLogout = async() =>{
   const res = await axios.post("/api/user/logout", null, {
    withCredentials: true,
  })
  console.log(res);
   if(res.status == 200){
    //  dispatch(isLoggedOut())
     window.location.reload(false)
   }
  }

  useEffect(()=>{
      
  }, isLoggedIn)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => navigate('/')}
          >
            Events
          </Typography>
          {isLoggedIn && (
           
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
          )}
          {isLoggedOut && (
            <>
              <Link
                to="/login"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <Button color="inherit">Login</Button>
              </Link>

              <Link
                to="/register"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <Button color="inherit">Register</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
