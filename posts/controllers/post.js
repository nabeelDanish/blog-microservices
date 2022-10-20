const { randomBytes } = require("crypto");

// Data
const posts = {
  cb6244e2: {
    id: "cb6244e2",
    title: "First Post",
  },
  "38667e1a": {
    id: "38667e1a",
    title: "Second Post",
  },
};

exports.getPosts = (req, res, next) => {
  res.send(posts);
};

exports.postPost = (req, res, next) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  res.status(201).send(posts[id]);
};
