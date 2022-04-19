'use strict';

//  proof-of-life
console.log("ehlo");

//  requires
const data = require('./data/weather.json');
const express = require('express'); //  imports express.js
require('dotenv').config(); //  grabs config file
const app = express();  //  defines and executes the app
const PORT = process.env.PORT || 3002;  //  add fallback port

//  use section - calls requires items

//  routes - defines endpoints

//  listen - starts the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));

//  errors - define error handlers
