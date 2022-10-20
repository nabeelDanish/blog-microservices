const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const postRoutes = require("./routes/post");

// ENVS
const port = process.env.PORT || 4000;

// Creating the Express App
const app = express();

// Adding middleware
app.use(bodyParser.json());
app.use(cors());

// Adding Routers
app.use(postRoutes);

// Default Route
app.get("/", (req, res, next) => {
  res.send("Posts Web API");
});

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
