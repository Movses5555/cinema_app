const express = require("express");
const router = express.Router();

const adminRoutes = require("./admin/index");
const roomsRoutes = require("./client/rooms.js");
const bookingsRoutes = require("./client/booking.js");
const moviesRoutes = require("./client/movies.js");

router.use("/admin", adminRoutes);
router.use("/rooms", roomsRoutes);
router.use("/movies", moviesRoutes);
router.use("/booking", bookingsRoutes);

module.exports = router;
