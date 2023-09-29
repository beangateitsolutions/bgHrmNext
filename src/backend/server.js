const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const colors = require('./utils/colors');
const constants = require('./utils/constants');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
require('dotenv').config();

app.use('/api/auth', require('./api/auth/routes'));
app.use('/api/users', require('./api/users/routes'));
app.use('/api/attendances', require('./api/attendances/routes'));
app.use('/api/projects', require('./api/projects/routes'));
app.use('/api/project-members', require('./api/project-members/routes'));
app.use('/api/reports', require('./api/reports/routes'));
app.use('/api/report-messages', require('./api/report-messages/routes'));

app.all('*', (req, res) => {
  return res.status(405).json({ message: 'route not found' });
});

app.listen(process.env.PORT, async () => {
  console.log(colors.fgBrightGreen + 'INFO:' + colors.reset, 'Server started!');
  let client = await mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.DATABASE,
  });
  // mongoose.set('debug', true);
  constants.db = client.connection;
  console.log(
    colors.fgBrightGreen + 'INFO:' + colors.reset,
    'Atlas connected!'
  );
});
