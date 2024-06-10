const express = require("express");
const router = express.Router();

const roomsRoutes = require("./rooms.js");
const bookingsRoutes = require("./booking.js");
const moviesRoutes = require("./movies.js");

router.use("/rooms", roomsRoutes);
router.use("/movies", moviesRoutes);
router.use("/booking", bookingsRoutes);

module.exports = router;
