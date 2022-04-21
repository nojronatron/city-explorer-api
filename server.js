'use strict';

//  proof-of-life
console.log('ehlo');

//  requires
const data = require('./data/weather.json');
const express = require('express'); //  imports express.js
require('dotenv').config(); //  grabs config file
const app = express(); //  defines and executes the app
const cors = require('cors');
const PORT = process.env.PORT || 3002; //  add fallback port

//  use section - calls requires items
app.use(cors());

//  classes
class Forecast {
  constructor(date, description){
    this.date = date;
    this.description = description;
  }
}

//  routes - defines endpoints
app.get('/', (req, resp) => {
  resp.send('ehlo from city-explorer-api server!');
});

app.get('/weather', (req, resp, next) => {
  try {
    let reqQuery = req.query.city;
    console.log(`weather route says: received ${reqQuery}`);
    let cityWx = data.find((item) => item.city_name === reqQuery);
    let wxData = cityWx.data.map(dayWx => new Forecast(dayWx.datetime, dayWx.weather.description));
    console.log(wxData);
    wxData ? resp.send(wxData) : resp.send('City not found.');
  }
  catch (error) {
    next(error);
  }
});

//  listen - starts the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));

//  errors - define error handlers
app.use((err, req, res, next) => {
  console.log(err.stack); // from expressjs.com/en/guide/error-handling/html
  res.status(500).send('Something went wrong!');
});
