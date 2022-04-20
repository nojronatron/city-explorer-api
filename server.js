'use strict';

//  proof-of-life
console.log('ehlo');

//  requires
const data = require('./data/weather.json');
const express = require('express'); //  imports express.js
require('dotenv').config(); //  grabs config file
const app = express();  //  defines and executes the app
const PORT = process.env.PORT || 3002;  //  add fallback port
const cors = require('cors');
app.use(cors());

//  classes
class Forecast {
  constructor(date, description){
    this.date = date;
    this.description = description;
  }
}

//  use section - calls requires items

//  routes - defines endpoints
app.get('/', (req, resp) => {
  resp.send('ehlo from city-explorer-api server!');
});

//  { data, city_name, lon, timezone, lat, country_code, state_code }

app.get('/weather', (req, resp) => {
  try {
    let reqQuery = req.query.city;
    let cityWx = data.find((item) => item.city_name === reqQuery);
    let wxData = cityWx.data.map(dayWx => new Forecast(dayWx.datetime, dayWx.weather.description));
    console.log(wxData);
    wxData ? resp.send(wxData) : resp.send('City not found.');
  }
  catch (error) {
    resp.send(error);
  }
});
//  listen - starts the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));

//  errors - define error handlers
