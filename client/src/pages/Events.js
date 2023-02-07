import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Button,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@mui/material';
import { Stack } from '@mui/system';
import { AddCircle, BorderColor, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import AdapterJalali from '@date-io/date-fns-jalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs'
axios.defaults.withCredentials = true;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState();
 const [value, setValue] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  // const handleDelete = async(id)=>{
  //     const response = await axios.delete(`http://localhost:8000/api/event/delete/${id}`)
  //    console.log(response.data);
  // }

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('http://localhost:8000/api/event');
      console.log(res);
      setEvents(res.data);
    };
    getData();
  }, []);

  // const handleClick = async () => {
  //   const response = await axios.put(
  //     `http://localhost:8000/api/event/edit/${id}`, data
  //   );

  //   if (response.status === 200) {
  //     setData(response.data)
  //     navigate('/')
  //   }
  // };

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
console.log(data);
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
      }}
    >
      <Typography>Hey username</Typography>
      <Stack spacing={2} style={{ width: '50%', position: 'relative' }}>
        {events &&
          events.map((e) => (
            <Item>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  style={{
                    fontSize: 30,
                    border: '1px solid black',
                    borderRadius: '50%',
                    padding: 10,
                    margin: 10,
                  }}
                >
                  {e.date}
                </Typography>
                <Typography>{e.description}</Typography>
                <Box>
                  <Button>
                    <Link to={`/edit/${e._id}`}>
                      <BorderColor />
                    </Link>
                  </Button>
                  {/* <Button onClick={handleDelete(e._id)}><Delete /></Button> */}
                </Box>
              </Box>
            </Item>
          ))}
      </Stack>

      <Box
        style={{ position: 'absolute', bottom: 20, right: 20 }}
        onClick={handleClickOpen}
      >
        <AddCircle style={{ width: 70, height: 70 }} />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Add event'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              name="description"
              onChange={handleChange}
              style={{ margin: 20, width: '70%' }}
            />
            {/* <TextField
            id="outlined-basic"
            label="Date"
            variant="outlined"
            name="date"
            onChange={handleChange}
            style={{ margin: 20, width: '70%' }}
          /> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date"
        value={value}
        name='date'
        onChange={(newValue) => {
          setValue(newValue)
          setData({...data, date: newValue});
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Events;
