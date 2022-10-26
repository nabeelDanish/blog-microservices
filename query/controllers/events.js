const store = require("../store/index");

exports.handleEvents = (req, res, next) => {
  console.log("Received Event: ", req.body.type);
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    store.posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = store.posts[postId];
    post.comments.push({ id, content, status });
  }

  res.send({});
};
