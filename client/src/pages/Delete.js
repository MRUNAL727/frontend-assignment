import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Delete = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`http://localhost:8000/api/event/${id}`, {withCredentials:true});
      setData(res.data);
      console.log(res.data);
    };
    getData();
  }, []);

  const handleClick = async () => {
    const response = await axios.delete(
      `http://localhost:8000/api/event/delete/${id}`, {withCredentials:true}
    
    );

    if (response.status === 200) {
      setData(response.data);
      navigate('/');
    }
  };

  

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '60vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box style={{ border: '1px solid black', width: '30%', padding: 30 }}>
        <Typography
          style={{ fontSize: 30, fontWeight: 800, textAlign: 'center' }}
        >
          Delete
        </Typography>
        {/* {msg && <Typography style={{ color: 'red' }}>{msg}</Typography>} */}
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {data && (
            <>
              <Typography
                id="outlined-basic"
                label="Description"
                variant="outlined"
                name="description"
                style={{ margin: 20, width: '70%' }}
              >Description:&nbsp;&nbsp;&nbsp; {data.description}</Typography>
              <Typography
                id="outlined-basic"
                label="Data"
                variant="outlined"
                name="date"
                style={{ margin: 20, width: '70%' }}
              >
                Date:&nbsp;&nbsp;&nbsp; {data.date.split(" ")[2]} {data.date.split(" ")[1]}

              </Typography>
            </>
          )}
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
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Delete;
