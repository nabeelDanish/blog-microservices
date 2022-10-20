const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const eventsRoutes = require("./routes/events");

// ENVS
const port = process.env.PORT || 4003;

// Creating the Express App
const app = express();

// Adding middleware
app.use(bodyParser.json());

// Adding Routers
app.use(eventsRoutes);

// Default Route
app.get("/", (req, res, next) => {
  res.send("Event Bus Web API");
});

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
