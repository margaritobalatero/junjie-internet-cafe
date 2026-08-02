const express = require("express");

const router = express.Router();

const {
  startSession,
  extendSession
} = require("../controllers/sessionController");

router.post(
  "/start",
  startSession
);

router.post(
  "/extend",
  extendSession
);

module.exports = router;