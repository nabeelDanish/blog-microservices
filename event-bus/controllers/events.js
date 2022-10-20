const axios = require("axios");

exports.handleEvents = (req, res, next) => {
  const event = req.body;

  console.log("Event Received: ", event);

  axios.post(`${process.env.POSTS_URL}/events`, event).catch((e) => {
    console.log("Error sending to posts");
  });
  axios.post(`${process.env.COMMENTS_URL}/events`, event).catch((e) => {
    console.log("Error sending to comments");
  });
  axios.post(`${process.env.QUERY_URL}/events`, event).catch((e) => {
    console.log("Error sending to query");
  });

  res.send({ status: "OK" });
};
