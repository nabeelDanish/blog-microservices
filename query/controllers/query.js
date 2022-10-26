const store = require("../store/index");

exports.getPosts = (req, res, next) => {
  res.send(store.posts);
};
