const express = require("express");
const router = express.Router();
const { roomController, movieController } = require("../../controllers/client");
const { getAllRooms } = roomController;
const { getMoviesByRoom } = movieController;

router.get("/", getAllRooms);
router.get("/:id/movies", getMoviesByRoom);

module.exports = router;
