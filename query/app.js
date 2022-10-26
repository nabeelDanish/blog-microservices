const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const queryRoutes = require("./routes/query");
const eventsRoutes = require("./routes/events");

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

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
