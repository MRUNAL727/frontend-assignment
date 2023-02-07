import React, { useEffect, useState } from 'react';
import {
  Paper,
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
import { AddCircle, BorderColor, Delete } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import AdapterJalali from '@date-io/date-fns-jalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux'
axios.defaults.withCredentials = true;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState();
  const [value, setValue] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state)=>  state.user.user)
  console.log(user);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
   useEffect(()=>{},[user])
  // useEffect(() => {
    
    const getData = async () => {
      if(user){
      const res = await axios.get('/api/event', {withCredentials:true});
      setEvents(res.data);
    };
  }
   getData()

  // }, []);

  const handleClick = async () => {
    console.log(data);
    const response = await axios.post(
      `/api/event/add`,
      data, { withCredentials: true}
    );

    if (response.status === 200) {
      setData(response.data);
      navigate('/')
      // window.location.reload(false);
      handleClose();
      getData()
    }
  };

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  // console.log(data.date);
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
     { user && <Typography>{`Hey ${user}`}</Typography>}
     { !user && <Typography style={{margin:30, fontSize:30}}>Please login</Typography>}
      <Box spacing={2} style={{ width: '50%', position: 'relative' }}>
        {events &&
          events.map((e) => (
            <Box
              key={e._id}
              style={{
                marginBottom: 20,
                paddingLeft: 20,
                // boxShadow: '#b1e8f233 0px 60px 40px -7px',
                boxShadow: 'rgba(0, 0, 0, 0.09) 0px 3px 12px',

                // box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    style={{
                      fontSize: 35,
                      border: '1px solid black',
                      borderRadius: '50%',
                      padding: 15,
                      margin: 10,
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography>{e.date.split(' ')[2]}</Typography>
                    <Typography>{e.date.split(' ')[1]}</Typography>
                  </Box>
                  <Typography>{e.description}</Typography>
                </Box>
                <Box>
                  <Button>
                    <Link to={`/edit/${e._id}`} style={{color:'inherit'}}>
                      <BorderColor />
                    </Link>
                  </Button>
                  <Button>
                    <Link to={`/delete/${e._id}`} style={{color:'inherit'}}>
                      <Delete />
                    </Link>
                  </Button>
                  {/* <Button onClick={()=>handleDelete(e._id)}><Delete /></Button> */}
                </Box>
              </Box>
            </Box>
          ))}
      </Box>

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
        <DialogTitle id="alert-dialog-title" style={{textAlign:'center'}}>{'Add event'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{display:'flex', flexDirection:'column', width:'100%', justifyContent:'center', alignItems:'center'}} >
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              name="description"
              onChange={handleChange}
              style={{ margin: 20, width: '70%' }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={value}
                name="date"
                onChange={(newValue) => {
                  setValue(newValue);
                  setData({ ...data, date: newValue.$d.toString() });
                }}
                renderInput={(params) => (
                  <TextField {...params} style={{ margin: 20, width: '70%' }} />
                )}
              />
            </LocalizationProvider>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{display:'flex', justifyContent:"space-evenly"}}>
          <Button variant='contained' onClick={handleClose}>Cancel</Button>
          <Button variant='contained' onClick={handleClick}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Events;
