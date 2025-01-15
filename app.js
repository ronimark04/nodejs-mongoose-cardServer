
const express = require('express');
const mongoose = require('mongoose');
const { Card } = require('./cards/models/mongodb/Card');
const PORT = 8181;
const connectToDB = require('./DB/dbService');
const cors = require('cors');
const chalk = require('chalk');
require('dotenv').config();
// const morgan = require('morgan'); // we createed our own morgan logger so this is now redundant
// THIS HAS BEEN REPLACED BY MORGAN:
// app.use((req, res, next) => {
//     console.log(`new request from URL: ${req.url}, method: ${req.method}, time: ${new Date()}`); // this is an example middleware function
//     next(); // move on to the next middleware function. if a middleware has no response, it will get stuck and so it must call next()
// });

const app = express();
const router = require('./router/router');
const corsMiddleware = require('./middlewares/cors');
const { loggerMiddleware } = require('./logger/loggerService');

// THE ORDER OF THESE MATTERS:
app.use(express.json());
app.use(loggerMiddleware());
app.use(corsMiddleware);

app.use(express.static("./public")); // this is a built-in middleware function that serves static files from the public folder.
// app.use(morgan('tiny'));

app.get("/password", (req, res) => {
    const myPassword = process.env.MY_PASSWORD;
    res.send(myPassword);
});

app.use(router); // this line must be last before app.listen, apart from error handling middleware

// app.get("/", (req, res) => {
//     res.send("Hello world");
// });


app.listen(PORT, () => {
    console.log(chalk.green.bgBlack(`Server is running on port ${PORT}`));
    connectToDB();
});