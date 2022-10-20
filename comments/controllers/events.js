exports.handleEvents = (req, res, next) => {
  console.log("Received Event:", req.body.type);
  res.send({});
};
