const axios = require("axios");

const events = [];

exports.handleEvents = (req, res, next) => {
  const event = req.body;

  events.push(event);

  console.log("\n-> Event Received: ", event.type);

  axios.post(`${process.env.POSTS_URL}/events`, event).catch((e) => {
    console.log("Error sending to posts");
  });
  axios.post(`${process.env.COMMENTS_URL}/events`, event).catch((e) => {
    console.log("Error sending to comments");
  });
  axios.post(`${process.env.QUERY_URL}/events`, event).catch((e) => {
    console.log("Error sending to query");
  });
  axios.post(`${process.env.MODERATION_URL}/events`, event).catch((e) => {
    console.log("Error sending to query");
  });

  res.send({ status: "OK" });
};

exports.exportEvents = (req, res, next) => {
  res.send(events);
};
