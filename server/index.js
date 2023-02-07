const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/userRoutes');
const { eventsRouter } = require('./routes/eventsRoutes')
const cookieParser = require('cookie-parser')

const app = express();

dotenv.config();

app.use(cors({credentials: true, origin: "http://localhost:3000" }))
// credentials: true, origin: "http://localhost:3000" 
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/event', eventsRouter)

mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.log(err));

app.listen(
  process.env.PORT_NO,
  console.log(`Connected to PORT NO: ${process.env.PORT_NO}`)
);
