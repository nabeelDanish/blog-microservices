const express = require("express");

const commentsController = require("../controllers/comments");

const router = express.Router();

router.post("/posts/:id/comments", commentsController.postComment);

module.exports = router;
