
const express = require('express');
const mongoose = require('mongoose');
const { Card } = require('./cards/models/mongodb/Card');
const PORT = process.env.PORT || 8181;
const connectToDB = require('./DB/dbService');
const chalk = require('chalk');
require('dotenv').config();
const app = express();
const router = require('./router/router');
const corsMiddleware = require('./middlewares/cors');
const morganLogger = require('./logger/morganLogger');

// THE ORDER OF THESE MATTERS:
app.use(express.json());
app.use(morganLogger);
app.use(corsMiddleware);

app.use(router); // this line must be last before app.listen, apart from error handling middleware


app.listen(PORT, () => {
    console.log(chalk.bgGreen(`Server is running on port ${PORT}`));
    connectToDB();
});