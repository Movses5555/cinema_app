const express = require("express");
const router = express.Router();
const { movieController } = require("../../controllers/client");
const { getMovieById } = movieController;

router.get("/:id", getMovieById);

module.exports = router;
