const Event = require('../models/Event');

const addEvent = async (req, res) => {
  console.log(req.id);
  try {
    const event = await Event({
      userId: req.id,
      description: req.body.description,
      date: req.body.date,
    });
    const newEvent = await event.save();
    res.status(200).send(newEvent);
  } catch (error) {
    console.log(error);
  }
};

const getEvents = async (req, res) => {
  console.log(req.id);
  try {
    const events = await Event.find({ userId: req.id });
    console.log(events);
    res.status(200).send(events);
  } catch (error) {
    console.log(error);
  }
};

const getEvent = async (req, res) => {
  console.log(req.params.id);
  try {
    const event = await Event.findById(req.params.id);
    console.log(event);
    res.status(200).send(event);
  } catch (error) {
    console.log(error);
  }
};

const editEvent = async (req, res) => {
  try {
    await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      function (err, event) {
        if (err) {
          res.status(400).json({ message: "Error! Can't update data" });
        } else {
          res.status(200).send(event);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id, function (err, event) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ message: 'Event deleted successfully' });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addEvent, getEvents, getEvent, editEvent, deleteEvent };
