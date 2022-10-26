const express = require("express");

const queryController = require("../controllers/query");

const router = express.Router();

router.get("/posts", queryController.getPosts);

module.exports = router;
