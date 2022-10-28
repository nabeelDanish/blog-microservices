const express = require("express");

const eventsController = require("../controllers/events");

const router = express.Router();

router.post("/events", eventsController.handleEvents);
router.get("/events", eventsController.exportEvents);

module.exports = router;
