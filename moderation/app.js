const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const eventsRoutes = require("./routes/events");

// ENVS
const port = process.env.PORT || 4000;

// Creating the Express App
const app = express();

// Adding middleware
app.use(bodyParser.json());
app.use(cors());

// Adding Routers
app.use(eventsRoutes);

// Default Route
app.get("/", (req, res, next) => {
  res.send("Comment Moderation Web API");
});

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
