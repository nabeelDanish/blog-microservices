const axios = require("axios");

const store = require("../store");

exports.handleEvents = async (req, res, next) => {
  const { type, data } = req.body;

  console.log("Received Event: ", type);

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;

    const comments = store.commentsByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;

    await axios.post(`${process.env.EVENT_BUS_API_URL}/events`, {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        status,
        content,
      },
    });
  }

  res.send({});
};
