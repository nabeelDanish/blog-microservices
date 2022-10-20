const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const commentsRoutes = require("./routes/comments");

// ENVS
const port = process.env.PORT || 4001;

// Creating the Express App
const app = express();

// Adding middleware
app.use(bodyParser.json());
app.use(cors());

// Adding Routers
app.use(commentsRoutes);

// Default Route
app.get("/", (req, res, next) => {
  res.send("Comments Web API");
});

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
