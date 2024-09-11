const express = require('express');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const dbConn = require('./config/dbConnection.js');
dotenv.config();
const app = express();
//

dbConn();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
//http://localhost:5000
app.use('/api/v1/auth', require('./routes/authRoutes.js'));
app.use('/api/v1/test', require('./routes/testRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes.js'));
app.use('/api/v1/admin', require('./routes/adminRoutes.js'));

app.get('/', (req, res) => {
  return res.status(200).send('<h1>welcome to food server API</h1>');
});
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on ${port}`.white.bgMagenta);
});
