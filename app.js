const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');

const connectDB = require('./server/config/db');
const socketConfig = require('./server/controller/socketController.js');
const {
  notFound,
  errorHandler,
} = require('./server/middleware/errorMiddleware');
const userRoutes = require('./server/routes/userRoutes');
const appointmentroutes = require('./server/routes/appointmentRoutes');

const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express();

// setting up the server
var server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
app.use(cors());
app.use(express.json());

//connecting DB
connectDB();

app.get('/', (req, res) => {
  res.send('API is running....');
});
// socket.io
io.on('connection', (socket) => {
  socketConfig(socket, io);
});
// REST APIs
app.use('/api/v1', userRoutes);
app.use('/api/v1/appointments', appointmentroutes);

app.use(notFound);
app.use(errorHandler);

server.listen(PORT, console.log(`Server running  on port ${PORT}`.yellow.bold));
