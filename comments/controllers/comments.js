const { randomBytes } = require("crypto");
const axios = require("axios");

// Data
const commentsByPostId = {
  "38667e1a": [
    {
      id: "f776d2e8",
      content: "Nice Post Dear",
    },
  ],
};

exports.getComments = (req, res, next) => {
  res.send(commentsByPostId[req.params.id] || []);
};

exports.postComment = async (req, res, next) => {
  const commentId = randomBytes(4).toString("hex");

  const postId = req.params.id;
  const { content } = req.body;

  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content });
  commentsByPostId[postId] = comments;

  // Emitting Events
  await axios.post(`${process.env.EVENT_BUS_API_URL}/events`, {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });

  res.status(201).send(comments);
};
