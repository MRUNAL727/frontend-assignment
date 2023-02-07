const express = require('express');
const { getEvents, addEvent, getEvent, editEvent, deleteEvent } = require('../controllers/eventController');
const { verifyToken } = require('../middlewares/verifyToken');

const eventsRouter = express.Router();

eventsRouter.get('/', verifyToken ,getEvents )
eventsRouter.get('/:id', verifyToken, getEvent )
eventsRouter.put('/edit/:id',verifyToken, editEvent)
eventsRouter.delete('/delete/:id',verifyToken, deleteEvent)

// eventsRouter.post('/register', register)
eventsRouter.post('/add', verifyToken, addEvent)


module.exports = { eventsRouter }