import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Edit = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [msg, setMsg] = useState();
  const [value, setValue] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`/api/event/${id}`);
      setData(res.data);
      console.log(res);
    };
    getData();
  }, [id]);

  const handleClick = async () => {
    const response = await axios.put(
      `/api/event/edit/${id}`,
      data
    );

    if (response.status === 200) {
      setData(response.data);
      navigate('/');
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
        height: '60vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box style={{ border: '1px solid black', width: '30%', padding: 30 }}>
        <Typography
          style={{ fontSize: 30, fontWeight: 800, textAlign: 'center' }}
        >
          Edit
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
          {data && (
            <>
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                name="description"
                value={data.description}
                onChange={handleChange}
                style={{ margin: 20, width: '70%' }}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={data.date}
                  name="date"
                  onChange={(newValue) => {
                    setValue(newValue);
                    setData({ ...data, date: newValue.$d.toString() });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{ margin: 20, width: '70%' }}
                    />
                  )}
                />
              </LocalizationProvider>
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
            Edit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Edit;
