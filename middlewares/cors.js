const cors = require('cors');

//const corsMiddleware = cors({
//    origin: [
//        "http://127.0.0.1:5500", // this is the default port for live server
//        "www.cardsproject.co.il", // this is the made up non existant domain of //the website
//        "http://localhost:5500", // this is the default port for live server
//    ],
//});

const corsMiddleware = cors({}); // defining who can access the server (in this instance it's open to everyone)

module.exports = corsMiddleware; // this is a middleware function that will be used in app.js