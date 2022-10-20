const express = require("express");

const commentsController = require("../controllers/comments");

const router = express.Router();

router.get("/posts/:id/comments", commentsController.getComments);
router.post("/posts/:id/comments", commentsController.postComment);

module.exports = router;
