const axios = require("axios");

exports.handleEvents = (req, res, next) => {
  const event = req.body;

  axios.post("http://localhost:4000/events", event).catch((e) => {
    console.log(e);
  });
  axios.post("http://localhost:4001/events", event).catch((e) => {
    console.log(e);
  });
  axios.post("http://localhost:4002/events", event).catch((e) => {
    console.log(e);
  });

  res.send({ status: "OK" });
};
