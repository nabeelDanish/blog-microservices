const { randomBytes } = require("crypto");

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

exports.postComment = (req, res, next) => {
  const commentId = randomBytes(4).toString("hex");

  const postId = req.params.id;
  const { content } = req.body;

  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content });
  commentsByPostId[postId] = comments;

  res.status(201).send(comments);
};
