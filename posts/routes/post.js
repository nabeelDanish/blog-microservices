const express = require("express");

const postController = require("../controllers/post");

const router = express.Router();

router.get("/posts", postController.getPosts);
router.post("/posts", postController.postPost);

module.exports = router;
