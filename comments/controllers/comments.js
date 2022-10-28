const { randomBytes } = require("crypto");
const axios = require("axios");

const store = require("../store");

exports.postComment = async (req, res, next) => {
  const commentId = randomBytes(4).toString("hex");

  const postId = req.params.id;
  const { content } = req.body;

  const comments = store.commentsByPostId[postId] || [];

  comments.push({ id: commentId, content, status: "pending" });
  store.commentsByPostId[postId] = comments;

  // Emitting Events
  await axios.post(`${process.env.EVENT_BUS_API_URL}/events`, {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });

  res.status(201).send(comments);
};
