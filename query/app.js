const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const queryRoutes = require("./routes/query");
const eventsRoutes = require("./routes/events");

const eventsController = require("./controllers/events");

// ENVS
const port = process.env.PORT || 4002;

// Creating the Express App
const app = express();

// Adding middleware
app.use(bodyParser.json());
app.use(cors());

// Adding Routers
app.use(queryRoutes);
app.use(eventsRoutes);

// Default Route
app.get("/", (req, res, next) => {
  res.send("Query  Web API");
});

// Function to fetch all events
const fetchEvents = async () => {
  const res = await axios.get(`${process.env.EVENT_BUS_API_URL}/events`);

  for (let event of res.data) {
    eventsController.handleEvent(event.type, event.data);
  }
};

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
  fetchEvents();
});
