const { randomBytes } = require("crypto");
const axios = require("axios");

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

exports.postPost = async (req, res, next) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  // Emitting an event
  await axios.post(`${process.env.EVENT_BUS_API_URL}/events`, {
    type: "PostCreated",
    data: { id, title },
  });

  res.status(201).send(posts[id]);
};
