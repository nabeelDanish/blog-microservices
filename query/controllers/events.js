const store = require("../store/index");

exports.handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    store.posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = store.posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = store.posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
};

exports.handleEvents = (req, res, next) => {
  console.log("Received Event: ", req.body.type);
  const { type, data } = req.body;

  this.handleEvent(type, data);

  res.send({});
};
