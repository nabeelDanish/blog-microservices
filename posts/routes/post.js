const express = require("express");

const postController = require("../controllers/post");

const router = express.Router();

router.post("/posts/create", postController.postPost);

module.exports = router;
