const axios = require("axios");

exports.handleEvents = (req, res, next) => {
  const { type, data } = req.body;

  console.log("Received Event: ", type);

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    // Sending a delayed update
    setTimeout(async () => {
      await axios.post(`${process.env.EVENT_BUS_API_URL}/events`, {
        type: "CommentModerated",
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      });
    }, 5000);
  }

  res.send({});
};
