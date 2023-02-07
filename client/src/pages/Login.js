import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [msg, setMsg] = useState();

  const handleClick = async () => {
    const response = await axios.post(
      'http://localhost:8000/api/user/login',
      data
    );
    console.log(response.data.message);
    if (response.status === 200) {
      navigate('/');
    } else {
        console.log(response.data.message);
      setMsg(response.data.message);
    }
  };

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  useEffect(() => {}, [msg]);
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '50vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box style={{ border: '1px solid black', width: '30%', padding: 30 }}>
        <Typography
          style={{ fontSize: 30, fontWeight: 800, textAlign: 'center' }}
        >
          Login
        </Typography>
        {msg && <Typography style={{ color: 'red' }}>{msg}</Typography>}
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            onChange={handleChange}
            style={{ margin: 20, width: '70%' }}
          />
          <TextField
            id="outlined-basic"
            type={'password'}
            label="password"
            variant="outlined"
            name="password"
            onChange={handleChange}
            style={{ margin: 20, width: '70%' }}
          />
        </Box>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            margin: 20,
          }}
        >
          <Button variant="contained" onClick={() => navigate('/')}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleClick}>
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
